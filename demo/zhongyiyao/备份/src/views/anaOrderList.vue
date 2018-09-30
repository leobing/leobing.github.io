<template>
	<div>
		<Diamond v-for="(item,index) in orderList" :key="index" style="height:auto;box-shadow:0px 2px 2px #ddd;">
            <span slot="tit">
                {{ item.name }}
                <router-link :to="'/platform/caseDetail?id=' + item._id" :style="{float:'right','padding-right':'10px',color:'#40b542'}">查看更多 >></router-link>
            </span>
            <div slot="con"  style="margin-top:20px;">
                <Row>
                    <Col class="v-line" span="3" :style="{'text-align':'left'}">主治大夫：{{ item.buyerName }}</Col>
                    <Col class="v-line" span="3">病症：{{ item.illness.slice(-1).toString() }}</Col>
                    <Col class="v-line" span="4">诊所：一杆秤大药房</Col>
                    <Col class="v-line" span="3">
                        药方：<span v-for="(itemAna, index) in item.anagraphList" :key="index">{{ itemAna.name }}</span>
                    </Col>
                    <Col class="v-line" span="4">编号：{{ item.orderId }}</Col>
                    <Col class="v-line" span="4">备注：{{ item.description }}</Col>
                    <Col class="v-line last" span="3">状态：{{ item.orderStatus == 0 ? '待开药方' : (item.orderStatus == 1 ? '待取药方' : '完成治疗') }}</Col>
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
			// 'dataNum',
			'orderStatus',
			'page',
		],
		data(){
			return {
				orderList:[],
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

		                console.log(123);
		                console.log(anaOrderIdList);
						var param = {
							page:this.pageNum,
							pageSize:this.pageSize,
							orderStatus:this.orderStatus,
							anaOrderIdList:anaOrderIdList,
						}
		                // 获取其他病历(订单——卖家)信息
		                axios.get('/orders/getSpecOrdersData', {
		                	params:param
		                }).then((response)=>{
		                    var res = response.data;
		                    if(res.status == '0'){
		                        this.orderList = res.result.list;
		                        this.dataNum = res.result.count;
		                        // console.log(res.result.count);
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
			orderStatus(){
				// console.log(this.orderStatus);
				this.pageNum = this.page;
				this.init();
			},
		},
		components:{
			Diamond
		}
	}
</script>