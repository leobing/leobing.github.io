<style scoped>
    .dia-item{background:#202133;height:auto;border-radius:5px;}
    .order-item{display:inline-block;width:100%;border:1px solid #666;padding:10px 0;text-align:center;color:#fff;margin-bottom:8px;cursor:pointer;box-sizing:border-box;border-radius:2px;}
    .order-item.active,
	.order-item:hover{background-color:#40b542;border-color:#40b542;}
	.order-item .num{font-size:22px;color:#40b542;}
    .order-item.active .num,
	.order-item:hover .num{color:#fff;}
</style>
<template>
    <Layout>
        <div class="path" :style="{'background-color':'#fff',padding:'0 16px 0','border-bottom':'1px solid #eee'}">
            <Breadcrumb :style="{margin: '16px 0',height:'32px','line-height':'22px'}">
                <BreadcrumbItem>
                    <div class="fl">
                        <Icon type="ios-home-outline" size="24" />
                        <span >诊所详情</span>
                    </div>
                    <Search class="fr"></Search>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div style="height:auto;padding:6px 10px 10px" >
        	<Row type="flex" justify="space-between">
        		<!-- 左边 -->
        		<Col span="5" >
        			<Card :bordered="false">
        				<h2 style="text-align:center;margin-bottom:20px">{{ formValidate.name }}</h2>
            			<div style="text-align:center">
    			        	<Row>
    			        		<Col v-for="(item,index) in formValidate.clinicLogo" :key="index">
    				        		<img :src="item.url" style="width:100%">
    				        	</Col>
    				        	<Col>
    				        		<Button type="default" shape="circle" :style="{margin:'10px 0'}" @click="editPersonInfo">
    					        		<Icon type="md-menu" size="20" />
    				        			基本信息
    				        		</Button>
    				        		<Button @click="choiceDoc" type="default" shape="circle" :style="{margin:'10px 0'}">
    				        			<Icon type="md-document" size="20" />
    				        			诊所设置
    				        		</Button>
    				        	</Col>
    			        	</Row>
    			        </div>
    			        <div>
    			        	<Tag color="success">规模</Tag>
    						<span>
    							{{ formValidate.size }}
    						</span>
    			        </div>
                        <div>
                            <Tag color="success">合作医师</Tag>
                            <span>
                                {{ formValidate.doctorNum }}
                            </span>
                        </div>
    			        <div>
    			        	<Tag color="success">擅长领域</Tag>
    			        	<span v-for="item in formValidate.goodField">
    			        		{{ item }}
    			        	</span>
    			        </div>
    			        <Divider />
    			        <div>
    			        	{{ formValidate.intro }}
    			        </div>
        			</Card>
        		</Col>
        		<!-- 右边 -->
        		<Col span="19">
        			<Row>
        				<Col span="8">
        					<Diamond>
        						<div :style="{display:'inline'}" slot="tit">所持药方</div>
        						<p slot="con" style="text-align:center">
        							<span style="font-size:35px;margin-right:10px">{{ sucAnaNum }}</span>付
        						</p>
        					</Diamond>
        				</Col>
        				<Col span="8">
        					<Diamond :style="{height:'105px'}">
        						<div :style="{display:'inline'}" slot="tit">加盟大夫</div>
        						<p slot="con" style="text-align:center">
        							<span style="font-size:35px;margin-right:10px">{{ formValidate.doctorNum }}</span>人
        						</p>
        					</Diamond>
        				</Col>
        				<Col span="8">
        					<Diamond>
        						<div :style="{display:'inline'}" slot="tit">病历管理</div>
        						<p slot="con" style="text-align:center">
        							<span style="font-size:35px;margin-right:10px">{{ myOrderList }}</span>例
        						</p>
        					</Diamond>
        				</Col>
        			</Row>
    				<!-- 订单信息 -->
        			<Row :style="{'margin-top':'5px'}">
                		<Col :style="{'margin-bottom':'5px'}">
                			<Diamond class="dia-item" :style="{background:'#202133'}">
                                <div :style="{display:'inline',color:'#fff'}" slot="tit">订单信息</div>
                                <div slot="con">
                                    <Row>
                                        <Col span="5">
                                            <div class="order-item" :class="{active:1 == isActive}" @click="select(1)">
                                                <div class="num">{{ myOrderList }}</div>
                                                <div>我的订单</div>
                                            </div>
                                        </Col>
                                        <Col span="5" offset='1'>
                                            <div class="order-item" :class="{active:2 == isActive}" @click="select(2)">
                                                <div class="num">{{ otherOrderList }}</div>
                                                <div>其他订单</div>
                                            </div>
                                        </Col>
                                        <Col span="5" offset='1'>
                                            <div class="order-item" :class="{active:3 == isAnaActive3}" @click="select(3)">
                                                <div class="num">{{ allAnaNum }}</div>
                                                <div>全部药方</div>
                                            </div>
                                        </Col>
                                        <Col span="5" offset='1'>
                                            <div class="order-item" :class="{active:4 == isAnaActive4}" @click="select(4)">
                                                <div class="num">{{ sucAnaNum }}</div>
                                                <div>上传成功</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Diamond>
                		</Col>
                		<Col>
                			<!-- <Diamond v-for="(item,index) in orderList" :key="index" style="height:auto;box-shadow:0px 2px 2px #ddd;">
                                <span slot="tit">
                                    {{ item.name }}
                                    <router-link to="/ha" :style="{float:'right','padding-right':'10px',color:'#40b542'}">查看更多 >></router-link>
                                </span>
                                <div slot="con"  style="margin-top:20px;">
                                    <Row>
                                        <Col class="v-line" span="5" :style="{'text-align':'left'}">主治大夫：{{ item.uploadOrderName }}</Col>
                                        <Col class="v-line" span="5">病症：{{ item.illness }}</Col>
                                        <Col class="v-line" span="5">诊所：{{ item.uploadOrderName }}</Col>
                                        <Col class="v-line" span="5">药方：<Tag v-for="(itemAna,index) in item.anagraphList" :key="index">{{ itemAna.name }}</Tag></Col>
                                        <Col class="v-line" span="4">编号：{{ item.orderId }}</Col>
                                    </Row>
                                </div>
                            </Diamond> -->
                            <clinicOrderList v-show="1 == isActive" :dataNum="myOrderList"></clinicOrderList>
                            <clinicOrderList2 v-show="2 == isActive" :dataNum="otherOrderList" ></clinicOrderList2>

                            <!-- <myAnaList v-show="3 == anaActive" :anaStatus="anaStatus" :page="page" :clinicAna="clinicAna" ></myAnaList> -->
                            <clinicAnaList v-show="3 == anaActive" :anaStatus="anaStatus" :page="page" :clinicAna="clinicAna" :doctorIdList="doctorIdList"></clinicAnaList>

                		</Col>
                	</Row>
        		</Col>
        	</Row>
        
    	    <!-- 弹出框-个人信息编辑 -->
    	    <pop-modal :flag="editFlag" @ok="submit" @no='cancel'>
    	    	<div slot="content">
    	    		<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    			        <FormItem label="用户名" prop="name">
    			            <Input v-model="formValidate.name" placeholder="此项为必填项"></Input>
    			        </FormItem>
                        <FormItem label="规模" prop="size">
                            <Input v-model="formValidate.size" placeholder="此项为必填项"></Input>
                        </FormItem>
    			        <FormItem label="擅长领域" prop="goodField">
    			            <Input v-model="formValidate.txt" placeholder="请输入您擅长的领域"></Input>
    				        <Tag v-for="item in formValidate.goodField" :key="item" :name="item" closable @on-close="handleClose2">
    				            {{ item }}
    				        </Tag>
    				        <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
    			        </FormItem>
    			        <!-- 文件上传 -->
    			        <FormItem label="诊所图标" prop="clinicLogo">
    			        	<!-- <MyUpload v-on:uploadSuc="savePath" :uploadList="formValidate.clinicLogo" v-on:remove="removeEl"></MyUpload> -->
                            <singleUpload  v-on:uploadSuc="savePath" :uploadList="formValidate.clinicLogo" v-on:remove="removeEl" ></singleUpload>

    					</FormItem>


    			        <FormItem label="简介" prop="intro">
    			            <Input v-model="formValidate.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入诊所简介"></Input>
    			        </FormItem>
    			        <FormItem>
    			            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
    			            <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> -->
    			        </FormItem>
    			    </Form>
    	    	</div>
    	    </pop-modal>
        </div>
        
        <!-- 弹出框-选择医生—— 功能优化：对已是该诊所的医生进行标注，禁选。 -->
        <!-- 对已有诊所的医生，禁止其他诊所添加 -->
        <PopDocList :modalChoiceDoc="modalChoiceDoc" @selectData="selectData" @close="closeMal" @okDoc="OK"></PopDocList>
    </Layout>

</template>
<script>
    import Diamond from '@/components/diamond'
    import PopModal from '@/components/PopModal'
    import MyUpload from '@/components/Upload'
    import singleUpload from '@/components/singleUpload'
    import Search from '@/components/Search'
    import PopDocList from './popDocList'
    import clinicOrderList from './clinicOrderList'
    import clinicOrderList2 from './clinicOrderList2'
    import clinicAnaList from './clinicAnaList'

    import axios from 'axios'

    export default {
        data(){
            return{
                doctorIdList:[], //该诊所医生Id列表
                isAnaActive3:0,
                isAnaActive4:0,
                anaActive:0,
                clinicAna:true, //诊所药方
                anaStatus:'all',
                allAnaNum:0,
                sucAnaNum:0,
                myOrderList:0,
                otherOrderList:0,
                page:1,
                isActive:'1',
                orderList:[], //订单列表
                modalChoiceDoc:false,
            	editFlag:false,
            	formValidate: {
                    size:'', 
	            	name:'',
	            	doctorNum:'',
	            	intro:'',
	            	goodField: [],
                    clinicLogo:[],
                    txt:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '此项不能为空', trigger: 'blur' }
                    ],
                    intro: [
                        { required: true, message: '此项不能为空', trigger: 'blur' },
                        { type: 'string', min: 20, message: '不得少于20个字符', trigger: 'blur' }
                    ],
                    size: [
                        { required: true, message: '此项不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
            // ...mapState(['userName'])
            userName(){
                return this.$store.state.userName;
            },
            userIcon(){
                return this.$store.state.userIcon;
            }
        },
        mounted(){
        	this.getClinicInfo();
        },
        methods:{
            select(index){
                if(index == 3){ //点击全部药方
                    this.isActive = 0;
                    this.isAnaActive3 = 3;
                    this.isAnaActive4 = 0;
                    this.anaActive = 3;
                    this.anaStatus = 'all';
                }else if(index == 4){ //点击上传成功
                    this.isActive = 0;
                    this.isAnaActive3 = 0;
                    this.isAnaActive4 = 4;
                    this.anaActive = 3;
                    this.anaStatus = 2;
                }else{
                    this.isActive = index;
                    this.isAnaActive3 = 0;
                    this.isAnaActive4 = 0;
                    this.anaActive = 0;
                }
            },
            getMyOrderNumber(){
                // 1、获取诊所下边所属医生的ID。
                axios.get('/clinics/getClinicUnderDocId').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        this.doctorIdList = res.result;
                        // 2、获得医生（所属诊所的医生）ID下的订单数。——我的订单（作为买家）
                        var param = {
                            doctorIdList:this.doctorIdList
                        }
                        axios.get('/orders/getDoctorOrderBuyNum',{
                            params:param
                        }).then((responseNum)=>{
                            var resNum = responseNum.data;
                            if(resNum.status == '0'){
                                this.myOrderList = resNum.result.num;
                            }
                        });
                    }
                });
            },
            getOtherOrderNumber(){
                // 1、获取诊所下边所属医生的ID。
                axios.get('/clinics/getClinicUnderDocId').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        var doctorIdList = res.result;
                        // 2、获得医生（所属诊所的医生）ID下的订单数。——其他订单（作为卖家）
                        var param = {
                            doctorIdList:doctorIdList
                        }
                        axios.get('/orders/getDoctorOrderSellNum',{
                            params:param
                        }).then((responseNum)=>{
                            var resNum = responseNum.data;
                            if(resNum.status == '0'){
                                this.otherOrderList = resNum.result.num;
                            }
                        });
                    }
                });
            },
        	handleUpload (file) {
                this.file = file;
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            },
        	removeEl(file){
        		var ulogo = this.formValidate.clinicLogo;
                ulogo.splice(ulogo.indexOf(file), 1);
        	},
        	getClinicInfo(){
	        	// 获取诊所信息
	        	axios.get('/clinics/clinicInfo').then((response)=>{
	        		var res = response.data;
	        		if(res.status == '0'){
	        			var result = res.result;
	        			this.formValidate.name = result.name;
                        this.$store.commit('updateUserInfo', result.name);
	        			// this.formValidate.clinicLogo = result.clinicLogo;
                        // this.$store.commit('updateUserIcon', result.clinicLogo[0].url);

                        this.formValidate.size = result.size;
                        this.formValidate.clinicLogo = result.clinicLogo;
	        			this.formValidate.goodField = result.goodField;
                        this.formValidate.intro = result.intro;
	        			this.formValidate.doctorNum = result.doctorList.length;
                        this.orderList = result.illCaseList;

                        this.getMyOrderNumber();
                        this.getOtherOrderNumber();

	        		}
	        	});

                // 1、获取诊所下边所属医生的ID。
                axios.get('/clinics/getClinicUnderDocId').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        var doctorIdList = res.result;

                        var param = {
                            clinicAna:true,  //只返回该诊所药方信息
                            doctorIdList:doctorIdList
                        }
                        axios.get('anagraphs/getAllAnaNum',{
                            params:param
                        }).then((response)=>{
                            var res = response.data;
                            if(res.status == '0'){
                                this.allAnaNum = res.result.length;

                                for(var i=0; i<res.result.length; i++){
                                    if(res.result[i].status == '2'){
                                        this.sucAnaNum++
                                    }
                                }
                            }
                        });
                    }
                });

        	},
        	editPersonInfo(){
        		this.editFlag=true;
        	},
        	submit(){
                this.editFlag = false;
        	},
        	cancel(){
        		this.editFlag = false;
                this.$Message.info('未修改信息');
                // 更新页面信息
        		this.getClinicInfo();
        	},
        	handleSubmit (name) {
            	// 表单有效性验证
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post('/clinics/editClinicInfo',{
                        	formData:this.formValidate
                        }).then((response)=>{
                        	var res = response.data;
                        	if(res.status == '0'){
		                        this.$Message.success('Success!');
		                        this.submit(); //提交成功后，关掉弹出框
		                        // 更新页面信息
                        		this.getClinicInfo();
                        	}
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                });

            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.formValidate.goodField.push(this.formValidate.txt);
            },
            handleClose2 (event, name) {
                const index = this.formValidate.goodField.indexOf(name);
                this.formValidate.goodField.splice(index, 1);
            },
            savePath(urls){
            	this.formValidate.clinicLogo = urls;
            	// console.log(this.formValidate.clinicLogo);
            },
            choiceDoc(){
                this.modalChoiceDoc = true;
            },
            OK(val){
                console.log(val);
            },
            closeMal(){
                this.modalChoiceDoc = false;
            },
            // 被选中的医生
            selectData(val){
                console.log(val);
                var selectDocIdList = [];  //将选中的医生ID

                for(var i=0; i<val.length; i++){
                    selectDocIdList.push(val[i]._id);
                }
                console.log(selectDocIdList);

                // 将选中的医生ID存入诊所的医生列表中，再将诊所ID存入医生的所属诊所中。
                axios.get('/clinics/clinicAddDoctor',{
                    params:{
                        selectDocIdList:selectDocIdList
                    }
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        // 添加成功
                        this.$Message.error('添加成功!');
                        // 更新页面信息
                        this.getClinicInfo();
                    }
                });
            }
        },
        components:{
            Diamond,
            PopModal,
            MyUpload,
            singleUpload,
            PopDocList,
            Search,
            clinicOrderList,
            clinicOrderList2,
            clinicAnaList

        }
    }
</script>
