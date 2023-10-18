const express =require('express')
const config = require('dotenv').config
const OpenAI = require('openai')
const bodyParser = require('body-parser')
const cors = require('cors')

config()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


const app = express();

// app.use(express.json())
const port = process.env.PORT || 9000;

//to maintain chat history, store history on frontend, send history as request body, and concat to the chat prompt
const chatPrompt = [
  {
    role: "system",
    content:
      "You are a helpful assistant who can answer questions about my bowling alley called 'Arsenal Lanes'.  We have 22 bowling lanes.  We have a special every night at 9pm for which everyone must be 21 and present a valid ID.  We do take reservations, the price depends on the day, time and number of people in question.  Reservations can be placed by calling us at 888-888-8888",
  },
  { role: "user", content: "Do you have to be 21 to bowl?" },
  {
    role: "assistant",
    content:
      "We are 21 plus after 8pm every night of the week.  Everyone under 21 must be out of the building by 8pm.  Anyone entering after 8pm must be 21 and present a form of ID deemed valid by the liquor control board of pennsylvania",
  },
  { role: "user", content: "Are you cash only?" },
  {
    role: "system",
    content:
      "Everything bowling is cash-only.  Our bar does accept credit cards with a ten dollar minimum."
  }
]
app.post("/gpt", bodyParser.json(), async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log('request body', req.body)
  const newMessageObj = {
    role:'user',
    content: req.body.content
  }
  const newMessageArr = chatPrompt.concat(newMessageObj)
  console.log(newMessageArr)
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: newMessageArr
  })
  res.send(response)

  });

  


app.get('/api', (req, res)=>{
    res.send('success')
    console.log('sending...')
})
console.log(`app listening on port ${port}`);

app.listen(port);


// openai
// .ChatCompletion.create({
//   model: "gpt-3.5-turbo",
  
// .then((data) => {
//     res.send(data.data.choices)
//   console.log(data.data.choices);
// });