$(function(){
	// 导航栏 start
	var sub = $('header .nav>ul.navitems li.active').index();
	$('header .nav>ul.navitems>li').bind('mouseover',function(){
		// 红色背景追随鼠标
		$('header .nav>ul.navitems>li').removeClass('active');
		$(this).addClass('active');
	}).bind('mouseleave',{msg:sub},function(event){
		// 鼠标离开背景还原
		$('header .nav>ul.navitems>li').removeClass('active');
		
		$('header .nav>ul.navitems>li').eq(event.data.msg).addClass('active');
	}).has('ul').bind({
		mouseover: show,
		mouseleave: hidden
	});
	// 导航栏 end
	
	//返回顶部start
	var backTop = $('.back_to_top');
	backTop.bind('click',function(event) {
		$('html,body').animate({'scrollTop': 0});
	});
	$(window).scroll(function(){
		if($('html,body').scrollTop() >= 300){
			backTop.fadeIn();
		}else{
			backTop.fadeOut();
		}
	});
	//返回顶部end


	

});

// 显示二级菜单
function show(){
	$(this).find('ul').css({
		display: 'block'
	});
	$('header .nav .nav_bg').css({
		display: 'block'
	});
}

// 隐藏二级菜单
function hidden(){
	$(this).find('ul').css({
		display: 'none'
	});
	$('header .nav .nav_bg').css({
		display: 'none'
	});
}
