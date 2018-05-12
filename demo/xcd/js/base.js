$(function(){
  //关于我们-切换
  var tab_a = $('.about_intro li a');
  var tab_con_us = $('.about_con_right .item');
  tabSwitch(tab_a,tab_con_us)

  //成功案例-切换
  var tab_case = $('.case_right_bottom .case_tab');
  var tab_con_case = $('.case_left .case_show');
  tabSwitch(tab_case,tab_con_case);

  // 服务页面-背景、tag切换
  $('.service_con_item').hover(function() {
    $(this).find('.tag').fadeIn();
    $(this).parents('.service').css({
      backgroundImage: 'url(images/bg_about.jpg)',
    });
  }, function() {
    $(this).find('.tag').fadeOut();
    $(this).parents('.service').css({
      backgroundImage: 'url(images/bg_service.jpg)',
    });
  });

  //成功案例-list-切换
  var tab_case_li = $('.case_list .case_tab .tab_t li');
  var tab_case_c = $('.case_list .case_tab .tab_c');
  tabSwitch(tab_case_li,tab_case_c);

  // 当鼠标移动到地图上，缩放地图时，禁止页面滚动。否则，允许滚动
  pageScroll('#amap_label', false);

  // 当鼠标移动到no_scroll上，滚动滑轮时，禁止页面滚动。否则，允许滚动
  scrollBar();
  $(window).on("click", function (e){
    scrollBar();
  });

  $('.back_top').click(function(event) {
    backTop();
  });
  
});

function backTop(){
  $("html,body").animate({scrollTop:"0px"},666);
}

// 判断no_scroll区域是否有滚动条,有滚动条则禁止整个页面滚动
function scrollBar(){
  var obj_sc = document.getElementsByClassName('no_scroll');
  for(var i=0; i<obj_sc.length; i++){
    //offsetHeight=scrollHeight=clientHeight则没有滚动条  
    if(obj_sc[i].scrollHeight>obj_sc[i].clientHeight){  
      // obj_sc[i]区域有滚动条，
      pageScroll(obj_sc[i],false);
    }else{
      // obj_sc[i]区域无滚动条
      pageScroll(obj_sc[i],true);
    }
  }
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

// 当鼠标移动到ele上，滑轮滚动时，禁止页面滚动。否则，允许滚动
function pageScroll(ele,no){
  $(ele).hover(function() {
    $(ele).on("mousewheel DOMMouseScroll", function (e){
      var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                  (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
      if (delta > 0) {
          // 向上滚
          $.fn.fullpage.setAllowScrolling(no);
      } else if (delta < 0) {
          // 向下滚
          $.fn.fullpage.setAllowScrolling(no);
      }
    });
  }, function() {
      $.fn.fullpage.setAllowScrolling(true);
  });
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


