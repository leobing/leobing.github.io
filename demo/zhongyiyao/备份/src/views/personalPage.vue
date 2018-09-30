<style scoped>
    .dia-item{background:#202133;height:auto;border-radius:5px;}
    .order-item{display:inline-block;width:100%;border:1px solid #666;padding:10px 0;text-align:center;color:#fff;margin-bottom:8px;box-sizing:border-box;border-radius:2px;cursor:pointer;}
    .order-item .num{font-size:22px;color:#40b542;}
    .order-item.active,
    .order-item:hover{background-color:#40b542;border-color:#40b542;}
    .order-item,
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
                        <span >大夫</span>
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
    			        		<Col :md="10" :sm="10" v-for="(item,index) in formValidate.userLogo" :key="index">
    				        		<img :src="item.url" style="width:100%">
    				        	</Col>
    				        	<Col :md="10" :sm="14">
    				        		<Button type="default" shape="circle" :style="{'margin-top':'5px'}" @click="editPersonInfo">
    					        		<Icon type="md-menu" size="20" />
    				        			信息编辑
    				        		</Button>
    				        		<Button type="default" shape="circle" :style="{margin:'10px 0'}" @click="editAnagraph">
    				        			<Icon type="md-document" size="20" />
    				        			上传药方
    				        		</Button>
    				        	</Col>
    			        	</Row>
    			        </div>
    			        <div>
    			        	<Tag color="success">坐诊门诊</Tag>
    						<span>
    							{{ formValidate.underClinic }}
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
        						<div :style="{display:'inline'}" slot="tit">坐诊门诊</div>
        						<p slot="con">
        							<Tag color="success">{{ formValidate.underClinic }}</Tag>
        						</p>
        					</Diamond>
        				</Col>
        				<Col span="8">
        					<Diamond>
        						<div :style="{display:'inline'}" slot="tit">治疗案例</div>
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
                            <ownerOrder v-show="1 == isActive" :myDataNum="myOrderList"></ownerOrder>
                            <otherOrder v-show="2 == isActive" :dataNum="otherOrderList"></otherOrder>

                            <myAnaList v-show="3 == anaActive" :anaStatus="anaStatus" :page="page" :privateAna="privateAna" ></myAnaList>


                		</Col>
                	</Row>
        		</Col>
        	</Row>
        </div>
    
	    <!-- 弹出框-个人信息编辑 -->
	    <pop-modal :flag="editFlag" @ok="submit" @no='cancel'>
	    	<div slot="content">

	    		<Form :show-message="false" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
			        <FormItem label="用户名" prop="name">
			            <Input v-model="formValidate.name" placeholder="请输入你的名字"></Input>
			        </FormItem>
			        <!-- <FormItem label="所属门诊" prop="underClinic">
			            <Input v-model="formValidate.underClinic" placeholder="Enter your underClinic"></Input>
			        </FormItem> -->
			        <FormItem label="擅长领域" prop="goodField">
			            <!-- <Input v-model="formValidate.goodField" placeholder="Enter your goodField"></Input> -->

			            <Input v-model="formValidate.txt" placeholder="请输入您擅长的领域"></Input>
				        <Tag v-for="item in formValidate.goodField" :key="item" :name="item" closable @on-close="handleClose2">
				            {{ item }}
				        </Tag>
				        <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
			        </FormItem>
			        <!-- 文件上传 -->
			        <FormItem label="用户图像" prop="userLogo">
			        	<MyUpload v-on:uploadSuc="savePath" :uploadList="formValidate.userLogo" v-on:remove="removeEl"></MyUpload>
					</FormItem>


			        <FormItem label="简介" prop="intro">
			            <Input v-model="formValidate.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
			        </FormItem>
			        <FormItem>
			            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
			            <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
			        </FormItem>
			    </Form>



	    	</div>
	    </pop-modal>
    </Layout>

</template>
<script>
    import Diamond from '@/components/diamond'
    import PopModal from '@/components/PopModal'
    import MyUpload from '@/components/Upload'
    import Search from '@/components/Search'

    import ownerOrder from '@/views/ownerOrder'
    import otherOrder from '@/views/otherOrder'
    import myAnaList from '@/views/myAnaList'

    import axios from 'axios'

    export default {
        data(){
            return{
                isAnaActive3:0,
                isAnaActive4:0,
                anaActive:0,
                privateAna:true, //个人药方
                anaStatus:'all',
                page:1,
                isActive:'1',
            	editFlag:false,
            	formValidate: {
	            	userLogo:[],
	            	name:'',
	            	underClinic:'',
	            	intro:'',
	            	goodField: [],
                    txt:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '名字不能为空', trigger: 'blur' }
                    ],
                    intro: [
                        { required: true, message: '请输入描述', trigger: 'blur' },
                        { type: 'string', min: 20, message: '不得少于 20 字', trigger: 'blur' }
                    ],
                    // underClinic: [
                    //     { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    // ]
                },
                myOrderList:0,
                otherOrderList:0,
                allAnaNum:0,
                sucAnaNum:0,
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
        	this.getPersonInfo();
            this.getMyOrderNumber();
            this.getOtherOrderNumber();
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
                axios.get('/orders/getBuyerOrdersNumber').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        this.myOrderList = res.result;
                    }
                });
            },
            getOtherOrderNumber(){
                axios.get('/orders/getSellerOrdersNumber').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        this.otherOrderList = res.result;
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
        		var ulogo = this.formValidate.userLogo;
                ulogo.splice(ulogo.indexOf(file), 1);
        	},
        	getPersonInfo(){
	        	// 获取用户个人信息
	        	axios.get('/users/personInfo').then((response)=>{
	        		var res = response.data;
	        		if(res.status == '0'){
	        			var result = res.result;
	        			this.formValidate.name = result.userName;
                        this.$store.commit('updateUserInfo', result.userName);
	        			this.formValidate.userLogo = result.userLogo;
                        this.$store.commit('updateUserIcon', result.userLogo[0].url);

                        this.formValidate.goodField = result.goodField;
                        this.formValidate.intro = result.intro;
                        // 获取诊所信息
                        axios.get('/clinics/specificClinicInfo',{
                            params:{
                                clinicId:result.underClinic //医生所属诊所
                            }
                        }).then((responseCli)=>{
                            var resCli = responseCli.data;
                            if(resCli.status == '0'){
        	        			this.formValidate.underClinic = resCli.result.name; 
                            }
                        });
	        		}
	        	});

                var param = {
                    privateAna:true,  //只返回登陆者药方信息
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
                
        	},
        	editPersonInfo(){
        		this.editFlag=true;
        	},
            editAnagraph(){
                this.$router.push('editAnagraph');
            },
        	submit(){
                this.editFlag = false;
        	},
        	cancel(){
        		this.editFlag = false;
                this.$Message.info('未修改信息');
                // 更新页面信息
        		this.getPersonInfo();
        	},
        	handleSubmit (name) {
            	// 表单有效性验证
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        axios.post('/users/editPersonInfo',{
                        	formData:this.formValidate
                        }).then((response)=>{
                        	var res = response.data;
                        	if(res.status == '0'){
		                        this.$Message.success('Success!');
		                        this.submit(); //提交成功后，关掉弹出框
		                        // 更新页面信息
                        		this.getPersonInfo();
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
            	this.formValidate.userLogo = urls;
            	console.log(this.formValidate.userLogo);
            }
        },
        components:{
            Diamond,
            PopModal,
            MyUpload,
            Search,
            ownerOrder,
            otherOrder,
            myAnaList
        }
    }
</script>
