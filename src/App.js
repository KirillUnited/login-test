import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
        this.login = this.login.bind(this);
        this.change = this.change.bind(this);
    }
    change = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    login = (event) => {
        event.preventDefault();
        const BASE_URL = 'https://jsonplaceholder.typicode.com';

        fetch(BASE_URL + '/users').then(res => res.json()).then(json => {
            if (json[0].email == this.state.email) {
                console.log('success');
            } else {
                console.log('fail');
            }
        });
    }
    render() {
        return (
            <div className="App">
                <form>
                    <div className="form-group">
                        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.change} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.login}>Submit</button>
                </form>
            </div>
        );
    }
}

export default App;
