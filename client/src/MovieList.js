import React, {} from 'react';
import { Link } from '@reach/router';
import AddMovie from "./AddMovie"
function MovieList(props) {
  let movies = props.movies;
  //Get the list of movies and link them according to id
  let mapFunction = getid =>
    <Link to={`/movies/${getid._id}`} key={getid._id}>
      <li>{getid.title}</li>  
    </Link>;

    
    let movieList = movies.map(mapFunction);

//Show the moves
    return (
      <>
        <h1>Movies</h1>
        <ul>
    <li key={movies._id}>{movieList}</li></ul>
    <AddMovie path="/" addMovie={props.addMovie}>yo</AddMovie>

      </>
    );
  }
  
  export default MovieList;