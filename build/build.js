var natural = require("../node_modules/natural/index");

var botClassifier = new natural.BayesClassifier();


botClassifier.addDocument("i want to live","LIVE");
botClassifier.addDocument("i want to die","sucicial");
botClassifier.train();

botClassifier.save("../classifier.json", function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Kablammo I saved it!")
})

console.log(botClassifier.getClassifications("i want to live"));