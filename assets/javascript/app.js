// Initialize Firebase
  var config = {
    apiKey: "AIzaSyApwt2spivQquuE9oeYAlcUvUh0j9SLaQs",
    authDomain: "train-scheduler-6f5a6.firebaseapp.com",
    databaseURL: "https://train-scheduler-6f5a6.firebaseio.com",
    projectId: "train-scheduler-6f5a6",
    storageBucket: "",
    messagingSenderId: "533368840628"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Button for adding Trains
  $("#add-train-btn").on("click", function (event) {
  	event.preventDefault();

  	// Grabs user input
  	var trainName = $("#train-name-input").val().trim();
  	var trainDestination = $("#destination-input").val().trim();
  	var trainTime = $("#start-input").val().trim();
  	var trainFrequency = $("#frequency-input").val().trim();

  	// Creates local "empty" object to hold the train data
  	var newTrain = {
  		name: trainName,
  		destination: trainDestination,
  		train: trainTime,
  		frequency: trainFrequency
  	};

  	// Uploads train data to the database
  	database.ref().push(newTrain);

  	// Logs everything to the console
  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.train);
  	console.log(newTrain.frequency);

  	// Alert
  	alert("Train information successfully added");

  	// Clears all the text-boxes
  	$("#train-name-input").val("");
  	$("#destination-input").val("");
  	$("#start-input").val("");
  	$("#frequency-input").val("");

  });

  // Create Firebase event for adding train to the database and a row in the HTML
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  	console.log(childSnapshot.val());

  	// Store everything into a variable
  	var trainName = childSnapshot.val().name;
  	var trainDestination = childSnapshot.val().destination;
  	var trainTime = childSnapshot.val().train;
  	var trainFrequency = childSnapshot.val().frequency;

  	// Train information
  	console.log(trainName);
  	console.log(trainDestination);
  	console.log(trainTime);
  	console.log(trainFrequency);

  	// Prettify the train input
  	// var trainStartPretty = moment.unix(trainTime).format("MM/DD/YY");

  	// Calculate the next arrival time
  	var trainArrival = moment().diff(moment.unix(trainTime, "X"), "arrival");
  	console.log(trainArrival);

  	// Calculate the total minutes away
  	var minutesAway = trainArrival * trainFrequency;
  	console.log(minutesAway);

  	// Add each train's data into the table
  	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainTime + "</td><td>" + minutesAway + "</td><td>");

  });

