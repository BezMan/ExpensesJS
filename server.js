const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Expense = require("./models/Expense")

const api = require('./routes/api')
const expenses = require("./expenses")


mongoose.connect("mongodb://localhost/Expenses")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//parser middleware must be setup before the route definitions//
app.use('/', api)

// console.log("\n\n"+ expenses.length +"\n\n");


//inserted the json data to the our DB//
// for (var i = 0; i < expenses.length; i++) {
//     var exp = new Expense({
//         name: expenses[i].item,
//         amount: expenses[i].amount,
//         date: expenses[i].date,
//         group: expenses[i].group,
      
//     });
//     exp.save();
// }


let port = 3000
app.listen(port, function () {
    console.log("the server is running on port:" + port)
})
