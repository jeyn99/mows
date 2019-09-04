// basic functionalities
$(document).ready(function () {
  var brokweAdd = "ws://broker.hivemq.com:8000/mqtt";
  $("#add").val(brokweAdd);
  var top = $("#topicPub");
  var pload = $("#payload");
  var subscribeTopic = $("#topicSub");
  var time = new Date($.now());


  $("#connectBtn").click(function (e) {
    e.preventDefault();
    $("#status").val("Connecting...");

    client = mqtt.connect(brokweAdd);
    client.on("connect", function () {
      $("#status").val("Successfully Connected");

      ($("#pubBtn").click(function () {
        client.publish(top.val(), pload.val());
        $("#PubDetails").show();
        var row = "<tr><td>" + top.val() + "</td><td>" + pload.val() + "</td><td>" + time.toUTCString() + "</td></tr>";
        $("#tb").append(row);
      }))

      $("#subBtn").click(function () {
        client.subscribe(subscribeTopic.val())
        //client.publish(top.val(), pload.val());
        $("#SubDetails").show();
        var row = "<tr><td>" + subscribeTopic.val() + "</td><td>" + time.toUTCString() + "</td></tr>";
        $("#tbsub").append(row);
        client.on("message", function (topic, payload) {
          console.log([topic, payload].join(": "));
          $("#SubsPubDetails").show();
          var row = "<tr><td>" + subscribeTopic.val() + "</td><td>" + payload + "</td><td>" + time.toUTCString() + "</td></tr>";
          $("#tbsubs").append(row);
        })
      })

      $("#disconnectBtn").click(function () {
        //client.end();
        location.reload();
        //$("input").val(null);
        //$("#add").val(brokweAdd);
      })

      $("#unsubBtn").click(function () {
        client.unsubscribe(subscribeTopic.val())
      })
    })
  })
});
















// // advance functionalities

// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")

// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
