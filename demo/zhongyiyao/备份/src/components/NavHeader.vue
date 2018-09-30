<template>
	<Header :style="{position:'fixed',top:'0',width:'100%','z-index':999,background: '#232f3f'}">
        <div>
            <div style="text-align:center;width:auto" @click="clickLogo" :style="{color:'#fff',cursor:'pointer'}">
                    <img src="static/logo.png" style="margin-top:7px;float:left;height:50px;">
                    <h2 style="float:left;padding-left:30px;">中医药管控平台</h2>
            </div>
        </div>

        <Dropdown trigger="click" class="dropdown-top" :style="{float:'right'}">
            <a href="javascript:void(0)">
                <Avatar :src="userIcon" size="large" />
                {{ userName }}
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem @click.native="personalPage">
                    <div>
                        个人主页
                    </div>
                </DropdownItem>
                <DropdownItem divided @click.native="logout">
                        退出
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <!-- 系统消息 -->
        <Badge :count="0"  overflow-count="999" :offset="[13,-10]" :style="{'margin-right':'50px',float:'right'}">
            <Icon type="ios-notifications-outline" size="26" color="white"></Icon>
        </Badge>
        <!-- <a href="javascript:;" class="logout" @click="logout">退出</a> -->
    </Header>
</template>

<style scoped>
    .logout{float: right;margin-right:15px;font-size:14px;color:#fff;}
    .dropdown-top a{
      color:#fff;
    }
</style>

<script>
    import axios from 'axios';

	export default{
		data(){
			return{
				type:""
			}
		},
        computed:{
            // ...mapState(['userName'])
            userName(){
                return this.$store.state.userName;
            },
            userIcon(){
                return this.$store.state.userIcon;
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                // 登录检测-医生
                axios.get('/users/loginChecked').then((response)=>{
                    var res = response.data;
                        // console.log(res);
                    if(res.status == '0'){
                        this.$store.commit('updateUserInfo', res.result.userName);
                        this.$store.commit('updateUserIcon', res.result.userLogo[0].url);
                        // 登录用户类型为医生
                        this.type = '1';
                    }else{
                        // 登录检测-诊所
                        axios.get('/clinics/loginChecked').then((response2)=>{
                            var resCli = response2.data;
                            if(resCli.status == '0'){
                                this.$store.commit('updateUserInfo', resCli.result.name);
                                if(resCli.result.clinicLogo[0]){
                                    this.$store.commit('updateUserIcon', resCli.result.clinicLogo[0].url);
                                }
                                // 登录用户类型为诊所
                                this.type = '2';
                            }else{
                                this.$router.push('/');
                            }
                        });
                    }
                    console.log(this.userIcon);
                });
            },
            logout(){
                axios.get('/users/logout').then((response)=>{
                    var res = response.data;
                    if(res.status == '0'){
                        // 登出成功
                        // console.log(res);
                        this.init();
                    }
                });
            },
            personalPage(){
                if(this.type == '1'){
                    this.$router.push({name:'personalPage'});
                }else if(this.type == '2'){
                    this.$router.push({name:'clinicDetail'});
                    // this.$router.push({name:'platform'});
                }
            },
            clickLogo(){
                console.log(this.type);
                if(this.type == '1'){
                    this.$router.push({name:'personalPage'});
                }else if(this.type == '2'){
                    // this.$router.push({name:'clinicDetail'});
                    this.$router.push({name:'index'});
                }
            }
        }
	}
</script>