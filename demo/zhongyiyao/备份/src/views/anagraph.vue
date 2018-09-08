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
    .text_overflow1{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
</style>
<template>
    <Layout>
        <div class="path" :style="{'background-color':'#fff',padding:'0 16px 0','border-bottom':'1px solid #eee'}">
            <Breadcrumb :style="{margin: '16px 0',height:'32px','line-height':'22px'}">
                <BreadcrumbItem>
                    <div class="fl">
                        <Icon type="ios-home-outline" size="24" />
                        <span >药方列表</span>
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
                                    <!-- <DatePicker type="daterange" placement="bottom-start" placeholder="请选择日期区间" style="width: 200px"></DatePicker> -->
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
                            <Cascader :data="data" v-model="value1" @on-change="illChange"></Cascader>
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
                                    <Select v-model="doctorName" style="width:200px"  @on-change="doctorChange" clearable>
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
                        <div :style="{display:'inline',color:'#fff'}" slot="tit">药方信息</div>
                        <div slot="con">
                            <Row>
                                <Col span="4" :style="{'margin-right':'20px'}">
                                    <div class="order-item" :class="{active:1 == isActive}" @click="allOrders(1)">
                                        <div class="num">{{ allOrderNum }}</div>
                                        <div>全部药方</div>
                                    </div>
                                </Col>
                                <Col span="4" :style="{'margin-right':'20px'}">
                                    <div class="order-item" :class="{active:2 == isActive}" @click="allOrders(2)">
                                        <div class="num" v-text="auditedPass"></div>
                                        <!-- 即审核通过的药方 -->
                                        <div>录入成功</div>
                                    </div>
                                </Col>
                                <Col span="4" :style="{'margin-right':'20px'}">
                                    <div class="order-item" :class="{active:3 == isActive}" @click="allOrders(3)">
                                        <div class="num" v-text="waitAudited"></div>
                                        <div>待审核药方</div>
                                    </div>
                                </Col>
                                <Col span="4" :style="{'margin-right':'30px'}">
                                    <div class="order-item" :class="{active:4 == isActive}" @click="allOrders(4)">
                                        <div class="num" v-text="noAudited"></div>
                                        <div>审核未通过</div>
                                    </div>
                                </Col>
                                <Col span="4" offset='2'>
                                    <router-link to="/platform/editAnagraph">
                                        <div class="order-item" :style="{'background-color':'#40b542','border-color':'#40b542'}">
                                            <div :style="{'line-height':'50px','font-size':'20px'}">录入药方</div>
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
                    <anaList :date="date" :illness="illness" :doctor="doctor" :clinic="clinic" :anaStatus="anaStatus" :page="page" ></anaList>

                </Col>
            </Row>
        </div>
        
    </Layout>
</template>
<script>
    import Diamond from '@/components/diamond'
    import Search from '@/components/Search'
    import anaList from '@/views/anaList'

    import axios from 'axios'

    export default {
        data(){
            return{
                isActive:1,
                value1: [],
                data: [
                    {
                        value: 'neike',
                        label: '内科',
                        children: [
                            {
                                value: 'xinzangbing',
                                label: '心脏病'
                            },
                            {
                                value: 'naoyixue',
                                label: '脑溢血'
                            }
                        ]
                    }, {
                        value: 'waike',
                        label: '外科',
                        children: [
                            {
                                value: 'shaoshang',
                                label: '烧伤',
                                children: [
                                    {
                                        value: 'piwaishaoshang',
                                        label: '皮外烧伤',
                                    }
                                ]
                            },
                            {
                                value: 'guzhe',
                                label: '骨折'
                            }
                        ],
                    }
                ],
                doctorList: [],
                doctorName: '',
                clinicList: [],
                clinicName: '',
                AnaList:[],
                allOrderNum:0,
                waitAudited:0,
                auditedPass:0,
                noAudited:0,
                anaStatus:'all',
                page:1,
                date:[],   //日期筛选
                illness:[],   //病症筛选
                doctor:'',   //大夫筛选
                clinic:'',   //诊所筛选
            }
        },
        mounted(){
            this.getAnaList();
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
                this.doctor = val; //持有大夫
                // console.log(val);
            },
            clinicChange(val){
                this.clinic = val; //诊所
            },
            getAnaList(){
                console.log('suc');
                
                axios.get('anagraphs/getAllAnaNum').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        var doc = res.result;
                        this.allOrderNum = doc.length;
                        for(var item in doc){
                            if(doc[item].status == '1'){
                                // 表示待审核
                                this.waitAudited++
                            }else if(doc[item].status == '2'){
                                // 表示审核通过
                                this.auditedPass++
                            }else if(doc[item].status == '3'){
                                // 表示审核未通过
                                this.noAudited++
                            }
                        }
                    }
                })
            },
            allOrders(index){
                this.isActive = index;
                if(index == '1'){
                    this.anaStatus = 'all';
                    this.page = 1;
                }else if(index == '2'){
                    this.anaStatus = '2';
                    this.page = 1;
                }else if(index == '3'){
                    this.anaStatus = '1';
                    this.page = 1;
                }else if(index == '4'){
                    this.anaStatus = '3';
                    this.page = 1;
                }
            }
        },
        components:{
            Diamond,
            Search,
            anaList
        }
    }
</script>
