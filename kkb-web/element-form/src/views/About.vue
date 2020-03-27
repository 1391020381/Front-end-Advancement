<template>
  <div class="about">
    {{model}}
   <k-form :model="model" :rules="rules">
     <k-form-item label="用户名" prop="username">
   <!-- <k-input :value="value" @input="value=arguments[0]"></k-input> -->
  <div>
     <k-input type="text"   v-model="model.username"></k-input>
  </div>
   </k-form-item>
   <k-form-item label="密码" prop="password">
   <k-input type="password" v-model="model.password"></k-input>
   </k-form-item>
   </k-form>
    {{checkedValue}}
    <k-checkbox v-model="checkedValue">自定义checkout</k-checkbox>
  </div>
</template>

<script>
import KForm from '@/components/Form.vue'
import KInput from '@/components/Input.vue'
import KFormItem from '@/components/FormItem'
import KCheckbox from '@/components/Checkbox.vue'
export default {
  name: 'about',
  components: {
    KForm,
    KInput,
    KFormItem,
    KCheckbox
  },
  data () {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名' },
          { min: 6, max: 10, message: '请输入6～10的用户名' }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          }
        ]
      },
      checkedValue: ''
    }
  }
}
</script>
