// banner轮播图
$(function(){
    var box_roll = $('#box_roll');
    var dots = $('#box_roll .focus_s ul li'); //焦点
    var links = $('#box_roll .focus_m ul li'); 

    var timer = null;
    var cur = 0;
    dots.bind({
        mouseover: function(){
            $(dots).removeClass('active');
            $(this).addClass('active');
            // console.log($(this).index());
            $(links).removeClass('active');
            $(links[$(this).index()]).addClass('active');
        },
    });

    timer = setInterval(auto, 3000);

    box_roll.mouseover(function(){
        clearInterval(timer);
    });
    box_roll.mouseleave(function(){
        timer = setInterval(auto, 3000);
    });

    function auto(){
        cur++;
        if (cur >= dots.length) {
            cur = 0;
        };
        $(dots).removeClass('active');
        $(dots[cur]).addClass('active');

        $(links).removeClass('active');
        $(links[cur]).addClass('active');
    }
});