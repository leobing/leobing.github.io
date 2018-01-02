$(function(){
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
	// 导航栏
	
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


	var uls = $('.notice .notice_con ul');
	//复制第一个li，并追加到ul的里面
	var cloneFirstli = $('.notice .notice_con ul li')[0].cloneNode(true);
	uls[0].appendChild(cloneFirstli);
	var lis = $('.notice .notice_con ul li');
	var step = 0;//滚动的步长
	var timer = null; //定时器

	timer =  setInterval(auto, 80);

	uls[0].onmouseover = function(){
		clearInterval(timer);
	}
	uls[0].onmouseout = function(){
		timer =  setInterval(auto, 80);
	}
		
	var lis_h = (lis.length-1) * lis[0].offsetHeight;
	
	function auto(){
		step++;
		uls[0].style['top'] = -step + 'px';
		if(step >= lis_h){
			step = 0;
		}
	}

});

//获得obj的属性值
function getAttr(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}


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
