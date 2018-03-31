
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAfwIYxRwylW_E_p9z1fnuwN0qTTqZNx5g",
        authDomain: "first-firebase-afdaf.firebaseapp.com",
        databaseURL: "https://first-firebase-afdaf.firebaseio.com",
        storageBucket: "first-firebase-afdaf.appspot.com",
        
    };

    firebase.initializeApp(config);

    var dataRef = firebase.database();

    // Initial Values
    var name = "";
    var dest = "";
    var time = "";
    var freq = "";

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      name = $("#name-input").val().trim();
      dest = $("#dest-input").val().trim();
      time = $("#time-input").val().trim();
      freq = $("#freq-input").val().trim();

      var tFrequency = freq;

// Time is 3:30 AM
var firstTime = time;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
//console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
//console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
//console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
//console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      // Code for the push
      dataRef.ref().push({

        name: name,
        dest: dest,
        freq: freq,
        next: moment(nextTrain).format("hh:mm"),
        away: tMinutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().dest);
      console.log(childSnapshot.val().freq);
      console.log(childSnapshot.val().next);
      console.log(childSnapshot.val().away);


      // full list of items to the well
      $("#full-member-list").append("<tr> <td> " + childSnapshot.val().name +
            " </td><td> " + childSnapshot.val().dest +
            " </td><td> " + childSnapshot.val().freq + 
            " </td> <td> " + childSnapshot.val().next + 
            " </td> <td> " + childSnapshot.val().away + " </td> </tr>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


