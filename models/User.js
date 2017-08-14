"use strict";
const db=require("./db.js");
//通过封装自己管理自己
function User(user){
    this.username=user.username;
    this.password=user.password;
    this.email=user.email;
}
User.getByUsername=function(username,callback){
    db.query("select * from users where username=?",[username],function(err,result){
        if(err){
            return callback(err,null);
        }
        callback(null,result);
    })
};
User.prototype.save=function(callback){
    db.query("Insert into users values(Null,?,?,?)",[this.username,this.password,this.email],function(err,result){
        if(err){
            return callback(err,null);
        }
        callback(null,result);
    })
};
module.exports=User;