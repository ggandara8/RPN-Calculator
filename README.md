![RPN Calculator](/assets/RPN-title-img.jpg)

## Description

This is a CLI RPN Calculator built using Javascript and Nodejs. It uses the [inquirer](https://www.npmjs.com/package/inquirer) package for an interactive command line user interface and class to create a stack data structure for the creation of my own push and pop method.

I utilized the inquirer command line user interface to receive the user numbers and those are pushed into the stack (array). The user can keep adding numbers to the stack and when the user wants to use an operator he can pick one of the 4 and at this moment the pop method is utilized to remove the last two items in the stack to do the math and the value of that operation will be pushed to the stack.

## Installation

To install necessary dependencies, run the following command: npm install

## Start

node index.js

## Future Development

For future development I would add an option to do exponential notation where the user can indicate to what power the base will be raised to. This solution could be used to built an rpn calculator app.

## Author

Gerardo Gandara
