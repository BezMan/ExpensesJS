const express = require('express')
const router = express.Router()
// const request = require('request')
const Expense = require("../models/Expense")
const moment = require('moment')


router.get('/expenses', function (req, res) {
  //seems we must use .exec to actually use the results//
  //sorting results by the most recent date:
  Expense.find({}).sort({ date: -1 }).exec(function (err, expenses) {
    res.send(expenses)
  })
})


router.post('/new', function (req, res) {
  var body = req.body

  var exp = new Expense({
    name: body.item,
    amount: body.amount,
    date: body.date ? moment(body.date).format('LLLL') : new Date(), // if exists then format, else insert new Date()
    group: body.group,
  });

  exp.save(); //save new expense to the DB


  //just some helper logs:
  Expense.find({ name: exp.name }).exec(function (err, expenses) {
    console.log(expenses);
    Expense.count({}).exec(function (err, expenses) {
      console.log(expenses);

      res.send("done")
    })
  })
})


module.exports = router