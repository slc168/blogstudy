"use strict";
const express=require("express");
const router=express.Router();
const indexController=require("./controllers/index");
const userController = require('./controllers/user');
const articleController=require("./controllers/article");



router.get("/",indexController.showIndex);//获取首页
router.get("/page/:pageNumber",articleController.getByPageNumber);

router.get("/register",[checkLogin,
    userController.showRegister]);//获取注册页面
router.post('/register',userController.doRegister);//用户注册

router.get("/login",userController.showLogin);//获取登录页面
router.post("/login",userController.doLogin);//用户登录
router.get("/logout",userController.doLogout);//退出
router.get("/captcha",userController.getCaptcha);//获取验证码

router.get("/publish/article",[checkNotLogin,articleController.showPublish]);//获取发表文章页面
router.post("/publish/article",articleController.doPublish);//发布文章
router.get("/article/:articleId",articleController.showArticle);//获取文章页面
router.post("/article/upload",articleController.uploadImage);//发表文章上传图片

router.post("/comment/answer/:articleId");
router.get("/setting/profile",[checkNotLogin,userController.showSeting]);
router.post("user/avatar",userController.uploadAvatar);

function checkLogin(req,res,next){
    if(req.session.user){
        return res.redirect("/")
    }
    next();
}


function checkNotLogin(req,res,next){
    if(!req.session.user){
        return res.redirect("/");
    }
    next();
}
module.exports=router;