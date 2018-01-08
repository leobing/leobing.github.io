$(function(){
    var Util = {
        Cookie: {
            set: function (name, value, expire) {
                var exp = new Date();
                exp.setTime(exp.getTime() + expire * 24 * 60 * 60 * 1000);
                document.cookie = name + "=" + encodeURIComponent(value, "UTF-8") + ";expires=" + exp.toGMTString() + ";domain=passport.xj.com;path=/";
            },
            get: function (key) {
                var cookies = document.cookie ? document.cookie.split('; ') : [];
                for (var i = 0, l = cookies.length; i < l; i++) {
                    var parts = cookies[i].split('=');
                    var name = parts.shift();
                    var cookie = parts.join('=');
                    if (key && key === name) {
                        return cookie;
                    }
                }
            },
            setALCookie: function () {
                if ($("input[name='chkRememberMe']").prop("checked")) {
                    var Days = 3 * 30;
                    this.set("alpin", $("#loginname").val(), Days);
                } else {
                    var v = this.get("alpin");
                    if (v) {
                        this.set("alpin", "", -100);
                    }
                }
            }
        },
        Header: {
            getProtocol: function(){
                var parentScheme = '';
                try{
                    parentScheme = parent.location.protocol;
                }catch(e){
                    parentScheme = LoginConstant.HTTP_SCHEME;
                }
                if(!parentScheme){
                    parentScheme = LoginConstant.HTTP_SCHEME;
                }
                return parentScheme;
            }
        }
    };

    function validataLogin(){
    	if($("#loginname").val() =='' || $("#phone").val() == "请输入手机号"){
    		showMesInfo("请输入手机号码");
    		$("#loginname").focus();
    		return false;
    	}else if(!validatemobile($("#loginname").val())){
    		return false;
    	}
    	var pas1 = $("#loginpwd").val();
    	if($.trim(pas1) == ""){
    		showMesInfo("请输入密码");
    		$("#loginpwd").focus();
    		return false;
    	}
    	if($.trim(pas1).length < 6){
    		showMesInfo("密码必须大于6位，请重新输入！");
    		$("#loginpwd").focus();
    		return false;
    	}
    	return true;
    }

    //登陆操作
    function loginSubmit() {
    	if (!validataLogin()) {
    		return;
    	}else{
    	    $('#loginsubmit').text('正在登录...');
    	    var loginUrl = "../user/doLogin.shtml";
    	    $.ajax({
    	        url: loginUrl + "?r=" + Math.random(),
    	        type: "POST",
    	        dataType: "json",
    	        contentType: "application/x-www-form-urlencoded; charset=utf-8",
    	        data: {
    	        	username:$('#loginname').val(),
    	            password:$('#loginpwd').val(),
    	            redirectURL:$('#redirectURL').val()
    	        },
    	        error: function () {
    	            showMesInfo("网络超时，请稍后再试");
    	        },
    	        success: function (result) {
    	        	if(result.ret !=1){
    	            	$("#msg-error").show(); 
    	            	$("#msg-error").html("<a>!</a>"+result.msg);
    	            	$("#loginsubmit").html("登&nbsp;&nbsp;&nbsp;&nbsp;录");
    	        	}else{
    	        		Util.Cookie.setALCookie();    
    	        		console.log("ddd"+result.redirectURL.length);
    	        		if(result.redirectURL.length !=0){
    						/*layer.msg('登录成功!', {
    					    	time: 2000 //2秒关闭（如果不配置，默认是3秒）
    						}, function(){
    						}); */            		
    						window.location.href=result.redirectURL;
    	        		}else{
    						/*layer.msg('登录成功!', {
    					    	time: 1000 //2秒关闭（如果不配置，默认是3秒）
    						}, function(){
    						}); */
    						window.location.href="../index/index.shtml";
    	        		}
    	        	}  
    	        }
    	    });
    	}
    }
    function showMesInfo(msg) {
    	$("#msg-error").show(); 
    	$("#msg-error").html("<a>!</a>"+msg);
    }
    function keyLogin(event){
    	if (event.keycode==13|| event.which == 13){
    		//回车键的键值为13
    		loginSubmit();  //调用登录按钮的登录事件   
    	}   
    }


    function logout(){
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "json", //数据格式:JSON
            url: '../user/logout.shtml', //目标地址
            data: {},
            error: function (XMLHttpRequest, textStatus, errorThrown) { },
            success: function (msg){
            	if(msg.ret !=1){
            		//layer.msg(msg.msg);
            	}else{
    				/*layer.msg('退出成功!', {
    			    	time: 1000 //2秒关闭（如果不配置，默认是3秒）
    				}, function(){
    				}); */	            		
    				window.location.href="../index/index.shtml";
            	}            
            }
        });			
    }    


    //验证手机号
    function validatemobile(mobile){
        if(mobile.length==0) 
        { 
        	showMesInfo('请输入手机号码！'); 
           //document.form.phone.focus(); 
           return false; 
        }     
        if(mobile.length!=11) 
        { 
        	showMesInfo('请输入有效的手机号码！'); 
           // document.form.phone.focus(); 
            return false; 
        } 
         
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        if(!myreg.test(mobile)) 
        { 
        	showMesInfo('请输入有效的手机号码！'); 
           // document.form.phone.focus(); 
            return false; 
        } 
        return true;
    } 
});
