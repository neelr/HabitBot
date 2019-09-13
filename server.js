var express = require("express");
var natural = require("natural");
var bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.json())
app.set('view engine', 'ejs');
var botClass;

natural.BayesClassifier.load("./classifier.json",null,(err,classifier) => {
    console.log("Loaded Classifier");
    botClass = classifier
    console.log(classifier.getClassifications("I want to do better"))
})

app.post("/comp",(req,res)=> {
    var classification = botClass.getClassifications(req.body.message);
    var response = {}
    switch (classification[0].label) {
      case "leave":  response = {response:"Bye! See you later!"}; break;
      case "improve":   response = {response:"Wow thats great!"}; break;
      case "no-improve":   response = {response:"IMPROVE IDIOT"}; break;
      case "greet":   response = {response:"Hi!"}; break;
      case "sentient":   response = {response:"Yes. I am an omnipotent being."}; break;
    }
  
    console.log(response,classification[0].label);
    res.send(response);
    res.end();
});
app.get("/",(req,res)=> {
    res.render('index');
});
app.listen(3000,(err) => {
    console.log("AdicBot Listening on 3000")
});