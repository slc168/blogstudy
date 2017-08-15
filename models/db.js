"use strict";
const mysql=require("mysql");
var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'blog'
});


exports.query=function(sql,P,C){
    let params=[];
    let callback;
    if(arguments.length==2&&typeof arguments[1]=="function"){
        callback=P;
    }else if(arguments.length===3&&Array.isArray(arguments[1])&&typeof arguments[2]=="function"){
        params=P;
        callback=C;
    }else{
        throw new Error("对不起参数不匹配");
    }
    pool.getConnection(function(err,connection){
        connection.query(sql,params,function(){

            connection.release();
            callback.apply(null,arguments);
        })
    })
};