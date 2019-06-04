import React, { Component } from 'react';
import Login from './TweetBox';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="App">
                <Login></Login>
            </div>
        );
    }
}

export default App;