$(function(){

	// 解决方案-切换
	var solutions = $('.solution_items section');
	for(var i=0; i<solutions.length; i++){
		$(solutions[i]).click(function(event) {
			$(solutions).removeClass('current');
			$(solutions).find('dl').removeClass('current');

			$(this).addClass('current');
			$(this).find('dl').addClass('current');
		});
	}

	// 日历
	$('#calendar')
})




// 工具-tab切换
function tabSwitch(tab_index, tab_con){
    //tab_index是切换索引
    //tab_con是切换内容
    for (var i = 0; i <= tab_index.length - 1; i++) {
        tab_index[i].index = i;
        $(tab_index[i]).bind('click',function(event){
            
            $(tab_con).css('display','none');
            $(tab_con[this.index]).css('display','block');
    
            $(tab_index).removeClass('current');
            $(this).addClass('current');
            // console.log(this.index);
        })
    }
}

