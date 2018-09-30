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
    .info>div{margin-bottom:3px;}
    .imgItem{overflow: hidden;}
    .imgItem>li{width:112px;height:112px;background-color:#ccc;list-style: none;float: left;margin-left:5px;margin-bottom: 5px;}
</style>
<template>
    <Layout>
        <div class="path" :style="{'background-color':'#fff',padding:'0 16px 0','border-bottom':'1px solid #eee'}">
            <Breadcrumb :style="{margin: '16px 0',height:'32px','line-height':'22px'}">
                <BreadcrumbItem>
                    <div class="fl">
                        <Icon type="ios-home-outline" size="24" />
                        <span >病历/病历详情</span>
                    </div>
                    <Input class="fr" search enter-button="Search" placeholder="Enter something..." />
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div style="height:auto;padding:6px 10px 10px" >
            <Row type="flex" justify="space-between">
                <!-- 左边 -->
                <Col span="5" >
                    <Card :bordered="false" :style="{position:'relative'}">
                        <h2 style="text-align:center;margin-bottom:20px">{{ orderDetail.name }}</h2>
                        <!-- <Button type="default" shape="circle" :style="{position:'absolute',top:'10px',right:'10px',padding:'5px 20px'}">
                            编辑
                        </Button> -->
                        <div>
                            <Row>
                                <Col :md="12" :sm="10" style="height:140px;padding:5px;float:left">
                                    <img :src="orderDetail.sickImg" style="width:100%;border-radius:5px;">
                                </Col>
                                <Col class="info" :md="10" :sm="14" :style="{float:'left',margin:'5px 0 0 10px'}">
                                    <div>
                                        姓名：<span>{{ orderDetail.name }}</span>
                                    </div>
                                    <div>
                                        性别：<span>{{ orderDetail.sex }}</span>
                                    </div>
                                    <div>
                                        年龄：<span>{{ orderDetail.age }}</span>
                                    </div>
                                    <div>
                                        <!-- 费别：<span>{{ orderDetail.name }}</span> -->
                                    </div>
                                    <div>
                                        科别：<span>{{ orderDetail.illness[0] }}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Tag color="success">编号</Tag>
                            <span>{{ orderDetail.orderId }}</span>
                        </div>
                        <div>
                            <Tag color="success">病症</Tag>
                            <span v-for="item in orderDetail.illness">
                                {{ item }}
                            </span>
                        </div>
                        <div>
                            <!-- <Tag color="success">病症特征</Tag> -->
                            <span>
                                <!-- {{ formValidate.underClinic }} -->
                            </span>
                        </div>
                        <div>
                            <Tag color="success">所用药方</Tag>
                            <span v-for="item in orderDetail.anagraphList">
                                {{ item.name }}
                            </span>
                        </div>
                        <Divider />
                        
                    </Card>
                </Col>
                <!-- 右边 -->
                <Col span="19">
                    <Row>
                        <Col span="8">
                            <Diamond>
                                <div :style="{display:'inline'}" slot="tit">主治大夫</div>
                                <dl slot="con" class="picTxt">
                                    <dt v-for="item in personInfo.userLogo">
                                        <Avatar :src="item.url" shape="square" :style="{width:'50px',height:'50px'}" />
                                    </dt>
                                    <dt>
                                        <h2>{{ personInfo.userName }}</h2>
                                        <p>擅长：<Tag v-for="(item,index) in personInfo.goodField" :key="index">{{ item }}</Tag></p>
                                    </dt>
                                </dl>
                            </Diamond>
                        </Col>
                        <Col span="8">
                            <Diamond :style="{height:'105px'}">
                                <div :style="{display:'inline'}" slot="tit">所在药房</div>
                                <dl slot="con" class="picTxt">
                                    <dt v-for="item in clinicInfo.clinicLogo">
                                        <Avatar :src="item.url" shape="square" :style="{width:'50px',height:'50px'}" />
                                    </dt>
                                    <dt>
                                        <h2>{{ clinicInfo.name }}</h2>
                                        <p>主要业务：<Tag v-for="(item,index) in clinicInfo.goodField" :key="index">{{ item }}</Tag></p>
                                    </dt>
                                </dl>
                            </Diamond>
                        </Col>
                        <Col span="8">
                            <Diamond>
                                <div :style="{display:'inline'}" slot="tit">治疗疗程</div>
                                <p slot="con" style="text-align:center">
                                    <span style="font-size:35px;margin-right:10px">3</span>疗程
                                </p>
                            </Diamond>
                        </Col>
                    </Row>
                    <!-- 订单信息 -->
                    <Row :style="{'margin-top':'5px'}">
                        <Col :style="{'margin-bottom':'5px',padding:'5px 20px'}">
                            <!-- <Diamond class="dia-item" :style="{background:'#202133'}">
                                <div :style="{display:'inline',color:'#fff'}" slot="tit">病历档案</div>
                                <div slot="con">
                                    <Row>
                                        <Col span="5">
                                            <div class="order-item active">
                                                <div class="num">30</div>
                                                <div>录入病历</div>
                                            </div>
                                        </Col>
                                        <Col span="5" offset='1'>
                                            <div class="order-item">
                                                <div class="num">30</div>
                                                <div>已开药方</div>
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
                            </Diamond> -->
                            <div>
                                <h2 style="margin:5px 0;">详情描述</h2>
                                <p>{{ orderDetail.description }}</p>
                            </div>
                        <Divider />
                            
                            <div style="margin-top:10px;">
                                <h2>检测报告</h2>
                                <ul class="imgItem">
                                    <li v-for="item in orderDetail.report">
                                        <img :src="item" alt="">
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <!-- <Col>
                            <Diamond style="height:auto;box-shadow:0px 2px 2px #ddd;">
                                <span slot="tit">
                                    张国强
                                    <router-link to="/ha" :style="{float:'right','padding-right':'10px',color:'#40b542'}">查看更多 >></router-link>
                                </span>
                                <div slot="con"  style="margin-top:20px;">
                                    <Row>
                                        <Col class="v-line" span="5" :style="{'text-align':'left'}">主治大夫：康大夫</Col>
                                        <Col class="v-line" span="5">病症：牛皮癣</Col>
                                        <Col class="v-line" span="5">药房：一杆秤大药房</Col>
                                        <Col class="v-line" span="5">药方：祖传秘方</Col>
                                        <Col class="v-line" span="4">编号：101201808071621</Col>
                                    </Row>
                                </div>
                            </Diamond>
                            <Diamond style="height:auto;box-shadow:0px 2px 2px #ddd;">
                                <span slot="tit">
                                    张国强
                                    <router-link to="/ha" :style="{float:'right','padding-right':'10px',color:'#40b542'}">查看更多 >></router-link>
                                </span>
                                <div slot="con"  style="margin-top:20px;">
                                    <Row>
                                        <Col class="v-line" span="5" :style="{'text-align':'left'}">主治大夫：康大夫</Col>
                                        <Col class="v-line" span="5">病症：牛皮癣</Col>
                                        <Col class="v-line" span="5">药房：一杆秤大药房</Col>
                                        <Col class="v-line" span="5">药方：祖传秘方</Col>
                                        <Col class="v-line" span="4">编号：101201808071621</Col>
                                    </Row>
                                </div>
                            </Diamond>
                        </Col> -->
                    </Row>
                </Col>
            </Row>
        </div>

    </Layout>

</template>
<script>
    import Diamond from '@/components/diamond'

    import axios from 'axios'

    export default {
        data(){
            return{
                drugName:'',
                orderDetail:'',
                personInfo:{},
                clinicInfo:{},
            }
        },
        mounted(){
            this.getOrderInfo();
        },
        methods:{
            
            getOrderInfo(){
                var id = this.$route.query.id;
                // 获取订单信息
                axios.get('/orders/getAppointOrders',{
                    params:{
                        id:id
                    }
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        this.orderDetail = res.result;
                        this.getDoctor(this.orderDetail.buyerId);                      
                    }
                });
            },
            // 获取主治大夫的信息
            getDoctor(bid){
                // console.log(bid);
                axios.get('/users/specifyPersonInfo',{
                    params:{
                        id:bid
                    }
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        this.personInfo = res.result;
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
            }
            
        },
        components:{
            Diamond
        }
    }
</script>
