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
    
    .picTxt{overflow: hidden;}
    .picTxt dt{float: left;margin-right:10px;}
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
                        <span >药方</span>
                    </div>
                    <Input class="fr" search enter-button="Search" placeholder="Enter something..." />
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div style="height:auto;padding:6px 10px 10px" >
            <Row type="flex" justify="space-between">
                <!-- 左边 -->
                <Col span="5" >
                    <Card :bordered="false">
                        <h2 style="text-align:center;margin-bottom:15px">{{ anaInfo.name }}</h2>
                        <div style="text-align:center">
                            <Row>
<!--                                 <Col :md="10" :sm="10" >
                                    <img src="item.url" style="width:100%">
                                </Col> -->
                                <Col>
                                    <Button type="default" shape="circle" :style="{'margin-top':'5px','margin-bottom':'10px'}">
                                        <Icon type="md-menu" size="20" />
                                        信息编辑
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Tag color="success">主要成分</Tag>
                            <span>
                                {{ anaInfo.element }}
                            </span>
                        </div>
                        <div>
                            <Tag color="success">功效</Tag>
                           {{ anaInfo.effect }}
                        </div>
                        <div>
                            <Tag color="success">主治</Tag>
                            <span>
                                {{ anaInfo.major }}
                            </span>
                        </div>
                        <div>
                            <Tag color="success">用法用量</Tag>
                            <span>
                                {{ anaInfo.use }}
                            </span>
                        </div>
                        <Divider />
                        <div>
                            <h3>药性分析</h3>
                            <p style="margin-top:5px;">
                                {{ anaInfo.analyse }}
                            </p>
                        </div>
                        <div style="margin-top:10px;">
                            <h3>注意事项</h3>
                            <p style="margin-top:5px;">
                                {{ anaInfo.desc }}
                            </p>
                        </div>
                    </Card>
                </Col>
                <!-- 右边 -->
                <Col span="19">
                    <Row>
                        <Col span="8">
                            <Diamond>
                                <div :style="{display:'inline'}" slot="tit">药方所属</div>
                                <dl slot="con" class="picTxt">
                                    <dt v-for="(item,index) in personInfo.userLogo" :key="index">
                                        <Avatar :src="item.url" :style="{width:'50px',height:'50px'}" />
                                    </dt>
                                    <dt>
                                        <h2>{{ personInfo.userName }}</h2>
                                        <p class="text_overflow1" style="width:190px">擅长：<Tag v-for="(item,index) in personInfo.goodField" :key="index">
                                            {{item}}
                                        </Tag></p>
                                    </dt>
                                </dl>
                            </Diamond>
                        </Col>
                        <Col span="8">
                            <Diamond :style="{height:'105px'}">
                                <div :style="{display:'inline'}" slot="tit">所属诊所</div>
                                <dl slot="con" class="picTxt">
                                    <dt v-for="(item,index) in clinicInfo.clinicLogo" :key="index">
                                        <Avatar :src="item.url" shape="square" :style="{width:'50px',height:'50px'}" />
                                    </dt>
                                    <dt>
                                        <h2>{{ clinicInfo.name }}</h2>
                                        <p class="text_overflow1" style="width:190px">主要业务：<Tag v-for="(item,index) in clinicInfo.goodField" :key="index">{{ item }}</Tag></p>
                                        
                                    </dt>
                                </dl>
                            </Diamond>
                        </Col>
                        <Col span="8">
                            <Diamond>
                                <div :style="{display:'inline'}" slot="tit">治疗案例</div>
                                <p slot="con" style="text-align:center">
                                    <span style="font-size:35px;margin-right:10px">{{ anaComplete }}</span>例
                                </p>
                            </Diamond>
                        </Col>
                    </Row>
                    <!-- 订单信息 -->
                    <!-- <Row :style="{'margin-top':'5px'}">
                        <Col :style="{'margin-bottom':'5px'}">
                            <Diamond class="dia-item" :style="{background:'#202133'}">
                                <div :style="{display:'inline',color:'#fff'}" slot="tit">相关病历</div>
                                <div slot="con">
                                    <Row>
                                        <Col span="5">
                                            <div class="order-item active">
                                                <div class="num">30</div>
                                                <div>全部病历</div>
                                            </div>
                                        </Col>
                                        <Col span="5" offset='1'>
                                            <div class="order-item">
                                                <div class="num">30</div>
                                                <div>待开药方</div>
                                            </div>
                                        </Col>
                                        <Col span="5" offset='1'>
                                            <div class="order-item">
                                                <div class="num">30</div>
                                                <div>待取药方</div>
                                            </div>
                                        </Col>
                                        <Col span="5" offset='1'>
                                            <div class="order-item">
                                                <div class="num">30</div>
                                                <div>完成治疗</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Diamond>
                        </Col>
                        <Col>
                            <Diamond style="height:auto;">
                                <span slot="tit">张国强</span>
                                <div slot="con">
                                    <Row>
                                        <Col span="4">主治大夫：康大夫</Col>
                                        <Col span="4">病症：牛皮癣</Col>
                                        <Col span="4">药方：一杆秤大药房</Col>
                                        <Col span="4">药方：祖传秘方</Col>
                                        <Col span="4">编号：101201808071621</Col>
                                    </Row>
                                </div>
                            </Diamond>
                            <Diamond style="height:auto">
                                <span slot="tit">张国强</span>
                                <div slot="con">
                                    <Row>
                                        <Col span="4">主治大夫：康大夫</Col>
                                        <Col span="4">病症：牛皮癣</Col>
                                        <Col span="4">药方：一杆秤大药房</Col>
                                        <Col span="4">药方：祖传秘方</Col>
                                        <Col span="4">编号：101201808071621</Col>
                                    </Row>
                                </div>
                            </Diamond>
                        </Col>
                    </Row> -->
                    <!-- 订单信息 -->
                    <Row :style="{'margin-top':'5px'}">
                        <Col :style="{'margin-bottom':'5px'}">
                            <Diamond class="dia-item" :style="{background:'#202133'}">
                                <div :style="{display:'inline',color:'#fff'}" slot="tit">病历信息</div>
                                <div slot="con">
                                    <Row>
                                        <Col span="5">
                                            <div class="order-item" :class="{active:1 == isActive}" @click="allOrders(1)">
                                                <div class="num">{{ allOrderNum }}</div>
                                                <div>全部病历</div>
                                            </div>
                                        </Col>
                                        <Col span="5" offset="1">
                                            <div class="order-item" :class="{active:2 == isActive}" @click="allOrders(2)">
                                                <div class="num" v-text="waitAna"></div>
                                                <div>待开药方</div>
                                            </div>
                                        </Col>
                                        <Col span="5" offset="1">
                                            <div class="order-item" :class="{active:3 == isActive}" @click="allOrders(3)">
                                                <div class="num" v-text="waitGetAna"></div>
                                                <div>待取药方</div>
                                            </div>
                                        </Col>
                                        <Col span="5" offset="1">
                                            <div class="order-item" :class="{active:4 == isActive}" @click="allOrders(4)">
                                                <div class="num" v-text="anaComplete"></div>
                                                <div>完成治疗</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Diamond>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <anaOrderList :orderIdList="orderIdList" :orderStatus="orderStatus" :page="page" ></anaOrderList>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    </Layout>

