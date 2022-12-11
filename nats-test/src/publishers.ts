import nats from "node-nats-streaming";
const client = nats.connect('test-cluster', "abc", {
  url: "http://localhost:4000",
});
console.log(client.on);

client.on("connect", () => {
  console.log("publisher connected");
  client.publish('foo', 'Hello node-nats-streaming!', (err, guid) => {
    if (err) {
      console.log('publish failed: ' + err)
    } else {
      console.log('published message with guid: ' + guid)
    }
})
})
