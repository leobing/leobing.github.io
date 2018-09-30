<template>
    <Modal v-model="model" @on-ok="okDoc" @on-cancel="cancel" fullscreen title="医生列表">
    	<div style="height:auto;padding:6px 10px 10px" >
            <Row type="flex">
                <CheckboxGroup v-model="fruit">
                    <Col v-for="(item,index) in doctorList" :key="index" style="width:32%;margin-bottom:10px;display:inline-block;margin-right:1%">
                        <Card style="width:100%;position:relative;">
                            <dl style="overflow:hidden;">
                                <dt v-for="imgitem in item.userLogo" style="width:33%;max-width:'190px';height:240px;float:left;margin-right:10px;overflow:hidden;">
                                    <img style="width:100%;max-height:240px;" :src="imgitem.url" alt="">
                                </dt>
                                <dd style="width:62%;float:right;">
                                    <div class="tit">
                                        <h2 style="font-size:16px;display:inline-block;">{{ item.userName }}</h2>
                                        <Tag style="float:right;border-radius:10px;" color="success">一杆秤大药房</Tag>
                                    </div>
                                    <Rate v-model="item.score" />{{item.score}}
                                    <p class="text_overflow3" style="font-size:12px;color:#5e5e5e;margin-top:10px;">{{ item.intro }}</p>
                                    <p style="width:100%;padding:20px;background:#eee;border-radius:5px;margin-top:15px;">
                                        <span>擅长病症：</span>
                                        <span v-for="goodItem in item.goodField" style="margin-right:4px;">{{goodItem}}</span>
                                    </p>
                                </dd>
                            </dl>
                            <!-- 选框 -->
                            <Checkbox style="position:absolute;bottom:10px;right:10px;" :label="index" :style="{color:'transparent'}"></Checkbox>
                        </Card>
                    </Col>
                </CheckboxGroup>
            </Row>
            <!-- {{ fruit }} -->
        </div>
    </Modal>
</template>

<script>
	import axios from 'axios'
	import Diamond from '@/components/diamond'

	export default{
        props:[
            'modalChoiceDoc'
        ],
		data(){
			return{
				doctorList:[],
                fruit:[],
                model:false
			}
		},
        watch:{
            modalChoiceDoc: function(v){
                return this.model=v;
            }
        },
		mounted(){
            this.init();
		},
		methods:{
            init(){
                axios.get('/users/allPersonInfo').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        // console.log(res.result);
                        this.doctorList = res.result;
                    }
                });
            },
            okDoc(){
                this.$emit('close');
                var temp = [];
                this.fruit.forEach((e)=>{  
                   // console.log(e);
                   temp.push(this.doctorList[e]);
                });
                this.$emit('selectData',temp);
            },
            cancel(){
                this.$emit('close');
            },

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