// RPN Calculator
var inquirer = require("inquirer");

class Rpn {
  constructor() {
    this.number = [];
    this.count = 0;
  }
  push(element) {
    this.number[this.count] = element;
    console.log(`New Value: ${element}`);
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

//ask user for at least for a number
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "value",
      message: "Enter number",
    },
  ]);
}

//Do you wish to enter another number?
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

//This function starts the process of asking for number and validating that it was a number that was entered.
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
      rpn.push(Number(userVal));
      options();
    }
  } catch (err) {
    console.log(err);
  }
}

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

init();
