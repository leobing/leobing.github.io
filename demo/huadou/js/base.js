$(function(){

	$('.menu').click(function(event) {
		/* Act on the event */
		$('.pop').fadeIn('fast');
	});
	$('.close img').click(function(event) {
		/* Act on the event */
		$('.pop').fadeOut('fast');
	});

	//端详细情况表-切换
	var tab_a = $('.tab_t a');
	var tab_con_us = $('.tab_c');
	tabSwitch(tab_a,tab_con_us)

	var t = $('.er_tab_t li')[0];
	var t1 = $(tab_con_us[1]).find('.er_tab_t li')[0];

	var con = $(tab_con_us[0]).find('table')[0];
	var con1 = $(tab_con_us[1]).find('table')[0];

	// console.log(t);
	// console.log(con);

	$(tab_a[0]).click(function(event) {
		
		$('.er_tab_t li').removeClass('current')
		$(t).addClass('current')
		$(con).addClass('current')
		console.log(1);
	});
	$(tab_a[1]).click(function(event) {
		
		$('.er_tab_t li').removeClass('current')
		$(t1).addClass('current')
		$(con1).addClass('current')
		console.log(1);
	});

	//名次-切换
	var tab_a = $('.er_tab_t li');
	var tab_con_us = $('.tab_c .data_list');
	tabSwitch(tab_a,tab_con_us)
	
})



// 工具-tab切换
function tabSwitch(tab_index, tab_con){
    //tab_index是切换索引
    //tab_con是切换内容
    for (var i = 0; i <= tab_index.length - 1; i++) {
        tab_index[i].index = i;
        $(tab_index[i]).bind('click',function(event){
            
            // $(tab_con).css('display','none');
            // $(tab_con[this.index]).css('display','block');

            $(tab_con).removeClass('current');
            $(tab_con[this.index]).addClass('current');
    
            $(tab_index).removeClass('current');
            $(this).addClass('current');
        })
    }
}