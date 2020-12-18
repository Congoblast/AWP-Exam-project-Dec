import React, {} from 'react';
import AddReview from "./AddReview"
import AuthService from './AuthService' 
const authService = new AuthService();

function MoviePage(props) {
  const {id, getMovie} = props;
  const data = getMovie(id)
  

    //Load the data async, so it wont crash.
    let content = <p>Loading</p>
    if(data){
      //Load reviews
      let reviewList = data.review.map(review =>
        <ul>
        <li key={review._id}><p>{review.text}</p><p> Date added: {review.date}</p></li></ul>
      );
        
      //if the user is logged in, then we will get the addreview module 
      let loginContent = <AddReview path="/"addReview={props.addReview} getMovie={getMovie} addRating={props.addRating} id={data._id}></AddReview>

      //if not logged in, show message
      if (!authService.loggedIn()) {
        loginContent = <p>Please log in to add a review</p> ;
      } 
      content =
      <>
      <h1>{data.title}</h1>
  <p>Description: {data.description}</p>
  <p>Genre: {data.genre}</p>
  <p>Release date:{data.release}</p>
  <p>Reviews:<ul>{reviewList}</ul></p>
  {loginContent}
      </>
    }
  
return(
  <>
   {content}
   </>
);
}
export default MoviePage;