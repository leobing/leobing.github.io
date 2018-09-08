<style scoped>
    .clearfix:after{content:'';clear:both;display:block;}
    .clearfix:before{content:'';clear:both;display:block;}
    .swiper-slide{background-color:#ccc;}
    .form-item-error-tip{color:#ccc;}
</style>
<template>
    <Layout>
        <div class="path" :style="{'background-color':'#fff',padding:'0 16px 0','border-bottom':'1px solid #eee'}">
            <Breadcrumb :style="{margin: '16px 0',height:'32px','line-height':'22px'}">
                <BreadcrumbItem>
                    <div class="fl">
                        <Icon type="ios-home-outline" size="24" />
                        <span >上传药方</span>
                    </div>
                    <Search class="fr"></Search>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div style="height:auto;padding:6px 10px 10px" >
            <Row type="flex">
                    <Col span="24" :style="{'background-color':'#232f3f',color:'#fff','font-size':'16px'}">
                        <div @click="goBack" style="float:right;line-height:40px;padding:0 35px;background-color:#40b542;cursor:pointer;">返回</div>
                </Col>
            </Row>
            <!-- 病人基本信息-表单 -->
            <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="90">
                <Row :style="{'margin-top':'10px','background-color':'#fff'}">
                    <Col :style="{border:'1px solid #ccc','text-align':'center',padding:'10px 0',width:'14%','margin-right':'1%',float:'left'}">
                        <Avatar :src="userIcon" :style="{width:'100px',height:'100px','border-radius':'50%',border:'1px solid #ccc','margin-bottom':'20px'}" />
                        <h3>{{userName}}</h3>
                        <Tag color="success" :style="{'margin':'22px 0 10px 0'}">洛阳市第一人民医院</Tag>
                    </Col>
                    <Col :style="{border:'1px solid #ccc',padding:'10px 0 0 0',width:'45%',float:'left'}">
                        <Row >
                            <Col>
                                <div style="padding:0 10px">
                                    <FormItem label="药方名字：" prop="name">
                                        <Input :style="{width:'200px'}" v-model="formItem.name" placeholder="药方名字"></Input>
                                    </FormItem>
                                    <FormItem label="组成：" prop="element" style="margin-top:-20px">
                                        <Input :style="{width:'200px'}" v-model="formItem.element" placeholder="组成成分"></Input>
                                    </FormItem>
                                    <FormItem label="功效：" prop="effect" style="margin-top:-20px">
                                        <Input :style="{width:'200px'}" v-model="formItem.effect" placeholder="功效"></Input>
                                    </FormItem>
                                    <FormItem label="主治：" prop="major" style="margin-top:-20px">
                                        <Input :style="{width:'200px'}" v-model="formItem.major" placeholder="主治"></Input>
                                    </FormItem>
                                    <FormItem label="用法用量" prop="use" style="margin-top:-20px">
                                        <Input :style="{width:'200px'}" v-model="formItem.use" placeholder="用法用量"></Input>
                                    </FormItem>

                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col :style="{width:'39%','margin-left':'1%',float:'left',border:'1px solid #ccc',padding:'5px 10px'}">
                        <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 9,maxRows: 9}" placeholder="请描述药方详情..." :style="{'padding-top':'6px'}"></Input>
                    </Col>
                </Row>

                <Row :style="{'margin-top':'10px','background-color':'#fff'}">
                    <Col :style="{'border':'1px solid #ccc',padding:'5px',width:'49.5%',float:'left'}">
                        <div :style="{'font-size':'18px'}">药性分析</div :style="{'font-size':'18px'}">
                        <Input v-model="formItem.analyse" type="textarea" :autosize="{minRows: 9,maxRows: 9}" placeholder="请描述病人详情..." :style="{'padding-top':'6px'}"></Input>
                        
                    </Col>
                    <!-- 待定。。。 -->
                    <Col :style="{'border':'1px solid #ccc',padding:'5px','padding-bottom':'10px',width:'49.5%',float:'right'}">
                        <div :style="{'font-size':'18px'}">医疗案例</div :style="{'font-size':'18px'}">
                        <p>待定。。。</p>
                    </Col>
                </Row>

                <!-- 检验报告 -->
                <Row type="flex" :style="{'background-color':'#fff'}">
                    <Col span="24" :style="{'border':'1px solid #ccc',padding:'10px 5px','margin-top':'10px'}">
                        <div :style="{float:'left','line-height':'65px','margin-right':'10px'}">
                            <h2 :style="{'font-weight':'normal'}">相关检验报告：</h2>
                        </div>
                        <UploadReport v-on:uploadSuc="savePathReport" :uploadList="formItem.report" v-on:remove="removeElReport"></UploadReport>
                    </Col>
                </Row>
                <div style="text-align:center;padding:10px">
                    <Button type="primary" @click="handleSubmit('formItem')" :style="{'background-color':'#40b542'}">确认提交</Button>
                </div>
            </Form>
        </div>
    </Layout>
</template>
<script>
    import Diamond from '@/components/diamond'
    import UploadReport from '@/components/UploadReport'
    import Search from '@/components/Search'
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css';


    import axios from 'axios'

    export default {
        computed:{
            userIcon(){
                return this.$store.state.userIcon;
            },
            userName(){
                return this.$store.state.userName;
            }
        },
        mounted(){
            new Swiper('.swiper-container', {
                slidesPerView:3,
                slidesPerGroup:3,
                spaceBetween:10,
                loop:true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        },
        data(){
            return{
                formItem: {
                    name:'',
                    element:'',
                    effect:'',
                    major:'',
                    use:'',
                    desc:'',
                    analyse:'',
                    report:[],
                    holderId:'',
                    holderClinicId:''
                },
                ruleInline: {
                    name:[
                        { required: true, message: '请填写药方名', trigger: 'blur' }
                    ],
                    element:[
                        { required: true, message: '请填写药方组成成分', trigger: 'blur' }
                    ],
                    effect:[
                        { required: true, message: '请填写药方功效', trigger: 'blur' }
                    ],
                    major:[
                        { required: true, message: '请填写药方主治病症', trigger: 'blur' }
                    ],
                    use:[
                        { required: true, message: '请填写药方用法用量', trigger: 'blur' }
                    ],
                },
            }
        },
        methods:{
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(12);
                        axios.post('/anagraphs/addAnagraph',{
                            formData:this.formItem
                        }).then((response)=>{
                            var res = response.data;
                            if(res.status == '0'){
                                this.$Modal.confirm({
                                    title:'药方上传结果',
                                    content:'药方上传提交成功，您的药方编号为' + res.result.orderId,
                                    okText:'继续上传药方',
                                    cancelText:'查看药方详情',
                                    onOk:()=>{
                                        // 继续下单
                                        this.$router.push({path:'editAnagraph'});
                                    },
                                    onCancel:()=>{
                                        // 前往订单详情页
                                    }
                                });
                            }else{

                            }
                        });
                    } else {
                        this.$Message.error('请将表单填写完整!');
                    }
                })
            },
            removeEl(file){
                var ulogo = this.formItem.sickImg;
                ulogo.splice(ulogo.indexOf(file), 1);
            },
            savePath(urls){
                this.formItem.sickImg = urls;
                console.log(this.formItem.sickImg);
            },
            savePathReport(urls){
                this.formItem.report = urls;
                console.log(this.formItem.report);
            },
            removeElReport(file){
                var ureport = this.formItem.report;
                ureport.splice(ureport.indexOf(file), 1);
            },
            goBack(){
                this.$router.go(-1);
            }
        },
        components:{
            Diamond,
            UploadReport,
            Search
        }
    }

     
</script>
