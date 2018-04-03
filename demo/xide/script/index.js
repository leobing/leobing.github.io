/*
* @Author: Administrator
* @Date:   2018-04-03 15:51:29
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-03 16:02:34
*/
var mySwiper = new Swiper('.swiper-container', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay:{
		delay:3000,
		stopOnLastSlide:false,
		disableOnInteraction:false,
	}
});

$('.banner').hover(function() {
	if(mySwiper.autoplay.running){
		mySwiper.autoplay.stop();
	}
}, function() {
	if(mySwiper.autoplay.running == false){
		mySwiper.autoplay.start();
	}
});
