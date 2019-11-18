//<script src="https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min.js"></script>

//<script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js"></script>

//<script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-database.js"></script>

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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var trainName = "";
var destination = "";
var frequency = 0;
var firstTrainTime = "";

$("#add-user").on("click", function (event) {
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
});
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();
    console.log(sv.trainName);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(sv.firstTrainTime);


});