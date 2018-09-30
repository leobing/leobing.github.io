<style>
	.text_overflow3{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
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
                        <span >坐诊大夫</span>
                    </div>
                    <Search class="fr"></Search>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div style="height:auto;padding:6px 10px 10px" >
            <Row type="flex">
            	<Col v-for="(item,index) in doctorList" :key="index" style="width:32%;margin-bottom:10px;margin-right:1%;">
            		<Card style="width:100%">
						<dl style="overflow:hidden;">
							<dt v-for="imgitem in item.userLogo" style="width:33%;max-width:'190px';height:240px;float:left;margin-right:10px;overflow:hidden;">
								<img style="width:100%;max-height:240px;" :src="imgitem.url" alt="">
							</dt>
							<dd style="width:62%;float:right;">
								<div class="tit">
									<h2 style="font-size:16px;display:inline-block;">{{ item.userName }}</h2>
									<Tag style="float:right;border-radius:10px;" color="success">{{ clinicName }}</Tag>
								</div>
								<Rate v-model="item.score" />{{item.score}}
								<p class="text_overflow3" style="font-size:12px;color:#5e5e5e;margin-top:10px;">{{ item.intro }}</p>
								<p style="width:100%;padding:20px;background:#eee;border-radius:5px;margin-top:15px;">
									<span>擅长病症：</span>
									<span v-for="goodItem in item.goodField" style="margin-right:4px;">{{goodItem}}</span>
								</p>
							</dd>
						</dl>
            		</Card>
            	</Col>
            </Row>
        </div>
    </Layout>
</template>

<script>
	import axios from 'axios'
	import Search from '@/components/Search'

	export default{
		data(){
			return {
				value:0,
				doctorList:[],
				clinicName:'',
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				// 获取诊所的医生列表
				axios.get('/clinics/clinicInfo').then((response)=>{
					var res = response.data;
					if(res.status == '0'){
						this.clinicName = res.result.name;
						let doctorIdArr = res.result.doctorList; //医生列表
		                // console.log(res.result);
						// 获取医生信息
		                axios.get('/users/specifyManyPersonInfo',{
		                    params:{
		                        idArr:doctorIdArr //医生Id
		                    }
		                }).then((responseCli)=>{
		                    var resCli = responseCli.data;
		                    if(resCli.status == '0'){
								this.doctorList = resCli.result;
		                    }
		                });
					}
				});
			},
			getClinicName(doctorId){

			}
		},
		components:{
			Search
		}
	}
</script>