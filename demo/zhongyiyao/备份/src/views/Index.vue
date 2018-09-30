<style scoped>
    .content-item .ivu-col-span-4{height:200px;border-radius:10px;border:1px solid #ccc;text-align:center;cursor:pointer;margin-bottom:20px;}
    .content-item .ivu-col-span-4 .img{width:120px;height:120px;margin:0 auto;line-height:120px;padding:30px 0 0 0;}
    .content-item .ivu-col-span-4 span{display:block;margin-top:35px;}
</style>
<template>
    <Layout>
        <div class="path" :style="{'background-color':'#fff',padding:'0 16px 0','border-bottom':'1px solid #eee'}">
            <Breadcrumb :style="{margin: '16px 0',height:'32px','line-height':'22px'}">
                <BreadcrumbItem>
                    <div class="fl">
                        <Icon type="ios-home-outline" size="24" />
                        <span >中医药管控平台</span>
                    </div>
                    <Search class="fr"></Search>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div style="height:auto;padding:6px 10px 10px" >
            <Row class="content-item" type="flex">
                <Col span="4" :xs="22" :sm="11" :md="7" :lg="4" @click.native="toCliDetail" style="margin-right:10px">
                    <div class="img">
                        <img :style="{'margin-top':'20px'}" src="static/menzhen.png" alt="">
                    </div>
                    <span>诊所详情</span>
                </Col>
                <Col span="4" :xs="22" :sm="11" :md="7" :lg="4" @click.native="toCliDoctor">
                    <div class="img">
                        <img src="static/yisheng.png" alt="">
                    </div>
                    <span>坐诊大夫</span>
                </Col>
                <!-- <Col span="4" :xs="22" :sm="11" :md="7" :lg="4">
                    <div class="img">
                        <img src="static/wenjianjia.png" alt="">
                    </div>
                    <span>病人订单</span>
                </Col>
                <Col span="4" :xs="22" :sm="11" :md="7" :lg="4">
                    <div class="img">
                        <img :style="{'margin-top':'20px'}" src="static/jiaonang.png" alt="">
                    </div>
                    <span>药方</span>
                </Col>
                <Col span="4" :xs="22" :sm="11" :md="7" :lg="4">
                    <div class="img">
                        <img src="static/tingzhenqi.png" alt="">
                    </div>
                    <span>药方录入</span>
                </Col> -->
            </Row>
        </div>
    </Layout>
</template>
<script>

    import Search from '@/components/Search'

    export default {
        data(){
            return{
                msg:'vue'
            }
        },
        methods:{
            toCliDetail(){
                this.$router.push('/platform/clinicDetail');
            },
            toCliDoctor(){
                this.$router.push('/platform/clinicDoctor');
            }
        },
        components:{
            Search
        }
    }
</script>
