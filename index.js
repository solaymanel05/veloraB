const express = require("express");
//mongodb+srv://solaymanel673_db_user:<db_password>@veloradb.ldsupiq.mongodb.net/?appName=veloraDB
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://solaymanel673_db_user:aZdz8pNTGXtOvE9E@veloradb.ldsupiq.mongodb.net/?appName=veloraDB"
  )
  .then(() => {
    console.log("Connecting Successfuly")
  })
  .catch((error) => {
    console.log("Error in connecting ",error)
  });
app.use(express.json());

const Article = require("./models/Article")


// =======  ARTICLES ENDPOINT  =======
app.post("/article", async (req,res) => {
  const newArticle = new Article()
  const artTitle = req.body.titleArticle
  const artPrice = req.body.priceArticle
  const artCategory = req.body.categoryArticle
  newArticle.title = artTitle
  newArticle.price = artPrice
  newArticle.category = artCategory

  await newArticle.save()
 res.json(newArticle)
})

app.get("/article/:articleId" , async (req,res) => {
  // const articles = await Article.find()
  const id = req.params.articleId
  try{
   const article = await Article.findById(id)
   res.json(article)
   return
  }catch(error){
    console.log("error not found correct",id)
    return res.send("error")
   
  }
   
  
})

app.delete("/article/:articleId" , async (req,res) => {
  // const articles = await Article.find()
  const id = req.params.articleId
  try{
   const article = await Article.findByIdAndDelete(id)
   res.json(article)
   return
  }catch(error){
    console.log("error not found correct",id)
    return res.send("error")
   
  }
   
  
})
app.get("/allArticles",async (req, res) => {
  const articles = await Article.find()
  res.render("articles.ejs", {
    allArticles: articles,
   });
});

app.post("/delete/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/Allarticles") // or your page route
  } catch (err) {
    res.status(500).send(err.message)
  }
})



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get("/velora", (req, res) => {
  res.render("products.ejs", {
    name: "velora",
  });
});

//Ex
app.get("/numbers", (req, res) => {
  let number = "";
  for (let i = 0; i <= 100; i++) {
    number += i + "-";
  }
  res.send(` numbers is ${number}`);
});

app.get("/products/:one/:two", (req, res) => {
  const numOne = req.params.one;
  const numTwo = req.params.two;
  const totall = Number(numOne) + Number(numTwo);
  res.send(`totall general ${totall}`);
});

// POST
app.post("/products", (req, res) => {
  res.send("Product created");
});

// PUT
app.put("/products/:id", (req, res) => {
  res.send(`Product ${req.params.id} updated`);
});

// DELETE
app.delete("/products/:id", (req, res) => {
  res.send(`Product ${req.params.id} deleted`);
});

app.get("/sayhello", (req, res) => {
  // console.log(req.body.age)
  // res.send(`Name is ${req.body.name} Age is ${req.query.age}`)
  res.json({
    name: req.body.name,
    age: req.query.age,
    price: "'55£",
    languge: "arabic",
  });
});

app.listen(3000, () => console.log("API running..."));
