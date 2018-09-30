<template>
	<div class="wrap">
		<div class="con">
			<Form class="form" ref="formInline" :model="formInline" :rules="ruleInline" style="width:300px;margin:0 auto;">
				<h2>欢迎登录中医药平台——诊所</h2>
		        <FormItem prop="name">
		            <Input type="text" size="large" v-model="formInline.name" placeholder="用户名" style="width:100%;">
		                <Icon type="ios-person-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem prop="clinicPwd">
		            <Input type="password" size="large" v-model="formInline.clinicPwd" placeholder="密码" @on-enter="handleSubmit('formInline')" style="width:100%;">
		                <Icon type="ios-lock-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem>
		            <Button style="margin:20px 40px 0 30px;width:70px;" type="primary" @click="register">注册</Button>
		            <Button style="margin:20px 40px 0 30px;width:70px;" type="primary" @click="handleSubmit('formInline')">登录</Button>
		        </FormItem>
		    </Form>
		</div>
	</div>
</template>

<style scoped>
	.wrap{position:fixed;width:100%;height:100%;background:#ccc url(/static/login-bg.png) no-repeat center;background-size:cover;color:#6296ea;}
	.con{width:500px;height:300px;text-align: center;position:absolute;top:35%;left:50%;margin-top:-150px;margin-left:-250px;background-color: #ffffff;padding-top:50px;border-radius:5px;}
	/* .form{width:300px;position:absolute;top:300px;right:130px;} */
	.form h2{margin-bottom:10px;text-align: center;}
</style>

<script>
	import axios from 'axios'

    export default {
        data () {
            return {
                formInline: {
                    name: '',
                    clinicPwd: ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    clinicPwd: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
            	// 表单有效性-验证
                this.$refs[name].validate((valid) => {
                    if (!valid) {
                        this.$Message.error('请完成表单!');
                    }else{
                    	var name = this.formInline.name;
		            	var clinicPwd = this.formInline.clinicPwd;
		            	
		            	// 登录请求
		            	// console.log('user:' + name +'-pwd' + clinicPwd);
		            	axios.post('/clinics/login',{
		            		name:name,
		            		clinicPwd:clinicPwd
		            	}).then((response)=>{
		            		var res = response.data;
		            		if(res.status == '0'){
		            			console.log(res);
		            			this.$router.push({path:'platform'});
		            		}else if(res.status == '1003'){
		            			this.$Message.error(res.msg);
		            		}else if(res.status == '1004'){
		            			this.$Message.error(res.msg);
		            		}
		            	});
                    }
                });
            },
            register(){
            	this.$router.push('/clinicRegister');
            }
        }
    }
</script>
