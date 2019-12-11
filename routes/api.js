const express = require('express')
const router = express.Router()
// const request = require('request')
const Expense = require("../models/Expense")


router.get('/expenses', function (req, res) {
  //seems we must use .exec to actually use the results//
  //sorting results by the most recent date:
  Expense.find({}).sort({ date: -1 }).exec(function (err, expenses) {
      res.send(expenses)
  })
})


module.exports = router