
module.exports = (MovieDB) => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/

  router.get('/movies', async (req, res) => {
    const movies = await MovieDB.getMovies();
    res.json(movies);
  });
  router.get('/movies/:id', async (req, res) => {
    const movie = await MovieDB.getMovie(req.params.id);
    res.json(movie);
  });
  router.post("/movies/:id/addReview", async (req,res) =>{
    const addReview = req.body.text;
    const name = req.body.name
    const getMovieById = req.params.id;
    const addSRating = req.body.sRating;
    const movie = await MovieDB.createReview(addReview, name, getMovieById,addSRating);
    res.json(movie);
  });
  router.post("/movies/:id/addRating", async (req, res) =>{
    const getMovieById = req.params.id;
    const addRating = req.body.rating;
    const rating = await MovieDB.createRating(addRating, getMovieById);
    res.json(rating);
  })
  router.post("/addMovie", async (req, res) =>{
    const title = req.body.title;
    const description = req.body.description;
    const genre = req.body.genre;
    const release = req.body.release;
    const createMovie = await MovieDB.createMovie(title,description,genre,release);
    res.json(createMovie)
  })

 
  return router;
}
