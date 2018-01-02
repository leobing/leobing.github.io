// 缓动轮播图
$(function(){
    var bannert = $('#bannert');
    var prev = $('#bannert .banner_btn .prevBtn');
    var next = $('#bannert .banner_btn .nextBtn');
    var ul = $('#bannert ul.banner_img')[0];
    var img = $('#bannert .banner_img li img');
    //复制第一个li，并追加到ul的里面
    var cloneFirstli = $('#bannert .banner_img li')[0].cloneNode(true);
    ul.appendChild(cloneFirstli);

    var lis = $('#bannert .banner_img li');
    var l = lis.length; //li的葛叔
    var timer = null; //定时器
    var now = 0; //指定移动到第几张图片
    var len = 1; //指定第一次全部展示一遍后，第二次先展示第几张图片
    var li_w = 0; //li的宽度
    img[0].onload = function(){
        li_w = lis[1].offsetWidth;
    }

    //自动滚动到下一张图片
    function auto(){
        next[0].onclick();
    }
    //设置定时器，每隔3秒执行一次auto
    timer = setInterval(auto, 3000);
    
    //点击展示上一张
    prev[0].onclick = function(){
        if(now > 0){
            now--;
        } else {
            now = l - 2; //倒数第二张
            ul.style.left = -(li_w * (l - 1)) + 'px';
        }
        scroll();
    }

    //点击展示下一张
    next[0].onclick = function(){
        if(now < l - 1){
            now++;
        } else {
            now = len;
            ul.style.left = -(li_w * (len - 1)) + 'px';
        }
        scroll();
    }

    //鼠标在图片上方，清除定时器，
    bannert[0].onmouseover = function(){
        clearInterval(timer);
    }
    //鼠标移出图片上方
    bannert[0].onmouseout = function(){
        timer = setInterval(auto, 3000);
    }

    //滚动
    function scroll(){
        act(ul, 'left', -li_w * (now));
    }

    //获得obj的属性值
    function getAttr(obj, attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }

    //缓动动画，obj运动的对象，attr需要改变的对象属性，
    //target属性attr的值需要达到的数值，fn回调函数。
    function act(obj, attr, target, fn){
        //清除定时器
        obj.timer && clearInterval(obj.timer);

        // 设置定时器
        obj.timer = setInterval(function(){
            var stop = true;
            var cur = parseInt(getAttr(obj, attr)); //对obj的属性值取整
            var speed = (target - cur) / 8; //移动速度
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if(cur != target){
                stop = false;
                obj.style[attr] = cur + speed + 'px';
            }
            if(stop){
                clearInterval(obj.timer);
                obj.timer = null;
                fn && fn();
            }
        }, 30);
    }
});