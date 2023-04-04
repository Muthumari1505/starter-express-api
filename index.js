const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 6060;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  
  // console.log(JSON.parse(JSON.stringify(req.body))[0].prevState,"subject");
    
  if(JSON.parse(JSON.stringify(req.body)) !== {} && false){
    try {
      const response = await axios.post('https://cliq.zoho.com/api/v2/channelsbyname/apitestingb/message?zapikey=1001.8690e3b26a53b3f3a879853428de4d3f.d6f77b0e08b607fe39a18273b241ae82', {
        text: '```' + `QA Ticket ID:  #${JSON.parse(JSON.stringify(req.body))[0].prevState.ticketNumber}
Subject: ${JSON.parse(JSON.stringify(req.body))[0].prevState.subject}
RN: ${JSON.parse(JSON.stringify(req.body))[0].prevState.customFields["Release notes URL"]}` + '```'
      });
      console.log('Message sent to Zoho Cliq:');
    } catch (error) {
      console.error('Error sending message to Zoho Cliq:', error);
    }
     res.sendStatus(200);
  }
  else{
    res.sendStatus(200);
  }
});

// Start server
app.listen(process.env.PORT || PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
})