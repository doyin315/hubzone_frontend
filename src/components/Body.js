import React, { Component } from 'react';
import "./../styles/App.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Landing from './Landing';
import Header from './Header';

export default class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            conPassword: "",
            phone: "", 
            Username: "",
            Password: "",
            logged: false,
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    onSignSubmit = (e) => {
        console.log("here");
        e.preventDefault();
        const user = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            conPassword: this.state.conPassword,
            phone: this.state.phone,
        }

        axios.post(`http://localhost:1338/signup`, user)
            .then(res => {
                if (res.data.success === false) {
                    console.log(res.data.message);
                    alert(res.data.message);
                }else{
                    alert("Sign Up Sucessful");
                }
            })

    } 
    onLogSubmit = (e) => {
        e.preventDefault();
        const user = {
            username: this.state.Username,
            password: this.state.Password,
        };
        const self = this
        axios.post(`http://localhost:1338/signin`, user)
            .then(res => {
                if (res.data.status === "OK") {
                    localStorage.setItem("userid", res.data.userid);
                    localStorage.setItem("username", res.data.username);
                    self.setState({
                        logged: !this.state.logged,
                    })
                } else {
                    alert(res.data.message);
                }
            })
    
    }
    render() {
        if(this.state.logged){
            return (
                <Redirect to={"/landing"} Component={Landing}/>
            );
            }
        return (
            <div class='mainb'>
                <Header title="Let's organize your hobbies for you"/>
                <div className="grid">
                    <div className="right">
                        <div className="login">
                            <h2>Login</h2>
                            <form onSubmit={this.onLogSubmit}>
                                <input name="Username"
                                    placeholder="Username"
                                    value={this.state.Username}
                                    onChange={e => this.change(e)}
                                    className="inputext"
                                    required
                                /><br />

                                <input name="Password"
                                    type="Password"
                                    placeholder="Password"
                                    value={this.state.Password}
                                    onChange={e => this.change(e)}
                                    className="inputext"
                                    required
                                /><br />

                                <button type="submit" className="bodbut">Login</button>
                            </form>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <div>
                            <h2>Sign Up</h2>
                            <form onSubmit={this.onSignSubmit}>
                                <input name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={e => this.change(e)}
                                    className="inputext"
                                    required
                                /><br />

                                <input name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={e => this.change(e)}
                                    className="inputext"
                                    required
                                /><br />
                                <input name="password"
                                    type="Password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={e => this.change(e)}
                                    className="inputext"
                                    required
                                /><br />
                                <input name="conPassword"
                                    type="Password"
                                    placeholder="Confrim Your Password"
                                    value={this.state.conPassword}
                                    onChange={e => this.change(e)}
                                    className="inputext"
                                    required
                                /><br />
                                <input name="phone"
                                    type="tel"
                                    placeholder="Phone number"
                                    value={this.state.phone}
                                    onChange={e => this.change(e)}
                                    className="inputext"
                                    required
                                /><br />

                                <button type="submit" className="bodbut">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}