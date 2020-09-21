// jshint esversion:6
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
const query=req.body.cityName;
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=2867953741bec5a1737c9337ad901285&units=metric";
https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const desc=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<h1>The Temperature in "+query+" is currently "+temp+".</h1>");
    res.write("<h2>Weather Condition is "+desc+".</h2>");
    res.write('<img src='+imageURL+' style="background-color:orange;">');
    res.send();
  });

  });
});
app.listen(3000,function(){
  console.log("Server running on port 3000");
});
