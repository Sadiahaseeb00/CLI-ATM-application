#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//Initialize user Balance ans Pin code
let myBalance = 20000;
let myPin = 1414;
//Print welcome message
console.log(chalk.bold.italic.bgGray.blueBright("\t   Welcome to CLI ATM application"));
// pin
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.bold.whiteBright("Enter your pin code"),
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.bold.blueBright("Pin is Correct, Login Succsessfully!"));
    // operation
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.bold.whiteBright("Select your operation:"),
            choices: ["Withdraw Amount", "Fast Cash", "Check Balance"],
        }
    ]);
    //withdraw
    if (operationAns.operation === "Withdraw Amount") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: chalk.bold.whiteBright("Enter the amount to withdraw:"),
            }
        ]);
        if (amountAns.amount > myBalance) {
            console.log(chalk.bold.redBright("Insufficient Balance"));
        }
        // -= 
        else {
            myBalance -= amountAns.amount;
            console.log(chalk.bold.green(`${amountAns.amount} Withdraw Succsessfully! \nYour Remaining Balance is: ${myBalance}`));
        }
    }
    // fast cash
    else if (operationAns.operation === "Fast Cash") {
        let fast = await inquirer.prompt([
            {
                name: "fastcash",
                type: "list",
                message: chalk.bold.whiteBright("Select Amount"),
                choices: [1000, 2000, 5000, 10000, 15000, 25000],
            }
        ]);
        if (fast.fastcash >= myBalance) {
            console.log(chalk.bold.redBright(`Insufficient Balance! Your current balance is: ${myBalance}`));
        }
        else {
            myBalance -= fast.fastcash;
            console.log(chalk.bold.green(`${fast.fastcash} Withdraw Succsessfully! \nYour Remaining Balance is: ${myBalance}`));
        }
    }
    //check balance
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.bold.green(`Your Account Balance is: ${myBalance}`));
    }
}
//incorect pin
else {
    console.log(chalk.bold.redBright("Pin is Incorrect, Try Again!"));
}
