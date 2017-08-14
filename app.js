"use strict";
const express=require('express');
const bodyParser=require("body-parser");
const path=require("path");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const config=require("./config");


const app=express();

//配置静态文件服务中间件
app.use("/www",express.static("www"));
app.use('/uploads',express.static('upload'));

//挂载cookie中间件
app.use(cookieParser());
//挂载Session中间件
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true
}));
//配置解析post请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));

//配置模板引擎
app.set("views",path.join(__dirname,"views"));
app.set('view engine','xtpl');


app.locals.config=config;

//加载路由路径
app.use(require("./router.js"));

//开发环境错误处理中间件
if(config.debug){
    app.use(function(err,req,res,next){
        res.end("服务器奔溃"+err);
        next();
    })
}
app.listen(3000,"127.0.0.1",function(){
    console.log('server is running at port 3000');
});