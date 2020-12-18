import React, { useState } from 'react';
function AddReview(props) {
    
    const [text, setInput] = useState("");

    //Check how many times the ratings are made
    const [ratingsCount, setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const {id, getMovie} = props;
    const data = getMovie(id);

    //The text input
function onChange(event){
    setInput(event.target.value);
}

    //Do no not allow the counter to be over 10
function stopCount(){
    if (ratingsCount <10)
    setCount(ratingsCount+1)
}

    // Stop the counter so it wont go minus
function stopCountMinus(){
    if (ratingsCount >0)
    setCount(ratingsCount-1)
}

    //If the rating is over 0, which means a rating is given, then insert the rating
function onClick(){
    if (ratingsCount >0){
    props.addRating(ratingsCount,props.id);
    setTotalCount(totalCount + parseInt(ratingsCount))
  } 
  //If the input field is empty, then dont insert it. 
  if (text.length === 0)
  console.log("No rating given") 
  else{
    props.addReview(text, props.id)
}}

    //Create the ratings to be shown
let ratingList = data.rating.map(rating => 
    
      <li key={rating._id}><p>{rating.rating}</p></li>
    )

    //Value to calculate the average rating
    
    const average = totalCount/ratingList.length;
    return (
        <>
            <p>Total Number of Ratings:{ratingList.length}</p>
            <p>Average rating {average} </p>
            <h1 >Add A Review: </h1>
            <button type="button" onClick={stopCount} value={ratingsCount}> + </button> 
            <button type="button" onClick={stopCountMinus} value={ratingsCount}> - </button>               
            <p>Rating: {ratingsCount}</p>
            <input style={{width:"470px", height:"170px"}} type="text" placeholder="text" value={text} onChange={onChange} />
            <br />
            <button onClick={onClick}>Submit Review</button>  
        </>
    );
}

export default AddReview;