$(function(){
	
	changeColor();
	$('.pagination').click(function(event) {
		changeColor();
	});
})

// 改变分页箭头颜色
function changeColor(){
	var value = $('.M-box .active');

	if(value.text() === '1'){
		$('.M-box a').first().css('color', '#d5cdcc');
	}
	if(value.text() === '6'){
		$('.M-box a').last().css('color', '#d5cdcc');
	}
}

