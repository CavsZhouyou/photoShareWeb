/*
 * @Author: zhouyou@weruan 
 * @Descriptions: 图片分类页面js依赖文件
 * @Date: 2017-12-17 17:33:38 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-02-06 12:11:53
 */

//import css
require("./photoClass.scss");

//import js
require("../js/iconfont.js");
require("../js/jquery.cookie.min.js");
const getParamsUrl = require("../js/getParamsUrl.js");

$(function() {
    //判断是否处于登录状态
    if ($.cookie("account")) {
        //显示用户昵称
        $(".user-login").show();
        $(".user-default").hide();
        $(".user-name").text($.cookie("username"));
        //显示用户头像
        $(".user-img").attr("src", $.cookie("headimg") || "../image/login.png");
    }

    //加载图片列表
    getPhotoList();

    //点击显示登录界面
    $(".login-button").click(function() {
        $(".login-container").show();
        $(".mask-layer").show();

        //点击切换登录界面
        $(".login").click(function() {
            $(this).addClass("doing");
            $(".regist").removeClass("doing");

            $("#regist-content").hide();
            $("#login-content").show();
        });

        //点击切换注册界面
        $(".regist").click(function() {
            $(this).addClass("doing");
            $(".login").removeClass("doing");

            $("#login-content").hide();
            $("#regist-content").show();
        });

        //点击遮罩层返回
        $(".mask-layer").click(function() {
            $(".login-container").hide();
            $(".mask-layer").hide();
        });

        //点击取消按钮返回
        $(".return").click(function() {
            $(".login-container").hide();
            $(".mask-layer").hide();
        });

        //点击登录账号
        $("#login").click(function() {
            var account = $("#loginAccount").val(),
                password = $("#loginPassword").val(),
                data = {
                    account: account,
                    password: password
                };

            //判断输入账号密码是否为空
            if (account === "" || password === "") {
                alert("账户或密码不能为空！");
                return;
            }

            $.ajax({
                url: "/PhotoShareWeb/share/user/login",
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(data) {
                    if (data.success) {
                        //将用户信息写入cookie中
                        $.cookie("account", data.user.account, {
                            expires: 7
                        });
                        $.cookie("username", data.user.username, {
                            expires: 7
                        });
                        $.cookie("headimg", data.user.headimg, {
                            expires: 7
                        });
                        $.cookie("power", data.user.power, {
                            expires: 7
                        });

                        //显示用户昵称
                        $(".user-login").show();
                        $(".user-default").hide();
                        $(".user-name").text(data.user.username);
                        //显示用户头像
                        $(".user-img").attr(
                            "src",
                            data.user.headimg || "../image/login.png"
                        );
                        //返回主页面
                        $(".login-container").hide();
                        $(".mask-layer").hide();
                    } else {
                        alert("登录失败！");
                    }
                }
            });
        });

        //点击注册账号
        $("#regist").click(function() {
            var account = $("#registAccount").val(),
                password = $("#registPassword").val(),
                rePassword = $("#registRePassword").val(),
                data = {
                    account: account,
                    password: password,
                    power: 2
                };

            //判断输入账号密码是否为空
            if (account === "" || password === "") {
                alert("账户或密码不能为空！");
                return;
            }

            //判断两次密码输入是否一致
            if (password !== rePassword) {
                alert("两次输入密码不一致！");
                return;
            }

            $.ajax({
                url: "/PhotoShareWeb/share/user/regist",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(data) {
                    if (data.success) {
                        alert("恭喜你注册成功！");
                        //返回主页面
                        location.href = "./index.html";
                    } else {
                        alert(data.message);
                    }
                }
            });
        });
    });

    //点击退出登录
    $("#logout").click(function() {
        //清除cookies
        $.cookie("username", "", {
            expires: -1
        });
        $.cookie("headimg", "", {
            expires: -1
        });
        $.cookie("power", "", {
            expires: -1
        });
        $.cookie("account", "", {
            expires: -1
        });

        //跳转回首页
        location.href = "./index.html";
    });

    /**
     * @description 加载图片列表
     */
    function getPhotoList() {
        var photoClass = getParamsUrl("type");

        $.ajax({
            url: "/PhotoShareWeb/share/photo/getPhotoByClass",
            type: "POST",
            data: {
                photoClass: photoClass
            },
            dataType: "json",
            success: function(data) {
                if (data.success) {
                    //向页面插入图片
                    appendPhotoList(data.photoList);
                }
            }
        });
    }

    /**
     * @description 向页面插入图片
     * @param {Arrey} photoList
     */
    function appendPhotoList(photoList) {
        var photoBoxString,
            $photoContainer = $("#photo-container"),
            $photoBox;

        if (photoList.length === 0) {
            alert("该分类还没有人上传图片，快快登录一起上传图片吧！");
            return;
        }

        photoList.forEach(photo => {
            photoBoxString = require("./box.html");
            photoBoxString = photoBoxString
                .replace("$photoURL", photo.photourl)
                .replace("$photoID", photo.id)
                .replace("$potoName", photo.photoname);

            $photoBox = $(photoBoxString);
            $photoContainer.append($photoBox);
        });
    }
});
