"use strict";
const db=require("./db");
function Article(article){
    this.title=article.title;
    this.content=article.content;
    this.time=article.time;
    this.uid=article.uid;
}
Article.prototype.save=function(callback){
    db.query(`insert into articles values(null,?,?,?,?)`,[
        this.title,
        this.content,
        this.time,
        this.uid
    ],function(err,result){
        if(err){
            return callback(err,null);
        }
        callback(null,result);
    });
};
Article.getById=function(id,callback){
    db.query(`select * from articles where id=?`,[
        id
    ],function(err,result){
        if(err){
            return callback(err,null);
        }
        callback(null,result[0]);
    })
};
module.exports=Article;