<!-- 上传病历 -->
<style scoped>
    .clearfix:after{content:'';clear:both;display:block;}
    .clearfix:before{content:'';clear:both;display:block;}
    .drugitem{font-size:14px;margin-bottom:5px;}
</style>
<template>
    <Layout>
        <div class="path" :style="{'background-color':'#fff',padding:'0 16px 0','border-bottom':'1px solid #eee'}">
            <Breadcrumb :style="{margin: '16px 0',height:'32px','line-height':'22px'}">
                <BreadcrumbItem>
                    <div class="fl">
                        <Icon type="ios-home-outline" size="24" />
                        <span >上传病历</span>
                    </div>
                    <Search class="fr"></Search>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div style="height:auto;padding:6px 10px 10px" >
            <Row type="flex">
                <Col span="24" :style="{'background-color':'#202133',color:'#fff','font-size':'16px'}">
                    <!-- <div style="float:left;line-height:40px;margin-left:15px">病历编号：194564213421</div> -->
                    <div style="float:right;line-height:40px;padding:0 35px;background-color:#40b542">返回</div>
                </Col>
            </Row>
            <!-- 病人基本信息-表单 -->
            <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="70" :showMessage="false">
                <Row :style="{'margin-top':'10px','background-color':'#fff'}">
                    <Col :style="{'border':'1px solid #ccc',padding:'5px',width:'49.5%',float:'left'}">
                        <div class="clearfix">
                            <h2 style="font-weight:normal;float:left;">病人基本信息</h2>
                            <Tag color="success" :style="{float:'right'}">{{ formItem.clinicName }}</Tag>
                        </div>
                        <!-- 图像上传 -->
                        <Row :style="{'margin-top':'10px'}">
                            <Col span="6">
                                <SickImgUpload v-on:uploadSuc="savePath" :uploadList="formItem.sickImg" v-on:remove="removeEl" style="height:200px"></SickImgUpload>
                            </Col>
                            <Col span="18">
                                <FormItem label="姓名" prop="user">
                                    <Input :style="{width:'200px'}" v-model="formItem.user" placeholder="姓名"></Input>
                                </FormItem>
                                <FormItem style="margin-top:-20px" label="性别" prop="gender">
                                    <RadioGroup v-model="formItem.gender">
                                        <Radio label="男">男</Radio>
                                        <Radio label="女">女</Radio>
                                    </RadioGroup>
                                </FormItem>
                                <FormItem style="margin-top:-20px" label="出生年月" prop="valueDate">
                                    <DatePicker @on-change="dateChange" v-model="formItem.valueDate" type="date" placeholder="选择日期" style="width: 200px"></DatePicker>
                                </FormItem>
                                <FormItem style="margin-top:-20px" label="年龄" prop="age">
                                    <Input :style="{width:'200px'}" readonly v-model="formItem.age" placeholder="年龄" number></Input>
                                </FormItem>
                                <FormItem style="margin-top:-20px" label="家庭地址" prop="familyAddress">
                                    <Input v-model="formItem.familyAddress" placeholder="家庭地址"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                    <Col :style="{'border':'1px solid #ccc',padding:'5px','padding-bottom':'10px',width:'49.5%',float:'right'}">
                        <div class="clearfix">
                            <h2 style="font-weight:normal;float:left;">病人病情描述</h2>
                            <FormItem label="病症" :style="{float:'right',width:'300px','margin-bottom':'0'}">
                                <Cascader placement="top-end" :data="data" v-model="formItem.illness"></Cascader>
                            </FormItem>
                        </div>
                        <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 9,maxRows: 9}" placeholder="请描述病人详情..." :style="{'padding-top':'6px'}"></Input>
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
                <Row :style="{'margin-top':'10px','background-color':'#fff'}">
                    <Col :style="{border:'1px solid #ccc','text-align':'center',padding:'10px 0',width:'14%','margin-right':'1%',float:'left'}">
                        <Avatar :src="userIcon" :style="{width:'100px',height:'100px','border-radius':'50%',border:'1px solid #ccc','margin-bottom':'30px'}" />
                        <h3>{{userName}}</h3>
                    </Col>
                    <Col span="4" :style="{padding:'10px'}">
                        <h3 :style="{margin:'5px'}">开药方</h3>
                        <Button @click="choiceAna" type="primary" :style="{margin:'5px'}">选择药方</Button>
                        <!-- <Button type="primary" :style="{margin:'5px'}">上传药方</Button> -->
                    </Col>
                </Row>
                <!-- 选中的药方列表 -->
                <Row style="margin-top:15px;">
                    <Col>
                        <Diamond v-for="(item, index) in selectedAna" style="height:auto;box-shadow:0px 0px 8px #ddd;" :key="index">
                            <span slot="tit">
                                {{ item.name }}
                                <!-- <router-link :to="'/platform/anagraphDetail?id=' + item._id" :style="{float:'right','padding-right':'10px',color:'#40b542'}">查看更多 >></router-link> -->
                            </span>
                            <div slot="con"  style="margin-top:20px;overflow:hidden;">
                                <Row>
                                    <Col class="v-line" span="4" :style="{'text-align':'left'}">持有大夫：{{ item.holderName }}</Col>
                                    <Col class="v-line" span="4">主治病症：{{ item.major }}</Col>
                                    <Col class="v-line" span="4">持有诊所：一杆秤大药房</Col>
                                    <Col class="v-line" span="4">主要成分：{{ item.element }}</Col>
                                    <Col class="v-line" span="4">编号：{{ item.number }}</Col>
                                    <Col class="v-line" span="4">注意事项：{{ item.desc }}</Col>
                                    <!-- <Col class="v-line last" span="3">状态：{{ getOrderStatus(item.status) }}</Col> -->
                                </Row>
                                <!-- <Checkbox style="float:right;" :label="index"></Checkbox> -->
                            </div>
                        </Diamond>
                    </Col>
                </Row>

                <div style="text-align:center;padding:10px">
                    <Button type="primary" @click="handleSubmit('formItem')">确认提交</Button>
                </div>
            </Form>
        </div>
        <PopAnaList :modalChoiceAna="anaFlag" v-on:selectData="selectData" v-on:close="close"></PopAnaList>
    </Layout>
