import React, { Component } from 'react';
import axios from "axios";
import Header from './Header';
import Layout from './Layout';
import "./../styles/App.css";
import { Redirect, NavLink } from "react-router-dom"; 


export default class Landing extends Component {
    constructor(props) {    
        super(props);
        this.state = {
            hobbies: [],
            addhobby:"",
            userid:"",
            logged: false,
            username:"",
        }
    }
    change = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    componentDidMount(){
        const userid = localStorage.getItem("userid")
        const username = localStorage.getItem("username")
        this.setState({userid:userid,username:username})
        console.log(userid);
        axios.post(`http://localhost:1338/gethobbies`, {
            userid
        })
        .then(res =>{
            const hobbies = res.data.gottenHobbies;
            this.setState({hobbies});
        })  
    }
    onAddSubmit = (e) => {
        e.preventDefault();
        const hobbbby = {
            userid : this.state.userid,
            hobby :  this.state.addhobby
        }
        if (this.state.addhobby==="") {
            
        }else{
            axios.post(`http://localhost:1338/placehobbies/`, { hobbbby })
                .then(res => {
                    if (res.data.success === false) {
                        console.log(res.data.message);
                        alert(res.data.message);
                    } else {
                        window.location.reload();
                    }
                })
        }
        
    }
    delete = (id) => (e) => {
        axios.delete(`http://localhost:1338/hobbies/${id}`)
        window.location.reload();
    }
    logout(){
        console.log("Here")
        // localStorage.;
    }
    render() {
        if (this.state.logged) {
            return(
                <Redirect to={"/"} Component={Layout} />
            )
        }
        return (
            <div> 
                <div>
                    <Header title = {this.state.username} logout = "true" />
                </div>
                <div className = "content">
                    <form onSubmit={this.onAddSubmit}>
                        <input name="addhobby"
                            placeholder="Add Hobby"
                            value={this.state.addhobby}
                            onChange={e => this.change(e)}
                            className="addtext"
                        /><br/>
                        <button type="submit" className="bodbut">Add Hobby</button>
                    </form>
                </div>
                <div>
                    {this.state.hobbies.map(e => (
                        <div>
                            <div className="hobbies">
                                {e.hobby}
                                <button className="delbut" onClick={this.delete(e.id)} >Delete </button>
                            </div>
                            
                        </div>
                    ))}
                </div>
                <NavLink className="nav" to="/" exact><span onClick={this.logout}>Logout</span></NavLink>
            </div>
        )}
}

