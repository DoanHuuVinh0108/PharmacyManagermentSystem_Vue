<template>
  <div>
    <a-button type="primary" @click="showModal">Add {{ objectName }}<PlusCircleOutlined /></a-button>
    <a-modal v-model:open="visible" :title="`Add ${objectName}`" @ok="handleOk" @cancel="handleCancel">
      <template #footer>
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
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
          <component
            :is="getComponentType(field.type)"
            v-model:value="formState[field.name]"
            :placeholder="`Enter ${field.label}`"
            :disabled="field.disabled"
            :min="field.type === 'int' ? 0 : null"
            :format="field.type === 'date' ? dateFormat : null"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { PlusCircleOutlined } from '@ant-design/icons-vue';
import { DatePicker, Input, InputNumber, Upload } from 'ant-design-vue';
import dayjs from 'dayjs';    
import localizedFormat from 'dayjs/plugin/localizedFormat'; 

dayjs.extend(localizedFormat); 

const dateFormat = 'YYYY-MM-DD';

export default defineComponent({
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

    const showModal = () => {
      visible.value = true;
      resetFormState();
    };

    const resetFormState = () => {
      for (const field of props.formFields) {
        props.formState[field.name] = field.type === 'date' ? null : '';
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
        console.log("Object created successfully!");
        emit(`${props.objectName}Created`);
        resetFormState();
      } catch (error) {
        console.error('Validation/API call error:', error);
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
    };
  },
  components: {
    PlusCircleOutlined,
  },
});
</script>
