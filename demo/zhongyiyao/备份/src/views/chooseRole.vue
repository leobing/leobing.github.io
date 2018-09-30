<template>
	<div class="wrap">
		<div class="con">
			<h1>欢迎来到中医药平台</h1>
			<h2 style="font-weight:normal;">请选择您的角色</h2>
			<div class="btn">
				<Button type="primary" @click="toClinic">诊所</Button>
				<Button @click="toDoctor" style="color:#6296ea;border-color:#6296ea;">医生</Button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	.wrap{position:fixed;width:100%;height:100%;background:#999 url(/static/login-bg.png) no-repeat center;background-size:cover;color:#6296ea;}
	.con{width:500px;height:300px;text-align: center;position:absolute;top:35%;left:50%;margin-top:-150px;margin-left:-250px;background-color: #ffffff;padding-top:50px;border-radius:5px;}
	.btn{margin-top:30px;}
	.btn button{margin:5px;width:90px;font-size:16px;}
</style>

<script>
	import axios from 'axios'

    export default {
        data () {
            return {
                msg:'vue'
            }
        },
        methods: {
            toDoctor(){
            	// 跳转至医生登录页
            	this.$router.push('/doctorLogin')
            },
            toClinic(){
            	// 跳转至诊所登录页
            	this.$router.push('/clinicLogin')
            }
        }
    }
</script>
