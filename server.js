var express = require("express");
var natural = require("natural");
var bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.json())
var botClass;

natural.BayesClassifier.load("./classifier.json",null,(err,classifier) => {
    console.log("Loaded Classifier");
    botClass = classifier
    console.log(classifier.getClassifications("I want to do better"))
})

app.post("/comp",(req,res)=> {
    console.log(req.body.message)
    res.send(botClass.getClassifications(req.body.message));
});
app.get("/",(req,res)=> {
    res.send("Adic Bot is online!");
});
app.listen(3000,(err) => {
    console.log("AdicBot Listening on 3000")
});