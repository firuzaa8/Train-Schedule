var firebaseConfig = {
    apiKey: "AIzaSyCsSOlvMib1DpSEwmsB1cNcxmyBbfWB5Io",
    authDomain: "local-train-schedule-a549d.firebaseapp.com",
    databaseURL: "https://local-train-schedule-a549d.firebaseio.com",
    projectId: "local-train-schedule-a549d",
    storageBucket: "local-train-schedule-a549d.appspot.com",
    messagingSenderId: "20066775228",
    appId: "1:20066775228:web:b13968682ba362fc76a0b9",
    measurementId: "G-M484QCB86D"
};

$(document).ready(function () {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var frequency = 0;
    var firstTrainTime = "08:00";

 


    $("#add-train").on("click", function (event) {
        event.preventDefault();
        trainName = $("#InputTextName").val().trim();
        destination = $("#InputTextDest").val().trim();
        frequency = $("#InputTextFreq").val().trim();
        firstTrainTime = $("#InputTextTime").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            firstTrainTime: firstTrainTime,
        });

        $("#InputTextName").val("");
        $("#InputTextDest").val("");
        $("#InputTextFreq").val("");
        $("#InputTextTime").val("");

    });

   
    database.ref().on("child_added", function (snapshot) {
        var sv = snapshot.val();

        var currentTime = moment();
        var firstArrival = moment(sv.firstTrainTime, "HH:mm");


        var diffInMinutes = currentTime.diff(firstArrival, "minutes");
        console.log(diffInMinutes);

        var remainder = diffInMinutes % sv.frequency;
        console.log(remainder);

        var minutesToNextArrival = sv.frequency - remainder;
        console.log(minutesToNextArrival);

        var nextArrival = currentTime.add(minutesToNextArrival, "minutes");

        var nextArrivalString = nextArrival.format("HH:mm")


        $("#main").append("<div class='row'>" +
            "<div class='col-sm'> " + sv.trainName + " </div>" +
            "<div class='col-sm'> " + sv.destination + " </div>" +
            "<div class='col-sm'> " + sv.frequency + " </div>" +
            "<div class='col-sm'> " + nextArrivalString + " </div>" +
            "<div class='col-sm'> " + minutesToNextArrival + " </div>" +


            "</div>");





    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});