// basic functionalities
$(document).ready(function () {
  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  $("#add").val("ws://broker.hivemq.com:8000/mqtt");
  var stats;
  var top = $("#topicPub");
  var pload = $("#payload");
  var subscribeTopic = $("#topicSub");
  var time = new Date($.now());

  client.on("connect", function () {
    stats = ("Successfully connected");//display in console to check its connectivity
  })

  $("#connectBtn").click(function (e) {
    e.preventDefault();
    console.log("Connect");
    console.log(time.toUTCString());
    $("#status").val(stats);//connection display
    

    ($("#pubBtn").click(function () {
      client.publish(top.val(), pload.val());
      //$("#PublishDetails").$("<tr><td>" + top.val())
    }))


    $("#subBtn").click(function () {
      client.subscribe(subscribeTopic.val())
      client.publish(top.val(), pload.val());
      client.on("message", function (topic, payload) {
        console.log([topic, payload].join(": "));
        
      })
      var row = "<tr><td>" + top.val() + "</td><td>" + time.toUTCString() + "</td></tr>";
      $("#SubDetails").append(row);
    })

    $("#unsubBtn").click(function () {
      client.subscribe(subscribeTopic.val())
      client.publish(top.val(), pload.val());
      client.on("message", function (topic, payload) {
        console.log([topic, payload].join(": "));
        client.end();
      })
      
    })

  });



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
