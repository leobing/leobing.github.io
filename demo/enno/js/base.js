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


	//医疗案例-切换
	var tab_a = $('.case_tab_tit li');
	var tab_con_us = $('.case_tab_c .case_item');
	tabSwitch(tab_a,tab_con_us);

	//医疗动态-切换
	var tab_a_state = $('.state_tab_t li');
	var tab_con_state = $('.state_tab .state_tab_c');
	tabSwitch(tab_a_state,tab_con_state);

	

})

// 弹框
function pop(){
	layer.open({
	  type: 1,
	  title: '快速预约绿色通道',
	  shadeClose: true,
	  shade: false,
	  area: ['893px', '600px'],
	  content: ''
	});

}


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
// 能遍历对象和数组的通用forEach函数
function forEach(obj, fn){
			var key;
			if(obj instanceof Array){
				// 准确判断是不是数组
				obj.forEach(function(item, index){
					fn(index, item);
				});
			}else{
				//不是数组就是对象
				for(key in obj){
					if(obj.hasOwnProperty(key)){
						fn(key, obj[key]);
					}
				}
			}
		}

