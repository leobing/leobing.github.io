<template>
  <div id="app">
  	<div>
        <NavHeader></NavHeader>
		<Layout :style="{margin:'64px 0 0 0'}">          
            <Layout :style="{'margin-left':'150px'}">
				<Sider :style="{position: 'fixed',width:'150px','max-width':'150px','min-width':'150px', height: '100vh', left: 0, overflow: 'auto','background-color':'#2e3d50'}">
			        <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
			            <MenuItem name="1" @click.native="toClinicList">
			                <Icon type="md-document" />
			                <span>诊所</span>
			            </MenuItem>
			            <MenuItem name="2" @click.native="toDoctor">
		                    <Icon type="md-chatbubbles" />
		                    <span>大夫</span>
			            </MenuItem>
			            <MenuItem name="3" @click.native="toOrder">
		                    <Icon type="md-chatbubbles" />
		                    <span>病历</span>
			            </MenuItem>
			            <MenuItem name="4" @click.native="toAnagraph">
		                    <Icon type="md-chatbubbles" />
		                    <span>药方</span>
			            </MenuItem>
			            <MenuItem name="5">
		                    <Icon type="md-chatbubbles" />
		                    <span>设置</span>
			            </MenuItem>
			        </Menu>
			    </Sider>
				<Content :style="{padding: '0'}">
					<!-- 主内容 -->
		        	<router-view />
			    </Content>
			</Layout>
		</Layout>
	</div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'

export default {
	name: 'App',
	components:{
		NavHeader
	},
	methods:{
		toDoctor(){
			console.log(123);
			this.$router.push('/platform/doctor');
		},
		toClinicList(){
			console.log(444);
			this.$router.push('/platform/clinicList');
		},
		toOrder(){
			this.$router.push('/platform/caseHistory');
		},
		toAnagraph(){
			this.$router.push('/platform/anagraph');
		}
	}
}
</script>

<style>
	html,body{
		height: 100%;
		width: 100%;
	}
	.path{overflow:hidden;}
	.ivu-input-group{width:400px;}
	.fl{float: left;}
	.fr{float: right;}
	.menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
</style>
