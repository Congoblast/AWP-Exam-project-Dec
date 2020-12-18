import {Router} from '@reach/router';
import AuthService from "./AuthService";
import Login from "./Login";
import LoginPage from"./LoginPage";
import MovieList from './MovieList';
import MoviePage from './MoviePage';
import AddMovie from "./AddMovie";
import Nav from "./Nav";
import React, {useEffect, useState} from 'react';
import { PromiseProvider } from 'mongoose';
const API_URL = process.env.REACT_APP_API;
const authService = new AuthService(`${API_URL}/users/authenticate`);

function App() {
  const [movie, setData] = useState([]);
  const [reviewCount, setReviewCount] = useState(0)
  //Sort alphabeticly
  function compare(a, b) {
    if (a.title > b.title) return 1;
    else return -1;
  }
  
  useEffect(() => {
    async function getData () {
      const url = `${API_URL}/movies`;
      const response = await authService.fetch(url);
      const data = await response.json();
      setData(data.sort(compare));
    }
    getData();
  }, [reviewCount]); 

  //Get the id of the movie
function getMovie(id){
  const conect = movie.find(movieId => movieId._id === id);
  return conect;
}

//addreview text to db
async function addReview(text, getMovieById) {
  const newReview ={
    text:text,
  };
  const url = `${API_URL}/movies/${getMovieById}/addReview`;
  const response = await fetch(url, {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview),
  });
  setReviewCount(reviewCount +1)
  await response.json()
 
}
//post the rating to db
async function addRating(rating,getMovieById){
  const newRating ={
    rating:rating,
  };
  const url = `${API_URL}/movies/${getMovieById}/addRating`;
  const response = await fetch(url,{
    method: "POST",
    headers:{"content-Type": "application/json"},
    body: JSON.stringify(newRating),
  });
  setReviewCount(reviewCount +1)
  await response.json()
}
async function addMovie(title, description, genre, release){
  const newMovie ={
    title: title,
    description: description,
    genre:genre,
    release:release,
  };
  const url = `${API_URL}/addMovie`;
  const response = await fetch(url,{
    method: "POST",
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(newMovie),
  });
   await response.json()
  setReviewCount(reviewCount +1)
}

//Logout function, 
async function logout(){
  try{
     await authService.logout();
      setReviewCount(reviewCount +1)
  }catch(error){
      console.log("Error message:",error)
  }
}
//Show content if logged in
let loginContent = <div> <p>You are logged in</p><button onClick={logout}>Logout</button></div>

//if not then dont 
  if (!authService.loggedIn()) {
    loginContent = <div></div>;
  } 

  return (
    <>
<Nav/>
{loginContent}
    <Router>
    <Login path="/login">Login</Login>
   <LoginPage path="/LoginPage"></LoginPage>
   <MovieList path="/" movies={movie} addMovie={addMovie}>{movie._id} </MovieList>
   <MoviePage path="/movies/:id" addRating={addRating} addReview={addReview} getMovie={getMovie}></MoviePage>    
     </Router>
    </>
  );
}

export default App;
