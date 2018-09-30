<style>
    .text_overflow1{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
</style>
<template>
	<div>
		<Diamond v-for="(item,index) in orderList" :key="index" style="height:auto;box-shadow:0px 2px 2px #ddd;">
	        <span slot="tit">
	            {{ item.name }}
	            <router-link :to="'/platform/caseDetail?id=' + item._id" :style="{float:'right','padding-right':'10px',color:'#40b542'}">查看更多 >></router-link>
	        </span>
	        <div slot="con"  style="margin-top:20px;">
	            <Row>
	                <Col class="v-line text_overflow1" span="3" :style="{'text-align':'left'}">主治大夫：{{ item.buyerName }}</Col>
	                <Col class="v-line text_overflow1" span="3">病症：{{ item.illness.slice(-1).toString() }}</Col>
	                <Col class="v-line text_overflow1" span="4">诊所：一杆秤大药房</Col>
	                <Col class="v-line text_overflow1" span="3">
	                    药方：<span v-for="(itemAna, index) in item.anagraphList">{{ itemAna.name }}</span>
	                </Col>
	                <Col class="v-line text_overflow1" span="4">编号：{{ item.orderId }}</Col>
	                <Col class="v-line text_overflow1" span="4">备注：{{ item.description }}</Col>
	                <Col class="v-line text_overflow1 last" span="3">状态：{{ item.orderStatus == 0 ? '待开药方' : (item.orderStatus == 1 ? '待取药方' : '完成治疗') }}</Col>
	            </Row>
	        </div>
	    </Diamond>
	    <Page style="text-align:center;margin-top:20px;" show-total :total="dataNum" :page-size="pageSize" @on-change="changePageNumber" />
	</div>
</template>

<script>
    import Diamond from '@/components/diamond'
    import axios from 'axios'

	export default{
		props:[
			'dataNum'
		],
		data(){
			return {
				orderList:[],
				page:1,  //页码
				pageSize:4,

			}
		},
		mounted(){
			this.init();
			// console.log(this.dataNum);
		},
		methods:{
			init(){
				var param = {
					page:this.page,
					pageSize:this.pageSize,
					// sort:this.sortFlag ? 1 : -1
				}
                // 获取其他病历(订单——卖家)信息
                axios.get('/orders/getSellerOrders', {
                	params:param
                }).then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        this.orderList = res.result.list;
                        
                    }
                })
            },
            // 改变页码
            changePageNumber(pageNum){
            	this.page = pageNum;
            	this.init();
            }
		},
		watch:{
			orderList(){
				var val = this.orderList.length;
				this.$emit('getall', val);
			}
		},
		components:{
			Diamond
		}
	}
</script>