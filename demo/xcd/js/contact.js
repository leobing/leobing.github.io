$(function(){
	//用其他方法写
  $('.tab_item .icon_t').click(function(event) {
  	var currnt_c = $(this).parents('.tab_item').find('.tab_c');

  	if(currnt_c.hasClass('show')){
  		currnt_c.removeClass('show');
  		$(this).find('.icon_g').removeClass('hide');
  		$(this).removeClass('arrow');
  	}else{
  		$(this).find('.icon_g').addClass('hide');
  		$(this).addClass('arrow');
	  	currnt_c.addClass('show');
  	}

  });
})