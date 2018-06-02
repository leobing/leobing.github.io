$(function(){

	// 导航
	$(".tit").hover(function(){
		$(this).addClass("you").find(".ulbox").fadeIn();  
	},function(){
		$(this).removeClass("you").find(".ulbox").fadeOut();  
	})

	//主页-合作教授-切换
	var tab_a_expert = $('.expert_items .swiper-slide');
	var tab_con_expert = $('.expert .intro .intro_tab_con');
	tabSwitch(tab_a_expert,tab_con_expert);

	
	// 解决方案-切换
	var solutions = $('.solution_items section');
	for(var i=0; i<solutions.length; i++){
		$(solutions[i]).click(function(event) {
			$(solutions).removeClass('current');
			$(solutions).find('dl').removeClass('current');

			$(this).addClass('current');
			$(this).find('dl').addClass('current');
		});
	}


	//医疗案例-切换
	var tab_a = $('.case_tab_tit li');
	var tab_con_us = $('.case_tab_c .case_item');
	tabSwitch(tab_a,tab_con_us);

	//医疗动态-切换
	var tab_a_state = $('.state_tab_t li');
	var tab_con_state = $('.state_tab .state_tab_c');
	tabSwitch(tab_a_state,tab_con_state);

	//合作医院-切换
	var tab_a_hos = $('.hospital_tab_t li');
	var tab_con_hos = $('.hospital .case_con_left');
	tabSwitch(tab_a_hos,tab_con_hos);

	//新闻中心-切换
	var tab_a_news = $('.news .case_tab_tit li');
	var tab_con_news = $('.news_con .news_item');
	tabSwitch(tab_a_news,tab_con_news);

	//关于我们-核心团队-切换
	var tab_a_team = $('.about .team .tab_t li');
	var tab_con_team = $('.about .team .tab_con');
	tabSwitchOver(tab_a_team,tab_con_team);

	

})

// 弹框
function pop(txt){
	// layer.open({
	//   type: 1,
	//   title: '快速预约绿色通道',
	//   shadeClose: true,
	//   shade: false,
	//   area: ['893px', '600px'],
	//   content: ''
	// });

	layer.confirm(txt, {
		title:'快速预约·绿色通道',
	  btn: ['好的，知道了'] //按钮
	});

}


// 工具-tab-点击切换
function tabSwitch(tab_index, tab_con){
    //tab_index是切换索引
    //tab_con是切换内容
    for (var i = 0; i <= tab_index.length - 1; i++) {
        tab_index[i].index = i;
        $(tab_index[i]).bind('click',function(event){
            
            $(tab_con).css('display','none');
            $(tab_con[this.index]).css('display','block');
    
            $(tab_index).removeClass('current');
            $(this).addClass('current');
            // console.log(this.index);
        })
    }
}
// 工具-tab-鼠标悬浮切换
function tabSwitchOver(tab_index, tab_con){
    //tab_index是切换索引
    //tab_con是切换内容
    for (var i = 0; i <= tab_index.length - 1; i++) {
        tab_index[i].index = i;
        $(tab_index[i]).bind('mouseover',function(event){
            
            $(tab_con).css('display','none');
            $(tab_con[this.index]).css('display','block');
    
            $(tab_index).removeClass('current');
            $(this).addClass('current');
            // console.log(this.index);
        })
    }
}
// 能遍历对象和数组的通用forEach函数
function forEach(obj, fn){
	var key;
	if(obj instanceof Array){
		// 准确判断是不是数组
		obj.forEach(function(item, index){
			fn(index, item);
		});
	}else{
		//不是数组就是对象
		for(key in obj){
			if(obj.hasOwnProperty(key)){
				fn(key, obj[key]);
			}
		}
	}
}

