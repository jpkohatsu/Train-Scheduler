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

  // used to clear the data
  // firebase.database().ref().remove(); 

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

  	// New variable to hold 'childSnapshot.val();'
  	var train = childSnapshot.val();

  	// Store everything into a variable
  	var firstTime = train.train;

  	var firstTimeValues = firstTime.split(':');

  	var firstMinutes = firstTimeValues[0] * 60 + Number(firstTimeValues[1]);

  	var currentMinutes = moment().format('HH') * 60 + Number(moment().format('mm'));

  	var difference = currentMinutes - firstMinutes;

  	// Number of trains
  	var totalTrains = difference % train.frequency;

  	// Gives you the minutes away
  	var minutesAway = train.frequency - totalTrains;

  	// hh:mm a gives you the am or pm for time
  	var arrivalTime = moment().add(minutesAway, 'minutes').format('hh:mm a');

  	console.log(difference, totalTrains, minutesAway);
  	
  	// Add each train's data into the table
  	$("#train-table > tbody").append(
  		"<tr>" +
	  		"<td>" + train.name + "</td>" +
	  		"<td>" + train.destination + "</td>" +
	  		"<td>" + train.frequency + "</td>" +
	  		"<td>" + firstTime + "</td>" +
	  		"<td>" + arrivalTime + "</td>" +
	  		"<td>" + minutesAway + "</td>" +
	  	"</tr>"
	);

  });

