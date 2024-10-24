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
          <component
            :is="getComponentType(field.type)"
            v-model:value="localFormState[field.name]"
            :placeholder="`Enter ${field.label}`"
            :disabled="field.disabled"
            :options="field.options || []"
            :mode="field.type === 'multiselect' ? 'multiple' : null"
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
import { message, Input, DatePicker, InputNumber, Radio, Select } from 'ant-design-vue';
import { EditOutlined } from '@ant-design/icons-vue';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import dayjs from 'dayjs';

dayjs.extend(localizedFormat);

export default defineComponent({
  name: 'UpdateModal',
  components: {
    EditOutlined,
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

    watch(() => props.formState, (newVal) => {
      Object.keys(newVal).forEach(key => {
        if (props.formFields.find(field => field.name === key && field.type === 'date')) {
          localFormState[key] = newVal[key] ? dayjs(newVal[key]) : null;
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

    const handleOk = async () => {
      try {
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
        case 'radio':
          return Radio.Group;
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
      dateFormat: 'YYYY-MM-DD',
      showModal,
      handleCancel,
      handleOk,
      getComponentType,
    };
  },
});
</script>
