<template>
  <div>
    <a-button type="primary" @click="showModal">
      <EditOutlined />
    </a-button>
    <a-modal
      v-model:open="isModalOpen"
      :title="`Update ${objectName}`"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        layout="horizontal"
        :model="localFormState"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :rules="rules"
        name="updateForm"
        ref="formRef"
      >
        <a-form-item
          v-for="(field, index) in formFields"
          :key="index"
          :label="field.label"
          :name="field.name"
        >
          <template v-if="field.type === 'radio'">
            <a-radio-group 
              v-model:value="localFormState[field.name]"
              :disabled="field.disabled"
            >
              <a-radio 
                v-for="option in field.options" 
                :key="option.value" 
                :value="option.value"
              >
                {{ option.label }}
              </a-radio>
            </a-radio-group>
          </template>
          <template v-else-if="field.type === 'select' || field.type === 'multiselect'">
            <a-select
              v-model:value="localFormState[field.name]"
              :placeholder="`Select ${field.label}`"
              :disabled="field.disabled"
              :mode="field.type === 'multiselect' ? 'multiple' : undefined"
              :options="field.options || []"
              @update:value="(value) => handleFieldChange(field.name, value)"
            />
          </template>
          <template v-else-if="field.type === 'multi-date'">
            <div v-for="(date, idx) in localFormState[field.name]" :key="idx" class="mb-2 flex items-center gap-2">
              <a-date-picker
                v-model:value="localFormState[field.name][idx]"
                :format="dateFormat"
                placeholder="Select Date"
                @update:value="(value) => handleMultiDateChange(field.name, idx, value)"
              />
              <a-button 
                type="text" 
                danger 
                @click="removeDate(field.name, idx)"
                v-if="localFormState[field.name].length > 1"
              >
                <DeleteOutlined />
              </a-button>
            </div>
            <a-button type="dashed" class="mt-2" @click="addDate(field.name)">
              <PlusOutlined /> Add Another Date
            </a-button>
          </template>
          <template v-else-if="field.type === 'date'">
            <a-date-picker
              v-model:value="localFormState[field.name]"
              :format="dateFormat"
              :placeholder="`Select ${field.label}`"
              :disabled="field.disabled"
              @update:value="(value) => handleFieldChange(field.name, value)"
            />
          </template>
          <component
            v-else
            :is="getComponentType(field.type)"
            v-model:value="localFormState[field.name]"
            :placeholder="`Enter ${field.label}`"
            :disabled="field.disabled"
            :min="field.type === 'int' ? 0 : null"
            @update:value="(value) => handleFieldChange(field.name, value)"
          />
        </a-form-item>
      </a-form>

      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          Update
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, watch } from 'vue';
import { 
  message, 
  Input, 
  DatePicker, 
  InputNumber, 
  Upload, 
  Select, 
  Radio 
} from 'ant-design-vue';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export default defineComponent({
  name: 'UpdateModal',
  components: {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
  },
  props: {
    objectName: {
      type: String,
      default: 'Object',
    },
    formFields: {
      type: Array,
      required: true,
    },
    formState: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
    updateObject: {
      type: Function,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isModalOpen = ref(false);
    const loading = ref(false);
    const localFormState = reactive({});
    const formRef = ref(null);
    const dateFormat = 'YYYY-MM-DD';

    // Watch for changes in formState and update localFormState
    watch(() => props.formState, (newVal) => {
      Object.keys(newVal).forEach(key => {
        const field = props.formFields.find(f => f.name === key);
        if (!field) return;

        if (field.type === 'date') {
          localFormState[key] = newVal[key] ? dayjs(newVal[key]) : null;
        } else if (field.type === 'multi-date') {
          localFormState[key] = Array.isArray(newVal[key]) 
            ? newVal[key].map(date => date ? dayjs(date) : null)
            : [null];
        } else if (field.type === 'radio') {
          localFormState[key] = newVal[key] !== undefined ? newVal[key] : '';
        } else {
          localFormState[key] = newVal[key];
        }
      });
    }, { deep: true, immediate: true });

    const showModal = () => {
      isModalOpen.value = true;
    };

    const handleCancel = () => {
      isModalOpen.value = false;
    };

    const handleFieldChange = (fieldName, value) => {
      localFormState[fieldName] = value;
    };

    const handleMultiDateChange = (fieldName, index, value) => {
      if (Array.isArray(localFormState[fieldName])) {
        localFormState[fieldName][index] = value;
      }
    };

    const addDate = (fieldName) => {
      if (Array.isArray(localFormState[fieldName])) {
        localFormState[fieldName].push(null);
      }
    };

    const removeDate = (fieldName, index) => {
      if (Array.isArray(localFormState[fieldName]) && localFormState[fieldName].length > 1) {
        localFormState[fieldName].splice(index, 1);
      }
    };

    const handleOk = async () => {
      try {
        if (formRef.value) {
          await formRef.value.validate();
        }
        
        loading.value = true;
        const formData = { ...localFormState };

        // Process the form data
        for (const field of props.formFields) {
          const value = formData[field.name];
          
          if (field.type === 'multi-date' && Array.isArray(value)) {
            formData[field.name] = value
              .map(date => {
                if (!date) return null;
                return dayjs.isDayjs(date) ? date.format(dateFormat) : null;
              })
              .filter(Boolean);
          } else if (field.type === 'date' && value) {
            formData[field.name] = dayjs.isDayjs(value) ? value.format(dateFormat) : null;
          }
        }

        await props.updateObject(formData);
        isModalOpen.value = false;
        emit(`${props.objectName}Updated`);
        message.success(`${props.objectName} updated successfully`);
      } catch (error) {
        console.error('Failed to update:', error);
        message.error(`Failed to update ${props.objectName}`);
      } finally {
        loading.value = false;
      }
    };

    const getComponentType = (type) => {
      switch (type) {
        case 'int':
          return InputNumber;
        case 'password':
          return Input.Password;
        case 'image':
          return Upload;
        case 'select':
        case 'multiselect':
          return Select;
        case 'string':
        default:
          return Input;
      }
    };

    return {
      isModalOpen,
      loading,
      localFormState,
      formRef,
      dateFormat,
      showModal,
      handleCancel,
      handleOk,
      handleFieldChange,
      handleMultiDateChange,
      addDate,
      removeDate,
      getComponentType,
    };
  },
});
</script>