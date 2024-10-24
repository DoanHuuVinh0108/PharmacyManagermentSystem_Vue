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
          <component
            v-else
            :is="getComponentType(field.type)"
            v-model:value="localFormState[field.name]"
            :placeholder="`Enter ${field.label}`"
            :disabled="field.disabled"
            :min="field.type === 'int' ? 0 : null"
            :format="field.type === 'date' ? dateFormat : null"
            :options="field.options || []"
            :mode="field.type === 'multiselect' ? 'multiple' : undefined"
            @change="(val, extra) => handleFieldChange(field.name, val, extra, field.type)"
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
import { EditOutlined, UploadOutlined } from '@ant-design/icons-vue';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

dayjs.extend(localizedFormat);

export default defineComponent({
  name: 'UpdateModal',
  components: {
    EditOutlined,
    UploadOutlined,
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

    watch(() => props.formState, (newVal) => {
      Object.keys(newVal).forEach(key => {
        const field = props.formFields.find(f => f.name === key);
        if (field?.type === 'date') {
          localFormState[key] = newVal[key] ? dayjs(newVal[key]) : null;
        } else if (field?.type === 'radio') {
          // Ensure radio value is properly initialized
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

    const handleFieldChange = (fieldName, value, extra, fieldType) => {
      if (fieldType === 'date') {
        localFormState[fieldName] = value;
      } else if (fieldType === 'radio') {
        localFormState[fieldName] = value;
      } else if (fieldType === 'select' || fieldType === 'multiselect') {
        localFormState[fieldName] = value;
      } else {
        localFormState[fieldName] = value;
      }
    };

    const handleOk = async () => {
      try {
        if (formRef.value) {
          await formRef.value.validate();
        }
        
        loading.value = true;
        const formData = { ...localFormState };

        Object.keys(formData).forEach(key => {
          if (formData[key] instanceof dayjs) {
            formData[key] = formData[key].format('YYYY-MM-DD');
          }
        });

        await props.updateObject(formData);
        isModalOpen.value = false;
        emit(`${props.objectName}Updated`);
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
        case 'date':
          return DatePicker;
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
      dateFormat: 'YYYY-MM-DD',
      showModal,
      handleCancel,
      handleOk,
      handleFieldChange,
      getComponentType,
    };
  },
});
</script>