</template>
<script>
    import Diamond from '@/components/diamond'
    import anaOrderList from '@/views/anaOrderList'

    import axios from 'axios'

    export default {
        data(){
            return{
                anaInfo:{},
                personInfo:{},
                clinicInfo:{},
                allOrderNum:0,
                isActive:1,
                waitAna:0,
                waitGetAna:0,
                anaComplete:0,
                orderStatus:'all',
                page:1,
                orderIdList:[],
            }
        },
        mounted(){
            this.getPersonInfo();
        },
        methods:{
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
            },
            getPersonInfo(){
                // 获取药方信息
                var id = this.$route.query.id;
                axios.get('/anagraphs/getAnaDetail',{
                    params:{
                        id:id
                    }
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        this.anaInfo = res.result;
                        this.getAnaPerson(this.anaInfo.holderId);
                        this.getAnaOrdersNum();
                    }
                });
            },
            // 获取药方所有者的信息
            getAnaPerson(hid){
                console.log(hid);
                axios.get('/users/specifyPersonInfo',{
                    params:{
                        id:hid
                    }
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        this.personInfo = res.result;
                        console.log('hahahahah:' + this.personInfo.userLogo[0].url);
                        var underClinicId = res.result.underClinic;
                        axios.get('/clinics/specificClinicInfo',{
                            params:{
                                clinicId:underClinicId
                            }
                        }).then((response2)=>{
                            var res2 = response2.data;
                            if(res2.status == '0'){
                                this.clinicInfo = res2.result;
                            }
                        });
                    }
                });
            },
            getAnaOrdersNum(){
                // 获取所有该药方的病历(订单)ID
                var id = this.$route.query.id;  //药方ID
                axios.get('ogrelations/getAnaOrdersNum',{
                    params:{
                        _id:id
                    }
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        var doc = res.result;

                        var anaOrderIdList = [];
                        for(var i=0; i<doc.length; i++){
                            anaOrderIdList.push(doc[i].orderId);
                            console.log(doc[i].orderId);
                        }
                        this.orderIdList = anaOrderIdList;

                        // 获取所有该药方的病历(订单)数量
                        axios.get('/orders/getSpecOrdersNum', {
                            params:{
                                anaOrderIdList:anaOrderIdList
                            }
                        }).then((response2)=>{
                            var res2 = response2.data;
                            if(res2.status == '0'){
                                var result = res2.result;
                                console.log("result");
                                console.log(result);
                                
                                this.allOrderNum = result.length;
                                for(var item in result){
                                    if(result[item].orderStatus == '0'){
                                        // 表示待开药方
                                        this.waitAna++
                                    }else if(result[item].orderStatus == '1'){
                                        // 表示待取药方
                                        this.waitGetAna++
                                    }else if(result[item].orderStatus == '2'){
                                        // 表示订单完成
                                        this.anaComplete++
                                    }
                                }
                            }
                        });

                    }
                })
            },
        },
        components:{
            Diamond,
            anaOrderList
        }
    }
</script>
