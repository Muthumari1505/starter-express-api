const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 6060;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  
  // console.log(JSON.parse(JSON.stringify(req.body))[0].prevState,"subject");
    
  if(JSON.parse(JSON.stringify(req.body)) !== {} && (JSON.parse(JSON.stringify(req.body))[0] ? JSON.parse(JSON.stringify(req.body))[0].prevState.createdBy === '119027000170853017':false)){
    try {
      const response = await axios.post('https://cliq.zoho.com/api/v2/channelsbyname/uibuildstoqa/message?zapikey=1001.ddbb61d82fba2eb8de1f61ce073cc0c5.5d4eba8ac3c86965c3c59d4cc736755f', {
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
    console.log("else")
  }
});

// Start server
app.listen(process.env.PORT || PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
})