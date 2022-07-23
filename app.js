const express = require("express")
 const app = express()
 const https = require('https')
 const bodyParser = require("body-parser")
 app.use(bodyParser.urlencoded({extended:true}));
 app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
 }) 
 app.post("/",(req,res)=>{
    console.log(req.body.cityName)
    const query = req.body.cityName
    const apiKey = "1158a2be61f4180e2fed33b416a877cd"
    const unit = "metric"
 const url = "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid="+apiKey+ "&q="+ query + "&units=" +unit;
 https.get(url,(response)=>{
    console.log(response.statusCode)
    
    response.on("data",(data)=>{
        
       const weatherData= JSON.parse(data);
       const temp= weatherData.list[0].main.temp
       const des= weatherData.list[0].weather[0].description
       const icon = weatherData.list[0].weather[0].icon
       const imageURL = "http://openweathermap.org/img/wn/"+ icon+ "@2x.png"
       console.log(temp);
       console.log(des)
       res.write("<h1>The Temp in "+ req.body.cityName  +" is " + temp +    "   Degree Celsius</h1>")
       res.write("<h3>The Weather  in  "+ req.body.cityName  +" is " + des +"</h3>")
       res.write("<img src="+ imageURL +">")
       res.send();
    })
 })
 
 
  
 })
 app.listen(3000,()=>{
    console.log("Server started at port 3000")
 })