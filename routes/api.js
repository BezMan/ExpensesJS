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

  exp.save().then(function (exp) { //save new expense to the DB, use promise for callback
    console.log(`You spent ${exp.amount} shekels in ${exp.name} on ${exp.date}`);
    res.end()
  })

})

//not necessary to define params, just get them from req.body
router.put('/update', function (req, res) {
  let group1 = req.body.group1
  let group2 = req.body.group2
  Expense.findOneAndUpdate(
    { group: group1 },
    { group: group2 },
    { new: true },
    function (err, result) {
      console.log(`changed ${result.name} from group ${group1} to ${group2}`)
      res.send(`changed ${result.name} from group ${group1} to ${group2}`)
    })
})


router.get('/expenses/:group', function (req, res) {
  let group = req.params.group
  // Expense.find({ group: group }, function (err, expenses) {
  // console.log(expenses)
  // })
  Expense.aggregate([
    { $match: { group: group } },
    {
      $group: {
        _id: group,
        total: { $sum: "$amount" }
      }
    }
  ],
    function (err, result) {
      console.log("You spent " + result[0].total + " in " + group);
      res.send("end cycle")
    })
    
})



module.exports = router