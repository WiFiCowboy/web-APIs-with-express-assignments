const express = require("express");
const morgan = require("morgan");
// app object has methods for routing HTTP request, configure middleware, etc.
const app = express();
// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan("dev"));

app.get("/greetings", (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if (!name) {
    //3. name was not provided
    return res.status(400).send("Please provide a name");
  }

  if (!race) {
    //3. race was not provided
    return res.status(400).send("Please provide a race");
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response
  res.send(greeting);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end();
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
  Base URL: ${req.baseUrl}
  Host: ${req.hostname}
  Path: ${req.path}
  Method: ${req.method}
  Query: ${req.query}
  `;
  res.send(responseText);
});

//This is the final request handler
app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});
//This is the final request handler
app.get("/pizza/pepperoni", (req, res) => {
  res.send("Your pizza is on the way!");
});
//This is the final request handler
app.get("/pizza/pineapple", (req, res) => {
  res.send("We dont serve that here. Never call again!");
});

app.get("/", (req, res) => {
  res.send("connected to the matrix");
});
// assignment 1
app.get("/sum", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if (!a) {
    return res.status(400).send("Please provide a");
  }
  if (!b) {
    return res.status(400).send("Please provide b");
  }

  const c = parseInt(a) + parseInt(b);

  const sum = `The sum of ${a} and ${b} is ${c}`;

  res.send(sum);
});

// assignment 2
app.get("/cipher", (req, res) => {
  const texty = req.query.texty;
  const shifty = req.query.shifty;

  if (!texty) {
    return res.status(400).send("Please provide text");
  }
  if (!shifty) {
    return res.status(400).send("Please provide shift");
  }

  let arr = [];

  let arr2 = [];

  for (let i = 0; i < texty.length; i++) {
    arr.push(texty.charCodeAt(i));
  }

  let arr1 = arr.map(x => x + parseInt(shifty));

  for (let i = 0; i < arr1.length; i++) {
    arr2.push(String.fromCharCode(arr1[i]));
  }

  const arr3 = arr2.join("");
  res.send(arr3);
});
//  assignment 3
app.get("/lotto", (req, res) => {
  const numbers = req.query.numbers;
  // numbers accepts 6 distinct numbers between 1 through 20
  if (!numbers) {
    return res.status(400).send("Need to input some numbers");
  }
  if (numbers.length < 6) {
    return res.status(400).send("Need to input 6 numbers");
  }
  // working on check for same numbers
  // const checkNumbers = numbers.map(num => {
  //   numbers.every(num)
  // })
  // checkNumbers();
  res.send(numbers);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
