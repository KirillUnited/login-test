import React, { Component } from 'react';
import Account from './Account';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    /** service */
    postData = (type, userData) => {
        // const BASE_URL = 'https://api.thewallscript.com/restful/'; // apiServer
        //let BASE_URL = 'http://localhost/PHP/';
        const BASE_URL = 'https://jsonplaceholder.typicode.com';

        return new Promise((resolve, reject) => {
            fetch(BASE_URL + type, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.json())
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    login = (e) => {
        e.preventDefault();

        let endPoint = '/posts'; // - API call endpoint

        if (this.state.email && this.state.password) {
            this.postData(endPoint, this.state).then((result) => {
                console.log(result);
            });
        }
    }

    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <input name="email" type="email" className="form-control" id="email" placeholder="Enter email" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <input name="password" type="password" className="form-control" id="password" placeholder="Enter password" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.login}>Submit</button>
                </form>
                <Account></Account>
            </div>
        );
    }
}

export default Login;
