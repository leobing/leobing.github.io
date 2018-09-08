<template>
	<div>
		<Diamond v-for="(item, index) in AnaList" style="height:auto;box-shadow:0px 2px 2px #ddd;" :key="index">
            <span slot="tit">
                {{ item.name }}
                <router-link :to="'/platform/anagraphDetail?id=' + item._id" :style="{float:'right','padding-right':'10px',color:'#40b542'}">查看更多 >></router-link>
            </span>
            <div slot="con"  style="margin-top:20px;">
                <Row>
                    <Col class="v-line" span="3" :style="{'text-align':'left'}">持有大夫：{{ item.holderName }}</Col>
                    <Col class="v-line text_overflow1" span="3">主治病症：{{ item.major }}</Col>
                    <Col class="v-line text_overflow1" span="4">持有诊所：一杆秤大药房</Col>
                    <Col class="v-line text_overflow1" span="3">主要成分：{{ item.element }}</Col>
                    <Col class="v-line text_overflow1" span="4">编号：{{ item.number }}</Col>
                    <Col class="v-line text_overflow1" span="4">注意事项：{{ item.desc }}</Col>
                    <Col class="v-line last text_overflow1" span="3">状态：{{ item.status == 1 ? '待审核' : (item.status == 2 ? '审核通过' : '审核未通过') }}</Col>
                </Row>
            </div>
        </Diamond>
	    <Page style="text-align:center;margin-top:20px;" show-total :total="dataNum" :current="pageNum" :page-size="pageSize" @on-change="changePageNumber" />
	</div>
</template>

<script>
    import Diamond from '@/components/diamond'
    import axios from 'axios'

	export default{
		props:[
			'anaStatus',
			'page',
			'clinicAna',
		],
		data(){
			return {
				AnaList:[],
				pageSize:4,
				pageNum:1,   //页码
				dataNum:0,
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				// 1、获取诊所下边所属医生的ID。
                axios.get('/clinics/getClinicUnderDocId').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        this.doctorIdList = res.result;

						var param = {
							page:this.pageNum,
							pageSize:this.pageSize,
							anaStatus:this.anaStatus,
							clinicAna:this.clinicAna,  //只返回登陆诊所药方信息
							doctorIdList:this.doctorIdList,
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
                    }
                });
            },
            // 改变页码
            changePageNumber(Num){
            	this.pageNum = Num;
            	this.init();
            }
		},
		watch:{
			orderList(){
				var val = this.orderList.length;
				this.$emit('getall', val);
			},
			anaStatus(){
				// console.log(this.anaStatus);
				this.pageNum = this.page;
				this.init();
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
		components:{
			Diamond
		}
	}
</script>

<style>
	.text_overflow1{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
</style>