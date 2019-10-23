//l1YlRZqD0ZCln3Nu

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Recipe = require('./models/recipe');

const app = express();

mongoose.connect('mongodb+srv://newAdmin:l1YlRZqD0ZCln3Nu@cluster0-exee0.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected successfully to MongoDB Atlass!')
  }).catch((error) => {
    console.log('Unable to connect to MongoDB!');
    console.log(error);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/api/recipes', (req, res, next) => {
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    difficulty: req.body.difficulty,
    time: req.body.time
  });

  Recipe.save().then(() => {
    res.status(201).json({message: 'Post save successfully!'})
  })
  .catch((error) => {
    res.status(400).json({error: error});
  });
});

app.put('/api/recipes:id', (req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
  });

  Recipe.updateOne({_id: req.body.id}, recipe).then(() => {
    res.status(201).json({
      message: "Recipe Updated successfully!"
    });
  }).catch((error) => {
    res.status(400).json({error: error});
  });
});

app.delete('/api/recipes:id', (req, res, next) => {
  Recipe.deleteOne({_id: req.body.id}).then(() => {
    res.status(201).json({message: 'Deleted successfully!'});
  }).catch((error) => {
    res.status(400).json({error: error});
  });
});

app.get('/api/recipes:id', (req, res, next) => {
  Recipe.findOne({
    _id: req.body.id
  }).then((recipe) => {
    res.status(201).json(recipe);
  }).catch((error) => {
    res.status(400).json({error: error});
  });
});

app.use('/api/recipes', (req, res, next) => {
  Recipe.find().then((recipes) => {
    res.status(201).json(recipes);
  }).catch((error) => {
    res.status(400).json({error: error});
  });
  
});



module.exports = app;