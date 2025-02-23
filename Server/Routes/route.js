const express = require("express");
const {protect} = require("../Middleware/auth.mittleware");
const { registration, login } = require("../Controller/user.controller");

const {learningCreate, getlearningCreate, getlearningCreateId, addword, getallword, getwordId, editWordExplain, deleteWeekPlan, addbookmark, removeBookmark, findBookmark, getWeek} = require("../Controller/app.controller");

const route = express.Router();


//userCreateRouter
route.post("/register", registration);
route.post("/login", login)

// learningCreateRoute
route.post("/learningCreate",protect,learningCreate)
route.get("/getlearningCreate",protect,getlearningCreate);
route.get("/getlearningCreateId/:createdId",protect,getlearningCreateId);

//addwordCreateRoute
route.post("/addword",protect,addword);
route.get("/getallword",protect,getallword);
route.get("/getallwordId/:id",protect,getwordId);
route.put("/updateexplainDate/:id",protect,editWordExplain);
route.delete("/deleteWeekPlan/:id",protect,deleteWeekPlan);
route.put("/addbookmark/:id/:weekId",protect,addbookmark);
route.put("/removeBookmark/:id/:weekId",protect,removeBookmark);
route.get("/findBookmark/:id/:weekId",protect,findBookmark);
route.get("/getWeek/:id/:weekId",protect,getWeek);
route.get("/gettotelWord/:id",protect,getallword);
module.exports = route;