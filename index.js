const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

class Rpn {
  constructor() {
    this.number = [];
    this.count = 0;
  }
  push(item) {
    this.number[this.count] = item;
    console.log(
      chalk.greenBright.bold.underline(`You Entered Number: ${item}`)
    );
    this.count++;
    return this.count - 1;
  }

  pop() {
    let removedItem = this.number[this.count - 1];
    this.count--;
    return removedItem;
  }
}
// new object. Here is where I want to stack the numbers
const rpn = new Rpn();

//ask user for at least one number
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "value",
      message: "Enter number",
    },
  ]);
}

//Asks the user if he wants to enter another number
function options() {
  return inquirer
    .prompt([
      {
        name: "wants_new_number",
        type: "confirm",
        message: "Do you wish to enter another number?",
      },
    ])
    .then((answer) => {
      if (answer.wants_new_number === true) {
        init();
      } else if (rpn.count >= 2) {
        operators();
      } else {
        console.log("End!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//This function validates if a number was entered or not.
async function init() {
  try {
    const promptFunc = await promptUser();
    let userVal = promptFunc.value;
    if (userVal === "q") {
      console.log("Quit!");
    } else if (isNaN(userVal)) {
      console.log("Please enter a number!");
      init();
    } else {
      rpn.push(Number(userVal)); //Changes from string to Number
      options();
    }
  } catch (err) {
    console.log(err);
  }
}
// This function asks for an operator and does the Math.
function operators() {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "Please select one operator",
        name: "operators",
        choices: ["+", "-", "*", "/"],
      },
    ])
    .then((answer) => {
      if (answer.operators === "+") {
        rpn.push(rpn.pop() + rpn.pop());
      } else if (answer.operators === "-") {
        let min1 = rpn.pop();
        let min2 = rpn.pop();
        rpn.push(min2 - min1);
      } else if (answer.operators === "*") {
        rpn.push(rpn.pop() * rpn.pop());
      } else if (answer.operators === "/") {
        let div1 = rpn.pop();
        let div2 = rpn.pop();
        rpn.push(div2 / div1);
      }
      if (rpn.number.length >= 2) {
        options();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
console.log(
  chalk.yellow(figlet.textSync("RPN Calculator!", { horizontalLayout: "full" }))
);
// Init function starts the calculator.
init();
