//Bayes Classifier 
var natural = require('natural');
var maxIter = 150;
var minImprov

var classifier= new natural.BayesClassifier();

classifier.addDocument('I really like memes','addicted');
classifier.addDocument('I have been using slack too much','addicted');

classifier.train(maxIter, minImprov);