</template>
<script>
    import Diamond from '@/components/diamond'
    import SickImgUpload from '@/components/SickImgUpload'
    import UploadReport from '@/components/UploadReport'
    import PopAnaList from './popAnaList'
    import Search from '@/components/Search'

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
        data(){
            return{
                anaFlag:false,
                selectedAna:[],
                formItem: {
                    user: '',
                    gender: '',
                    valueDate: '',
                    age: '',
                    familyAddress:'',
                    sickImg:[],
                    desc:'',
                    illness: [],
                    report:[],
                    anagraphList:[], //选中的药方列表
                    clinicId:'', //当前医生所属诊所ID
                    clinicName:'',  //当前医生所属诊所名字
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ],
                    valueDate: [
                        { required: true, type:'date', message: '请选择出生日期', trigger: 'blur' }
                    ],
                    age: [
                        {
                            required:true,
                            type: 'number',
                            message: '年龄必须为数字且不能为空',
                            trigger: 'blur'
                        }
                    ],
                    familyAddress:[
                        { required: true, message: '请填写家庭地址', trigger: 'blur' }
                    ]
                },
                data: [{
                    value: '内科',
                    label: '内科',
                    children: [
                        {
                            value: '心脏病',
                            label: '心脏病'
                        },
                        {
                            value: '脑血栓',
                            label: '脑血栓'
                        }
                    ]
                }, {
                    value: '外科',
                    label: '外科',
                    children: [
                        {
                            value: '皮肤病',
                            label: '皮肤病'
                        }
                    ],
                }],
            }
        },
        mounted(){
            this.getClinicInfo();
        },
        methods:{
            getClinicInfo(){
                // 获取当前登录医生的所属诊所ID和名字
                axios.get('/users/getDocClinicInfo').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        console.log('测试');
                        console.log(res.result);
                        
                        this.formItem.clinicId = res.result[0]._id;
                        this.formItem.clinicName = res.result[0].name;
                    }
                });
            },
            dateChange(val){
                var aDate = new Date();   
                var thisYear = aDate.getFullYear();
                if(val){
                    var brith = val;
                    brith = brith.substr(0,4);
                    this.formItem.age = (thisYear-brith);
                }else{
                    this.formItem.age = '';
                }

            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post('/orders/addOrder',{
                            formData:this.formItem
                        }).then((response)=>{
                            var res = response.data;
                            if(res.status == '0'){
                                console.log(res.result);
                                var orderTxt = '';
                                for(var i=0; i<res.result.length; i++){
                                    orderTxt += '<Tag color="success" style="display:block">' + res.result[i].orderId + '</Tag>';
                                }
                                if(res.status == '0'){
                                    this.$Modal.confirm({
                                        title:'订单结果',
                                        content:'订单提交成功，您的订单号为！' + orderTxt,
                                        okText:'继续下单',
                                        cancelText:'查看订单',
                                        onOk:()=>{
                                            // 继续下单
                                            this.$router.push({path:'editCase'});
                                        },
                                        onCancel:()=>{
                                            // 前往订单详情页
                                        }
                                    });
                                }else{

                                }
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
                // console.log(this.formItem.sickImg);
            },
            savePathReport(urls){
                this.formItem.report = urls;
                // console.log(this.formItem.report);
            },
            removeElReport(file){
                var ureport = this.formItem.report;
                ureport.splice(ureport.indexOf(file), 1);
            },
            choiceAna(){
                // 选择药方按钮
                this.anaFlag = true;
            },
            close(){
                this.anaFlag = false;
            },
            selectData(data){
                this.selectedAna = data;
                this.formItem.anagraphList = data;
                // console.log('hahah');
                // console.log(this.formItem.anagraphList);
            }
            
        },
        components:{
            Diamond,
            SickImgUpload,
            UploadReport,
            PopAnaList,
            Search
        }
    }
</script>
