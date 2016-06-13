$(function () {
    //------------首页---------------
    //我们的产品鼠标移入移出交互效果
    $('.product .right-side li').hover(function () {
        var $this = $(this);
        var con_id = $this.data('con');
        $this.addClass('active').siblings().removeClass('active');
        $('.product .left-side .con').addClass('hide').siblings('.' + con_id).removeClass('hide');
    });
    //平台文字说明鼠标移入移出交互效果
    $('.textbox li').hover(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    //------------注册---------------
    $('#regbtn').click(function () {
        var emailortel_val = $.trim($('#emailortel').val());//邮箱或电话号码
        var username_val = $.trim($('#username').val());//姓名
        var employename_val = $.trim($('#employename').val());//单位名称
        var passw_val = $.trim($('#passw').val());//初次密码
        var repassw_val = $.trim($('#repassw').val());//确定密码
        var checkcode_val = $.trim($('#checkcode').val());//验证码
        var protocol_val = $('#protocol').prop('checked');//是否同意协议
        var $info = $('#reginfo');//错误提示信息
        if (!emailortel_val) {
            $info.text('邮箱或手机号码不能为空!');
            $('#emailortel').focus();
            return false;
        }
        if (!username_val) {
            $info.text('姓名不能这空!');
            $('#username').focus();
            return false;
        }
        if (!employename_val) {
            $info.text('单位名称不能为空!');
            $('#employename').focus();
            return false;
        }
        if (!passw_val) {
            $info.text('密码不能为空!');
            $('#passw').focus();
            return false;
        }
        if (!repassw_val) {
            $info.text('请再入输入密码!');
            $('#repassw').focus();
            return false;
        }
        if (!checkcode_val) {
            $info.text('验证码不能为空!');
            $('#checkcode').focus();
            return false;
        }
        if (!protocol_val) {
            $info.text('请阅读并同意协议!');
            return false;
        }
        //邮箱验证正则
        var email_reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        //手机号码验证正则
        var tel_reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!(email_reg.test(emailortel_val) || tel_reg.test(emailortel_val))) {
            $info.text('请输入正确的邮箱或手机号码!');
            $('#emailortel').focus();
            return false;
        }
        //验证两次输入的密码是否一致
        if (passw_val != repassw_val) {
            $info.text('两次输入的密码不一致!');
            $('#repassw').focus();
            return false;
        }
        //ajax提交
        $.ajax({
            type: 'POST',
            cache: false,
            data: {
                'userName': emailortel_val,
                'name': username_val,
                'organization': employename_val,
                'pwd': passw_val,
                'confPwd': repassw_val,
                'code': checkcode_val
            },
            url: '',
            dataType: 'json',
            success: function (res) {
                if (res.header.status != '200') {
                    $info.text(res.header.message);
                } else {
                    //注册成功之后处理(提示注册成功或者跳转页面)
                }
            }
        });
    });
    //------------登录---------------
    $('#login_btn').click(function () {
        var login_user_val = $.trim($('#login_user').val());//账号
        var login_pass_val = $.trim($('#login_pass').val());//密码
        var $info = $('#logininfo');//错误提示信息
        if (!login_user_val) {
            $info.text('帐号不能为空!');
            $('#login_user').focus();
            return false;
        }
        if (!login_pass_val) {
            $info.text('密码不能为空!');
            $('#login_pass').focus();
            return false;
        }
        //ajax提交
        $.ajax({
            type: 'POST',
            cache:false,
            data: {
                'username': login_user_val,
                'password': login_pass_val
            },
            url: '',
            dataType: 'json',
            success: function (res) {
                if (res.header.status != '200') {
                    $info.text(res.header.message);
                } else {
                    //登录成功之后处理(跳转页面)
                }
            }
        });
    });
    //------------合作介绍---------------
    //菜单鼠标移入交互
    $('.coop-body .menulist li').hover(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.coop-body .con').removeClass('active');
        $('.coop-body .' + $(this).data('con')).addClass('active');
    });
});