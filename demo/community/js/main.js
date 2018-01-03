$(function(){
	// 弹出二维码
	$('.extra a.wechat').hover(function() {
		// $('.extra .qr_code').css('display','block')
		$('.extra .qr_code').slideDown();
	}, function() {
		$('.extra .qr_code').slideUp();
	});

	// 回到顶部
	$('.extra a.gotop').click(function(){
		$('html,body').animate({"scrollTop":0},500);
	});

	// 窄屏情况下，导航栏切换	
	var flag = true;
	$('header .con .left .menu').click(function(event) {
		if(flag){
			$(this).find('i.open').css('display','none');
			$(this).find('i.close').fadeIn();
			$('header .con .left .nav').slideDown();
			flag = false; 
		}else{
			$(this).find('i.open').fadeIn();
			$(this).find('i.close').css('display','none');
			$('header .con .left .nav').slideUp();
			flag = true; 
		}
	});
	// 检测浏览器的宽度
	$(window).resize(function(event) {
		if(this.innerWidth > 768){
			$('header .con .left .nav').css('display','block');
		}else{
			$('header .con .left .nav').css('display','none');
		}
	});





});