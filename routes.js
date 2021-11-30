var express = require('express')
var router = express.Router()
var Recipe = require('./recipe.schema.js')

//create
router.post('/',(req,res)=>{
  Recipe.create(req.body, (err, result)=>{
    if (err) console.log(err)
    res.json(result)
  })
})

//read
router.get('/',(req,res)=>{
  Recipe.find((err, result)=>{
    if (err) console.log(err)
    res.json(result)
  })
})

//read single recipe
router.get('/:id',(req,res)=>{
  Recipe.findById(req.params.id,(err, result)=>{
    if (err) console.log(err)
    res.json(result)
  })
})

//update
router.put('/:id',(req,res)=>{
  Recipe.findByIdAndUpdate(req.params.id, req.body, (err, result)=>{
    if (err) console.log(err)
    res.json(result)
  })
})

//delete
router.delete('/:id',(req,res)=>{
  Recipe.findByIdAndRemove(req.params.id, (err, result)=>{
    if (err) console.log(err)
    res.json(result)
  })
})

module.exports = router