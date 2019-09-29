const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});

const pusher = new Pusher({
  appId: '870765',
  key: '4d63dacb05bcf4da1d92',
  secret: 'e429060f4cc667f02bf8',
  cluster: 'eu',
  encrypted: true
});

app.post('/pusher/trigger', function(req, res) {
  console.log(req.body);
  pusher.trigger(req.body.channelName, 'sound_played', { index: req.body.index }, req.body.socketId );
  res.send('ok');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Running on port ${port}`));
