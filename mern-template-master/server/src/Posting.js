import React, { Component } from 'react';
import axios from 'axios';
export class Posting extends Component {
constructor(props) {
    super(props)
    this.state = {
        ingredients:'',
        title:'',
        description:'',
    }
}
changeHandler = (e) =>
{
    this.setState({[e.target.name]: e.target.value})
}
submitHandler = e => {
    e.preventDefault()
    console.log(this.state )
    axios.post('https://krdo-cooking-api.herokuapp.com/api/cooking', this.state)
    .then(response =>{
        console.log(response)
    })
    .catch (error =>{
        console.log(error)
    }) 
}
     render() {
         const{ingredients, title, description} = this.state
        return (
            <div>
<form onSubmit={this.submitHandler}>
    <div>
        <input type ="text" name ="ingredients" value={ingredients} onChange={this.changeHandler} />
    </div>
    <div>
        <input type ="text" name ="title" value={title} onChange={this.changeHandler}/>
    </div>
    <div>
        <input type ="text" name ="description" value={description} onChange={this.changeHandler}/>
    </div>
    <button type = "submit"> submit</button>
</form>
            </div>
        )
    }
}

export default Posting;;
