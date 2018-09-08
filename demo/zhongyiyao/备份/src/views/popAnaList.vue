<style scoped>
    .ivu-checkbox+span, .ivu-checkbox-wrapper+span{display:none;}
</style>
<template>
    <Modal v-model="model" @on-ok="OK" @on-cancel="cancel" fullscreen title="药方列表" >
        <!-- 筛选条件 -->
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
                                <Select v-model="clinicName" style="width:200px">
                                    <Option v-for="item in clinicList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>
                </Diamond>
            </Col>
        </Row>
        <!-- 药方列表 -->
        <div style="height:auto;padding:6px 10px 10px" >
            <Row>
                <Col>
                    <CheckboxGroup v-model="fruit" label-width="10px">
                        <!-- <Diamond v-for="(item, index) in AnaList" style="height:auto;box-shadow:0px 0px 8px #ddd;" :key="index">
                            <span slot="tit">
                                {{ item.name }}
                                <router-link :to="'/platform/anagraphDetail?id=' + item._id" :style="{float:'right','padding-right':'10px',color:'#40b542'}">查看更多 >></router-link>
                            </span>
                            <div slot="con"  style="margin-top:20px;overflow:hidden;">
                                <Row>
                                    <Col class="v-line" span="4" :style="{'text-align':'left'}">持有大夫：{{ item.holderName }}</Col>
                                    <Col class="v-line" span="4">主治病症：{{ item.major }}</Col>
                                    <Col class="v-line" span="4">持有诊所：一杆秤大药房</Col>
                                    <Col class="v-line" span="4">主要成分：{{ item.element }}</Col>
                                    <Col class="v-line" span="4">编号：{{ item.number }}</Col>
                                    <Col class="v-line" span="4">注意事项：{{ item.desc }}</Col>
                                </Row>
                                <Checkbox style="float:right;" :label="index"></Checkbox>
                            </div>
                        </Diamond> -->

                        <Diamond v-for="(item, index) in AnaList" style="height:auto;box-shadow:0px 2px 2px #ddd;" :key="index">
                            <span slot="tit">
                                {{ item.name }}
                                <!-- <router-link :to="'/platform/anagraphDetail?id=' + item._id" :style="{float:'right','padding-right':'10px',color:'#40b542'}">查看更多 >></router-link> -->
                            </span>
                            <div slot="con"  style="margin-top:20px;overflow:hidden;">
                                <Row>
                                    <Col class="v-line" span="4" :style="{'text-align':'left'}">持有大夫：{{ item.holderName }}</Col>
                                    <Col class="v-line text_overflow1" span="4">主治病症：{{ item.major }}</Col>
                                    <Col class="v-line text_overflow1" span="4">持有诊所：一杆秤大药房</Col>
                                    <Col class="v-line text_overflow1" span="4">主要成分：{{ item.element }}</Col>
                                    <Col class="v-line text_overflow1" span="4">编号：{{ item.number }}</Col>
                                    <Col class="v-line text_overflow1" span="4">注意事项：{{ item.desc }}</Col>
                                </Row>
                                <Checkbox style="float:right;" :label="index" :style="{color:'transparent'}"></Checkbox>
                            </div>
                        </Diamond>
                        <Page style="text-align:center;margin-top:20px;" show-total :total="dataNum" :current="pageNum" :page-size="pageSize" @on-change="changePageNumber" />

                        {{ fruit }}
                    </CheckboxGroup>
                </Col>
            </Row>
        </div>
    </Modal>
</template>

<script>
    import axios from 'axios'
    import Diamond from '@/components/diamond'

    export default{
        props:[
            'modalChoiceAna'
        ],
        data(){
            return{
                model:false,
                AnaList:[],
                selAnaList:[],
                fruit:[],
                pageSize:4,
                pageNum:1,   //页码
                dataNum:0,
                anaStatus:2,
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
                doctorList: [
                    {
                        value: '王医生',
                        label: '王医生'
                    },
                    {
                        value: '宋医生',
                        label: '宋医生'
                    }
                ],
                doctorName: '',
                clinicList: [
                    {
                        value: '洛阳诊所',
                        label: '洛阳诊所'
                    },
                    {
                        value: '北京诊所',
                        label: '北京诊所'
                    }
                ],
                clinicName: '',
                page:1,
                date:[],   //日期筛选
                illness:[],   //病症筛选
                doctor:'',   //大夫筛选
            }
        },
        mounted(){
            this.init();
        },
        watch: {
            modalChoiceAna: function (v) {
              return this.model=v;
            },
            date(){
                this.init();
            },
            illness(){
                this.init();
            },
            doctor(){
                this.init();
            },
        },
        methods:{
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
            init(){
                var param = {
                    page:this.pageNum,
                    pageSize:this.pageSize,
                    anaStatus:this.anaStatus,
                    dateFilter:this.date,
                    illnessFilter:this.illness,
                    doctorFilter:this.doctor,
                }

                axios.get('/anagraphs/getAnaList', {
                    params:param
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        this.AnaList = res.result.list;
                        this.dataNum = res.result.count;
                        // console.log(this.AnaList);
                    }
                })
            },
            // 改变页码
            changePageNumber(Num){
                this.pageNum = Num;
                this.init();
            },
            OK(){
                this.$emit('close');
                var temp = [];
                this.fruit.forEach((e)=>{  
                   console.log(e);
                   temp.push(this.AnaList[e]);
                });
                this.$emit('selectData',temp);
            },
            cancel(){
                this.$emit('close');
            },
            checked(index){
                console.log(index);
            }

        },
        components:{
            Diamond,
        }
    }
</script>

<style>
    .text_overflow3{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
</style>