// 首页通知公告轮播
$(function(){
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
	//获得obj的属性值
	function getAttr(obj, attr){
	    if(obj.currentStyle){
	        return obj.currentStyle[attr];
	    } else {
	        return getComputedStyle(obj, false)[attr];
	    }
	}
});