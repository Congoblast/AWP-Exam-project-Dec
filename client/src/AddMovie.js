import React, { useState } from 'react';
import AuthService from "./AuthService";
const API_URL = process.env.REACT_APP_API;

const authService = new AuthService(`${API_URL}/users/authenticate`);

function AddMovie(props){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [release, setRelease] = useState("");
    const [genre, SetGenre] = useState("");

function onClick(){
    if (title.length !== 0)
    props.addMovie(title,description,genre,release);
}


let loginContent = <div><h2>Add a movie</h2>
        
<p>Title:</p><input type="text" placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
<p>Description</p><input type="text" placeholder="Description" onChange={(event) => setDescription(event.target.value)} />
<p>Genre</p><input type="text" placeholder="Genre" onChange={(event) => SetGenre(event.target.value)} />
<p>Release</p><input type="text" placeholder="Release" onChange={(event) => setRelease(event.target.value)} />

<button onClick={(onClick)}>Add</button></div>
if (!authService.loggedIn()) {
    loginContent = <div>Please log in to add more movies</div>
}
    return(
        <>
        {loginContent}
        

        </>
    );
}
export default AddMovie;