"use strict";
const db=require("./db.js");
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


Article.getByPage=function(skipNumber,takeNumber,callback){
    db.query("select a.id,a.title,a.content,a.time,u.username" +
        "from articels as a inner join users as u on a.uid=u.id" +
        "order by time desc limit ?,?",[skipNumber,takebNumber],function(err,result){
        if(err){
            return callback(err,null);
        }
        callback(null,result);
    });
};
Article.getAllCount=function(callback){
    db.query("select count(id) as count from articles",function(err,result){
        if(err){
            return callback(err,null);
        }
        callabck(null,result[0].count);
    })
};
module.exports=Article;