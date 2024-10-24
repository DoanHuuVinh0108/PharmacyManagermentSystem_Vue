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
              @change="(val) => handleFieldChange(field.name, val, null, field.type)"
            />
          </template>
          <component
            v-else
            :is="getComponentType(field.type)"
            v-model:value="formState[field.name]"
            :placeholder="`Enter ${field.label}`"
            :disabled="field.disabled"
            :min="field.type === 'int' ? 0 : null"
            :format="field.type === 'date' ? dateFormat : null"
            @change="(val, extra) => handleFieldChange(field.name, val, extra, field.type)"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { PlusCircleOutlined } from '@ant-design/icons-vue';
import { 
  DatePicker, 
  Input, 
  InputNumber, 
  Upload, 
  Select, 
  Radio,
  message 
} from 'ant-design-vue';
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
        switch (field.type) {
          case 'date':
            props.formState[field.name] = null;
            break;
          case 'multiselect':
            props.formState[field.name] = [];
            break;
          case 'select':
            props.formState[field.name] = undefined;
            break;
          case 'radio':
            props.formState[field.name] = field.defaultValue || '';
            break;
          case 'int':
            props.formState[field.name] = undefined;
            break;
          default:
            props.formState[field.name] = '';
        }
      }
    };

    const handleFieldChange = (fieldName, value, extra, fieldType) => {
      if (fieldType === 'date') {
        props.formState[fieldName] = value;
      } else if (fieldType === 'select' || fieldType === 'multiselect') {
        props.formState[fieldName] = value;
      } else if (fieldType === 'radio') {
        props.formState[fieldName] = value;
      } else {
        props.formState[fieldName] = value;
      }
    };

    const handleOk = async () => {
      if (!formRef.value) return;

      try {
        loading.value = true;
        await formRef.value.validate();
        
        const formData = { ...props.formState };
        props.formFields.forEach((field) => {
          if (field.type === 'date' && formData[field.name]) {
            const dateValue = dayjs(formData[field.name]);
            if (dateValue.isValid()) {
              formData[field.name] = dateValue.format(dateFormat);
            } else {
              console.warn(`Invalid date value for field ${field.name}:`, formData[field.name]);
            }
          }
        });

        await props.createObject(formData);
        emit(`${props.objectName}Created`);
        resetFormState();
        message.success(`${props.objectName} created successfully`);
      } catch (error) {
        console.error('Validation/API call error:', error);
        message.error(`Failed to create ${props.objectName}`);
      } finally {
        loading.value = false;
        visible.value = false;
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
        case 'date':
          return DatePicker;
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
    };
  },
  components: {
    PlusCircleOutlined,
  },
});
</script>