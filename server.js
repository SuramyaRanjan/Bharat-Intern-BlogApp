const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const articlesRouter = require('./routes/articles');
const Article = require('./models/atricle'); 

const app = express();

mongoose.connect('mongodb://localhost/suramRdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); 

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('articles/index', { articles: articles });
});

app.use('/articles', articlesRouter);

const PORT = 8500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






















