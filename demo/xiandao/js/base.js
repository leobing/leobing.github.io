
$(function(){


})


function backTop(val){
  $("html,body").animate({scrollTop:val + "px"},666);
}

//阻止浏览器的默认行为 
function stopDefault( e ) { 
    //阻止默认浏览器动作(W3C) 
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    //IE中阻止函数器默认动作的方式 
    else 
        window.event.returnValue = false; 
    return false; 
}



	    
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