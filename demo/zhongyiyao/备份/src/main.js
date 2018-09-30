// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(Router);
Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		userName:'',  //用户名
		userIcon:'' //用户图标
	},
	mutations:{
		updateUserInfo(state,userName){
			state.userName = userName;
		},
		updateUserIcon(state,userIcon){
			state.userIcon = userIcon;
		}
	}
});

router.beforeEach(function(to, from, next){
	
	console.log(to.name);
	const nextRoute = ['index','upload','platform'];

	// 如果跳转至nextRoute中的页面
	if(nextRoute.indexOf(to.name) >= 0){
		// 未登录,则跳至登录页
		if(!Cookies.get('_id')){
			console.log('hahahh ');
			router.push({name:'/'});
		}
	}
	// 如果在已登录的状态下，访问login，跳转至clinic
	// if(to.name == 'login'){
	// 	if(!!Cookies.get('_id')){
	// 		router.push({name:'platform'});
	// 	}
	// }

	next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
