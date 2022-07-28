var express = require('express')
var router = express.Router()
var Recipe = require('./recipe.schema.js')
var cors = require('cors')
const { wordpressScrape, allrecipesScrape, generalScrape } = require('./scrapers')


router.use(cors())

//create
router.post('/',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE, OPTIONS');
  Recipe.create(req.body, (err, result)=>{
    if (err) console.log(err)
    res.json(result)
  })
})

//read
router.get('/',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE, OPTIONS');
  Recipe.find((err, result)=>{
    if (err) console.log(err)
    res.json(result)
  })
})

//read single recipe
router.get('/:id',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
  Recipe.findById(req.params.id,(err, result)=>{
    if (err) console.log(err)
    res.json(result)
  })
})

//update
router.put('/:id',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
  Recipe.findByIdAndUpdate(req.params.id, req.body, (err, result)=>{
    if (err) console.log(err)
    res.json(result)
  })
})

//delete
router.delete('/:id',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
  Recipe.findByIdAndRemove(req.params.id, (err, result)=>{
    if (err) console.log(err)
    res.json(result)
  })
})


router.post('/import', async (req, res) => {
  const url = req.body.url
  if (url) {
      const recipe = await scrapeData(url)
      res.json(recipe)
  }
});

async function scrapeData(url) {
  let recipe = {}
  try {
      const { data } = await axios.get(url);

      const $ = cheerio.load(data);

      const siteType = ($('head').text())

      if (siteType.includes('wordpress')) {
          recipe = wordpressScrape($)
      } else if (siteType.includes('allrecipes')) {
          console.log("allrecies")
      }
      else {
          generalScrape()
      }
  } catch (error) {
      throw error;
  }
  return recipe
};

module.exports = router