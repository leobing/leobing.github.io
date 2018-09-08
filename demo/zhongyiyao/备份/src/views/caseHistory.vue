<!-- 病历页（订单） -->
<style scoped>
    .dia-item{height:auto;border-radius:5px;}
    .order-item{display:inline-block;width:100%;border:1px solid #666;padding:10px 0;text-align:center;color:#fff;margin-bottom:8px;cursor:pointer;box-sizing:border-box;border-radius:2px;}
    .order-item .num{font-size:22px;color:#40b542;}
    .order-item.active,
    .order-item:hover{background-color:#40b542;border-color:#40b542;}
    .order-item.active .num,
    .order-item:hover .num{color:#fff;}
    .v-line{position:relative;text-align:center;line-height:35px;}
    .v-line:after{content:'';position:absolute;width:1px;height:100%;background:#eee;right:0;}
    .v-line.last:after{width:0;}
</style>
<template>
    <Layout>
        <div class="path" :style="{'background-color':'#fff',padding:'0 16px 0','border-bottom':'1px solid #eee'}">
            <Breadcrumb :style="{margin: '16px 0',height:'32px','line-height':'22px'}">
                <BreadcrumbItem>
                    <div class="fl">
                        <Icon type="ios-home-outline" size="24" />
                        <span >病历</span>
                    </div>
                    <Search class="fr"></Search>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div style="height:auto;padding:6px 10px 10px" >
            <Row type="flex" justify="space-around">
                <Col span="6">
                    <Diamond :style="{padding:'10px 15px 10px'}">
                        <span slot="tit">日期筛选</span>
                        <div slot="con">
                            <Row type="flex">
                                <Col span="12">
                                    <DatePicker type="daterange" split-panels @on-change="dateChange" placement="bottom-start" placeholder="请选择日期区间" style="width: 200px"></DatePicker>
                                </Col>
                            </Row>
                        </div>
                    </Diamond>
                </Col>
                <Col span="6">
                    <Diamond>
                        <span slot="tit">病症筛选</span>
                        <div slot="con">
                            <Cascader :data="data" @on-change="illChange"></Cascader>
                        </div>
                    </Diamond>
                </Col>
                <Col span="6">
                    <Diamond>
                        <span slot="tit">大夫筛选</span>
                        <div slot="con">
                            <Row type="flex" :style="{}">
                                <Col>
                                    <span :style="{'margin-right':'5px','line-height':'30px','font-size':'14px'}">大夫名字</span>
                                </Col>
                                <Col span="6">
                                    <Select v-model="doctorName" style="width:200px" @on-change="doctorChange" clearable>
                                        <Option v-for="item in doctorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                    </Diamond>
                </Col>
                <Col span="6">
                    <Diamond>
                        <span slot="tit">诊所筛选</span>
                        <div slot="con">
                            <Row type="flex" :style="{}">
                                <Col>
                                    <span :style="{'margin-right':'5px','line-height':'30px','font-size':'14px'}">诊所名字</span>
                                </Col>
                                <Col span="6">
                                    <Select v-model="clinicName" style="width:200px" @on-change="clinicChange" clearable>
                                        <Option v-for="item in clinicList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                    </Diamond>
                </Col>
            </Row>
            <!-- 订单信息 -->
            <Row :style="{'margin-top':'5px'}">
                <Col :style="{'margin-bottom':'5px'}">
                    <Diamond class="dia-item" :style="{background:'#202133'}">
                        <div :style="{display:'inline',color:'#fff'}" slot="tit">病历信息</div>
                        <div slot="con">
                            <Row>
                                <Col span="4" :style="{'margin-right':'20px'}">
                                    <div class="order-item" :class="{active:1 == isActive}" @click="allOrders(1)">
                                        <div class="num">{{ allOrderNum }}</div>
                                        <div>全部病历</div>
                                    </div>
                                </Col>
                                <Col span="4" :style="{'margin-right':'20px'}">
                                    <div class="order-item" :class="{active:2 == isActive}" @click="allOrders(2)">
                                        <div class="num" v-text="waitAna"></div>
                                        <div>待开药方</div>
                                    </div>
                                </Col>
                                <Col span="4" :style="{'margin-right':'20px'}">
                                    <div class="order-item" :class="{active:3 == isActive}" @click="allOrders(3)">
                                        <div class="num" v-text="waitGetAna"></div>
                                        <div>待取药方</div>
                                    </div>
                                </Col>
                                <Col span="4" :style="{'margin-right':'30px'}">
                                    <div class="order-item" :class="{active:4 == isActive}" @click="allOrders(4)">
                                        <div class="num" v-text="anaComplete"></div>
                                        <div>完成治疗</div>
                                    </div>
                                </Col>
                                <Col span="4" offset='2'>
                                    <router-link to="/platform/editCase">
                                        <div class="order-item" :style="{'background-color':'#40b542','border-color':'#40b542'}">
                                            <div :style="{'line-height':'50px','font-size':'20px'}">录入病历</div>
                                        </div>
                                    </router-link>
                                </Col>
                            </Row>
                        </div>
                    </Diamond>
                </Col>
            </Row>
            <Row>
                <Col>
                    <allOrderList :date="date" :illness="illness" :doctor="doctor" :clinic="clinic" :orderStatus="orderStatus" :page="page" ></allOrderList>
                </Col>
            </Row>
        </div>
    </Layout>
</template>
<script>
    import Diamond from '@/components/diamond'
    import Search from '@/components/Search'
    import axios from 'axios';
    import allOrderList from '@/views/allOrderList'


    export default {
        data(){
            return{
                allOrderNum:0,
                isActive:1,
                data: [{
                    value: '内科',
                    label: '内科',
                    children: [
                        {
                            value: '心脏病',
                            label: '心脏病'
                        },
                        {
                            value: '脑溢血',
                            label: '脑溢血'
                        }
                    ]
                }, {
                    value: '外科',
                    label: '外科',
                    children: [
                        {
                            value: '烧伤',
                            label: '烧伤',
                        },
                        {
                            value: '骨折',
                            label: '骨折'
                        }
                    ],
                }],
                doctorList: [],
                doctorName: '',
                clinicList: [],
                clinicName: '',
                waitAna:0,
                waitGetAna:0,
                anaComplete:0,
                orderStatus:'all',
                page:1,
                date:[],   //日期筛选
                illness:[],   //病症筛选
                doctor:'',   //大夫筛选
                clinic:'',   //诊所筛选
            }
        },
        mounted(){
            this.init();
            this.getAllDoc();
            this.getAllClinic();
        },
        methods:{
            getAllDoc(){
                axios.get('/users/allPersonInfo').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        var temp = res.result;
                        var Arr = [];
                        for(var i=0; i<temp.length; i++){
                            Arr.push({
                                value: temp[i].userName,
                                label: temp[i].userName
                            });
                        }
                        this.doctorList = Arr;
                    }
                });
            },
            getAllClinic(){
                axios.get('/clinics/allClinicInfo').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        var temp = res.result;
                        var Arr = [];
                        for(var i=0; i<temp.length; i++){
                            Arr.push({
                                value: temp[i].name,
                                label: temp[i].name
                            });
                        }
                        this.clinicList = Arr;
                    }
                });
            },
            dateChange(val,type){
                if(val[0] == '' && val[1] == ''){
                    this.date = [];
                }else{
                    this.date = val;
                }
                console.log(val);
            },
            illChange(val,sel){
                this.illness = val;
                // console.log(val);
            },
            doctorChange(val){
                this.doctor = val; //主治大夫
                // console.log(val);
            },
            clinicChange(val){
                this.clinic = val; //主治大夫
                // console.log(val);
            },
            init(){
                // 获取所有病历(订单)信息
                axios.get('orders/getAllOrdersNum').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        var doc = res.result;
                        this.allOrderNum = doc.length;
                        for(var item in doc){
                            if(doc[item].orderStatus == '0'){
                                // 表示待开药方
                                this.waitAna++
                            }else if(doc[item].orderStatus == '1'){
                                // 表示待取药方
                                this.waitGetAna++
                            }else if(doc[item].orderStatus == '2'){
                                // 表示订单完成
                                this.anaComplete++
                            }
                        }
                    }
                })
            },
            allOrders(index){
                this.isActive = index;
                if(index == '1'){
                    this.orderStatus = 'all';
                    this.page = 1;
                }else if(index == '2'){
                    this.orderStatus = '0';
                    this.page = 1;
                }else if(index == '3'){
                    this.orderStatus = '1';
                    this.page = 1;
                }else if(index == '4'){
                    this.orderStatus = '2';
                    this.page = 1;
                }
            }
        },
        components:{
            Diamond,
            Search,
            allOrderList
        }
    }
</script>
