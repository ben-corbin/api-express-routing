const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

const data = require("./data");


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/users", (req, res) => {
  res.json({users: data.users});
})

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = data.users.find(user => user.id === id)
  res.send({user: user});
})

app.post("/users", (req, res) => {
    console.log('in post users body is', req.body);
    const newUser = {
      id: data.users.length+1,
      email: req.body.email
    }
    data.users.push(newUser);
    res.json({user: newUser});
})


app.get('/films', (req, res) => {
  const director = req.query.director;
  if (director) {
    res.json(films.filter(film => film.director === director));
  } else {
    res.json({film: films});
  }
});

app.get("/films/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const film = data.films.find(film => film.id === id)
  res.send({film: film});
})

app.post("/films", (req, res) => {
    const newFilm = {
      id: data.films.length+1,
      title: req.body.title,
      director: req.body.director
    }
    data.films.push(newFilm);
    res.json({film: newFilm});
})

app.get("/books", (req, res) => {
  res.json({books: data.books});
})

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = data.books.find(book => book.id === id)
  res.send({book: book});
})

app.post("/films", (req, res) => {
    const newBook = {
      id: data.books.length+1,
      title: req.body.title,
      type: req.body.type,
      author: req.body.author
    }
    data.books.push(newBook);
    res.json({book: newBook});
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
