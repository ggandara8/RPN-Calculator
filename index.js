// RPN Calculator
// 1- Insert 1st and 2nd value and save it in stack
// 2- Give options to pick one of the operators and end the math operation (+, -, *, /) or enter another number
// 3- If one of the operators is chosen show the result and then give
// option to start a new math problem or end the program,
// if the user chooses to enter another number then show option 2 again.
//

var inquirer = require("inquirer");
//creating a class object
class Rpn {
  constructor() {
    this.number = [];
  }
  push(element) {
    console.log(`${element} was pushed to stack`);
    return element;
  }
}
// new object. Here is where I want to stack the numbers
const rpn = new Rpn();

//ask user for at least first 2 numbers...
function promptUser() {
  return inquirer.prompt([
    {
      type: "number",
      name: "value",
      message: "Enter number",
    },
  ]);
}

//for 3rd number and after
function options() {
  return inquirer.prompt([
    {
      type: "list",
      message: "Do you wish to enter another number?",
      name: "options",
      choices: ["yes", "no"],
    },
  ]);
}

async function init1() {
  const promptFunc = await promptUser();
  let userVal = promptFunc.value;
  if (isNaN(userVal)) {
    console.log("Please enter a number!");
    init1();
  } else {
    rpn.push(userVal);
    init2();
  }
}
init1();

async function init2() {
  const promptFunc = await promptUser();
  let userVal = promptFunc.value;
  if (isNaN(userVal)) {
    console.log("Please enter a number!");
    init1();
  } else {
    rpn.push(userVal);
  }
}
