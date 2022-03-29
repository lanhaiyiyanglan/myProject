<template>
  <div id="app">
    <el-form ref="loginForm" :model="form" label-width="80px" :rules="loginRules">
			  <el-form-item label="用户名" prop="userName">
			    <el-input v-model="form.userName" name="userName" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pwd1">
			    <el-input v-model="form.pwd1" name="pwd1" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="pwd2">
			    <el-input v-model="form.pwd2" name="pwd2" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
				    <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
				    <el-button @click="resetForm('loginForm')">取消</el-button>
			  </el-form-item>
    </el-form>
  </div>
</template>
<script>
	export default {
		
		data(){
			let validatePass=(rule,value,callback)=>{
				if(value===''){
			 	 	 callback(new Error('请输入密码'));
			 	 }else{
			 	 	 if(this.form.pwd1!==''){
			 	 	 	this.$refs.loginForm.validateField('pwd2');
			 	 	 }
			 	 	 callback();
			 	 }
			}
			let validatePass2=(rule,value,callback)=>{
			 	 if(value===''){
			 	 	 callback(new Error('请再次输入密码'));
			 	 }else if(value!==this.form.pwd1){
			 	 	 callback(new Error('两次输入密码不一致'));
			 	 }else{
			 	 	 callback();
			 	 }
			 };
			return{
				form:{
					userName:'',
					pwd1:'',
					pwd2:''
				},
				loginRules:{
					userName: [{required: true, trigger: 'blur',message: '请输入用户名'}],
			        pwd1: [{validator: validatePass,required: true, trigger: 'blur'}],
			        pwd2: [{validator: validatePass2,required: true, trigger: 'blur'}]
				}
			}
		},
		methods: {
	      onSubmit(formName) {
	      	this.$refs[formName].validate((valid) => {
	          if (valid&&this.form.userName=="lancy") {
	            this.$store.dispatch('Login',this.form.userName)
				      this.$router.push({path: '/home',name: 'home'});
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
           });
	      },
	      resetForm(formName){
	      	this.$refs[formName].resetFields();
	      }
	    }
	}
</script>

<style>
</style>