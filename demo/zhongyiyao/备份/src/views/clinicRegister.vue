<template>
    <div class="wrap">
        <div class="con">
            <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline" style="width:300px;margin:0 auto;">
                <h2>欢迎注册中医药平台——诊所</h2>
                <FormItem prop="name">
                    <Input type="text" style="width:100%;" size="large" v-model="formInline.name" placeholder="诊所名称">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="clinicPwd">
                    <Input type="password" style="width:100%;" size="large" v-model="formInline.clinicPwd" placeholder="密码" @on-enter="handleSubmit('formInline')">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>

                <FormItem>
                    <Button  style="margin:20px 40px 0 30px;width:70px;" type="primary" @click="handleSubmit('formInline')">注册</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<style scoped>
    .wrap{position:absolute;width:100%;height:100%;background:#ccc url(/static/login-bg.png) no-repeat center;background-size:cover;color:#6296ea;}
    .con{width:500px;height:300px;text-align: center;position:absolute;top:35%;left:50%;margin-top:-150px;margin-left:-250px;background-color: #ffffff;padding-top:50px;border-radius:5px;}

    .form h2{margin-bottom:10px;text-align: center;}
</style>

<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                modal1:false,
                formInline: {
                    name: '',
                    clinicPwd: '',
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
                        
                        // 登录请求
                        console.log(this.formInline);
                        axios.post('/clinics/register',{
                            formData:this.formInline
                        }).then((response)=>{
                            var res = response.data;
                            if(res.status == '0'){
                                this.$Modal.confirm({
                                    title:'注册结果',
                                    content:'祝贺您！注册成功，欢迎您成为平台的一员，请赶快登录吧！',
                                    okText:'前往登录页',
                                    cancelText:'留在当前页',
                                    onOk:()=>{
                                        // 前往登录页
                                        this.$router.push({path:'/clinicLogin'});
                                    },
                                    onCancel:()=>{
                                        // 不做处理，留在当前页面
                                    }
                                })

                                // this.modal1 = true;
                            }else if(res.status == '1007'){
                                this.$Message.error(res.msg);
                            }
                        });
                    }
                });
            }
        }
    }
</script>
