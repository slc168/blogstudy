"use strict";
const path=require("path");
module.exports={
    debug:true,
    secret:"studyblog",
    upLoadDir:path.join(__dirname,"uploads"),
    avatarDir:path.join(__dirname,"uploads/avatar")
};
