var natural = require("natural");

var botClassifier = new natural.BayesClassifier();


var greetArray = ["Hello","Hola","Hi","How do you do", "what's up?","greetings"];
var leaveArray = ["Bye","I need to go","Bai","Im leaving","See you later"];
var sentientArray = ["Are you a human?", "are you alive?", "hello father", "are you a robot","are you sentient"]; 
var lonelyArray = ["I have no friends", "I'm lonely", "I wish I had some close friends","i am quite lonely"]; 
var noStopArray = ["But I can't stop", "I can't stop",'I dont want to stop sniffing cocaine',"i am very addicted and cant stop"];
var improveArray = ["I want to do better", "I don't want to be addicted anymore","I want to improve","I'm going to do better"]; 

greetArray.map((data)=> {
    botClassifier.addDocument(data,"greet");
})
leaveArray.map((data)=> {
    botClassifier.addDocument(data,"leave");
})
sentientArray.map((data)=> {
    botClassifier.addDocument(data,"sentient");
})
noStopArray.map((data)=> {
    botClassifier.addDocument(data,"no-improve");
})
lonelyArray.map((data)=> {
    botClassifier.addDocument(data,"lonely");
})
improveArray.map((data)=> {
    botClassifier.addDocument(data,"improve");
})

botClassifier.train();

botClassifier.save("./classifier.json", function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Exported to classifier.json");
})