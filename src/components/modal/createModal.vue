<template>
  <div>
    <a-button type="primary" @click="showModal">
      Add {{ objectName }}<PlusCircleOutlined />
    </a-button>
    <a-modal 
      v-model:open="visible" 
      :title="`Add ${objectName}`" 
      @ok="handleOk" 
      @cancel="handleCancel"
    >
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          Submit
        </a-button>
      </template>
      <a-form
        layout="horizontal"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        name="register"
        ref="formRef"
        class="register-form"
        :rules="rules"
      >
        <a-form-item
          v-for="(field, index) in formFields"
          :key="index"
          :label="field.label"
          :name="field.name"
        >
          <template v-if="field.type === 'radio'">
            <a-radio-group 
              v-model:value="formState[field.name]"
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
              v-model:value="formState[field.name]"
              :placeholder="`Select ${field.label}`"
              :disabled="field.disabled"
              :mode="field.type === 'multiselect' ? 'multiple' : undefined"
              :options="field.options || []"
              @change="(value) => handleFieldChange(field.name, value)"
            />
          </template>
          <template v-else-if="field.type === 'multi-date'">
            <div v-for="(date, idx) in formState[field.name]" :key="idx" class="mb-2 flex items-center gap-2">
              <a-date-picker
                v-model:value="formState[field.name][idx]"
                :format="dateFormat"
                placeholder="Select Date"
                @update:value="(value) => handleMultiDateChange(field.name, idx, value)"
              />
              <a-button 
                type="text" 
                danger 
                @click="removeDate(field.name, idx)"
                v-if="formState[field.name].length > 1"
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
              v-model:value="formState[field.name]"
              :format="dateFormat"
              :placeholder="`Select ${field.label}`"
              :disabled="field.disabled"
              @update:value="(value) => handleFieldChange(field.name, value)"
            />
          </template>
          <component
            v-else
            :is="getComponentType(field.type)"
            v-model:value="formState[field.name]"
            :placeholder="`Enter ${field.label}`"
            :disabled="field.disabled"
            :min="field.type === 'int' ? 0 : null"
            @update:value="(value) => handleFieldChange(field.name, value)"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { PlusCircleOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { DatePicker, Input, InputNumber, Upload, Select, Radio, message } from 'ant-design-vue';
import dayjs from 'dayjs';    
import localizedFormat from 'dayjs/plugin/localizedFormat'; 

dayjs.extend(localizedFormat);

export default defineComponent({
  name: 'CreateModal',
  props: {
    objectName: {
      type: String,
      default: 'Object',
    },
    formFields: {
      type: Array,
      required: true,
      default: () => [],
    },
    createObject: {
      type: Function,
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
  },
  emits: ['objectCreated'],
  setup(props, { emit }) {
    const loading = ref(false);
    const visible = ref(false);
    const formRef = ref(null);
    const dateFormat = 'YYYY-MM-DD';

    const showModal = () => {
      visible.value = true;
      resetFormState();
    };

    const resetFormState = () => {
      for (const field of props.formFields) {
        if (field.type === 'multi-date') {
          props.formState[field.name] = [null];
        } else if (field.type === 'date') {
          props.formState[field.name] = null;
        } else {
          props.formState[field.name] = '';
        }
      }
    };

    const handleFieldChange = (fieldName, value) => {
      props.formState[fieldName] = value;
    };

    const handleMultiDateChange = (fieldName, index, value) => {
      if (Array.isArray(props.formState[fieldName])) {
        props.formState[fieldName][index] = value;
      }
    };

    const addDate = (fieldName) => {
      if (Array.isArray(props.formState[fieldName])) {
        props.formState[fieldName].push(null);
      }
    };

    const removeDate = (fieldName, index) => {
      if (Array.isArray(props.formState[fieldName]) && props.formState[fieldName].length > 1) {
        props.formState[fieldName].splice(index, 1);
      }
    };

    const handleOk = async () => {
      if (!formRef.value) return;

      try {
        loading.value = true;
        await formRef.value.validate();

        const formData = { ...props.formState };
        
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

        await props.createObject(formData);
        emit('objectCreated');
        resetFormState();
        visible.value = false;
      } catch (error) {
        console.error('Validation/API call error:', error);
      } finally {
        loading.value = false;
      }
    };

    const handleCancel = () => {
      visible.value = false;
      resetFormState();
    };

    const getComponentType = (type) => {
      switch (type) {
        case 'int':
          return InputNumber;
        case 'password':
          return Input.Password;
        case 'image':
          return Upload;
        case 'string':
        default:
          return Input;
      }
    };

    const labelCol = {
      style: {
        width: '150px',
      },
    };

    const wrapperCol = {
      span: 14,
    };

    return {
      loading,
      visible,
      showModal,
      handleOk,
      handleCancel,
      formRef,
      getComponentType,
      labelCol,
      wrapperCol,
      dateFormat,
      handleFieldChange,
      handleMultiDateChange,
      addDate,
      removeDate,
    };
  },
  components: {
    PlusCircleOutlined,
    DeleteOutlined,
    PlusOutlined,
  },
});
</script>