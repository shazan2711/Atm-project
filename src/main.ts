#! usr/bin/env node
import inquirer from "inquirer";

let myBalance = 10000; // Dollars
let pinCode = 2711;

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    message: "Enter your PIN Code:",
    type: "number",
  },
]);

if (pinAnswer.pin === pinCode) {
  console.log("Access Granted");

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      message: "Please select an option:",
      type: "list",
      choices: [
        "Withdraw",
        "Balance",
        "Fast Cash",
        "Exit"
      ],
    },
  ]);

  if (operationAns.operation === "Withdraw") {
    let amountAns = await inquirer.prompt([
      {
        name: "amount",
        message: "Enter the amount to withdraw:",
        type: "number",
      }
    ]);

    if (amountAns.amount <= myBalance) {
      // Assignment operator for balance adjustment
      myBalance -= amountAns.amount;
      console.log("Your remaining balance is: " + myBalance);
    } else {
      console.log("Insufficient funds.");
    }
  } else if (operationAns.operation === "Balance") {
    console.log("Your remaining balance is: " + myBalance);
  } else if (operationAns.operation === "Fast Cash") {
    let fastCashOptions = await inquirer.prompt([
      {
        name: "fastCash",
        message: "Select fast cash amount:",
        type: "list",
        choices: [
          "1000",
          "2000",
          "5000",
          "10000"
        ],
      },
    ]);

    let selectedAmount = parseInt(fastCashOptions.fastCash);
    if (selectedAmount <= myBalance) {
      myBalance -= selectedAmount;
      console.log("Dispensing $" + selectedAmount);
      console.log("Your remaining balance is: " + myBalance);
    } else {
      console.log("Insufficient funds.");
    }
  }
} else {
  console.log("Access Denied");
}
