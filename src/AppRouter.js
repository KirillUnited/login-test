import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import TweetBox from './TweetBox';
import ExitIcon from "./iconfinder_exit_3855614.svg"


const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? (
            <a href="true" style={{ cursor: "pointer", whiteSpace: "nowrap" }}
                onClick={(e) => {
                    e.preventDefault();
                    fakeAuth.signout(() => history.push("/"));
                }}
            >
                Sign out
                <img src={ExitIcon} alt="icon" width="18px" height="18px" style={{ margin: "0 5px", verticalAlign: "bottom" }} />
            </a>
        ) : (
                <div className="auth alert alert-warning" href="false">You are not Sign In.</div>
            )
);

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
        />
    );
}

function NoMatch({ location }) {
    return (
        <div className="container text-center">
            <h3>
                404 Error
            </h3>
            <p>
                Page <code>{location.pathname}</code> Not Found
            </p>
        </div>
    );
}


class Login extends Component {
    state = {
        auth_token: '5bcd9623fb6fc060274aace1',
        username: '',
        password: '',
        redirectToReferrer: false
    };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // login = (e) => {
    //     e.preventDefault();

    //     let endPoint = '/posts'; // - API call endpoint

    //     if (this.state.email && this.state.password) {
    //         this.postData(endPoint, this.state).then((result) => {
    //             console.log(result);
    //         });
    //     }
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.username && this.state.password) {

            fetch('api/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => {
                    if (json) {
                        this.login();
                    } else {
                        console.log('error');
                    }
                })
        }
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div className="container">
                <div className="row">
                    <div className="alert alert-info col-12">user: 'roy', pswd: '123'</div>
                    <form className="col-sm-4 col-sm-push-4">
                        <h3>Sign In</h3>
                        <div className="form-group input-group">
                            <span className="input-group-addon" id="basic-addon1">@</span>
                            <input className="form-control" placeholder="Username" aria-describedby="basic-addon1" name="username" onChange={this.handleChange} />
                        </div>
                        <div className="form-group input-group">
                            <span className="input-group-addon" id="basic-addon2">
                                <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
                            </span>
                            <input className="form-control" placeholder="Password" aria-describedby="basic-addon2" name="password" onChange={this.handleChange} />
                        </div>
                        <button onClick={this.handleSubmit} className="btn btn-primary" disabled="">Log In</button>
                    </form>
                </div>
            </div>
        );
    }
}

class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-default">
                        <div className="container">
                            <ul className="nav navbar-nav">
                                <li>
                                    <Link to="/">TWEETBOX</Link>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <AuthButton />
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <Switch>
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/" component={TweetBox} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default AppRouter;