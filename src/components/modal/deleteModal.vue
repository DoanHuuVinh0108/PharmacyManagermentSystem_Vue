<template>
    <a-popconfirm
      title="Are you sure you want to delete this item?"
      @confirm="confirm"
      okText="Yes"
      cancelText="No"
    >
      <template #icon>
        <Question-circle-outlined style="color: red" />
      </template>
      <a-button type="primary" >
        <DeleteOutlined />
    </a-button>
    </a-popconfirm>
  </template>
  
  <script>
  import { QuestionCircleOutlined,DeleteOutlined } from '@ant-design/icons-vue';
  
  export default {
    components: { QuestionCircleOutlined,DeleteOutlined },
    props: {
      id: {
        type: Object,
        required: true,
      },
    },
    methods: {
      confirm() {
        this.$emit('deleted', this.id); 
      },
    },
  };
  </script>
  