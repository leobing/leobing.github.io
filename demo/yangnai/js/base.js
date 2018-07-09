
$(function(){
	// 产品展厅-轮播
	var box = $('.myslide_con')[0];
	console.log(box);
	var speed = 1;
	var box_width = 1320;
	uniformSpeed(box, speed, box_width);

	// 在线留言-轮播
	var box_leave = $('.leave_word .list_wrap .list-group')[0];
	var speed_leave = 0.2;
	var box_width_leave = $(box_leave).height();
	uniformSpeed(box_leave, speed_leave, box_width_leave, 'top');
})








	    
// box——要移动的盒子
// speed——移动的速度
// box_width——原始盒子的宽度
// direction——移动方向，默认值为left
// hover_stop——鼠标移动到盒子上面是否停止滚动，默认为true停止，
function uniformSpeed(box, speed, box_width, direction, hover_stop){
	if(!direction){
		direction = 'left';
	}
	if(!hover_stop){
		hover_stop = true;
	}
	var box2 = $(box).html();
    var num = 0;
    var flag = true;
    
    // 复制一份内容
	$(box).append(box2);

    setTimeout(timer,10);

    $(box).mouseleave(function(event) {
		if(hover_stop){
			flag = true;
			setTimeout(timer,10);
		}
		
	});

    function timer(){

    	if(hover_stop){
    		// 鼠标移入box停止滚动
    		$(box).mouseenter(function() {
    			flag = false;
    			clearTimeout(timer);
    			// return;
    		});
    	};

        num += speed;
        if(num >= box_width){
            $(box).css(direction, '0');
            num = 0;
        }else{
            $(box).css(direction, -num);
        }
    	if(flag){
    		setTimeout(timer,10);
    	}
    }
}