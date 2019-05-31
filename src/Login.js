import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
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

    onFileUpload = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                photoAdded: true,
                imgUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }

    onSubmit = (e) => {
        e.preventDefault();

        let form = document.forms.FORM_TWEET;
        let endPoint = '/posts'; // - API call endpoint

        if (this.state.COMMENT) {
            this.postData(endPoint, this.state).then((result) => {
                console.log(result);
            });
        }

        for (let i = 0; i < form.elements.length; i++) {
            form.elements[i].value = '';
        }
    }

    componentDidMount() {
        const BASE_USERS_URL = 'https://randomuser.me/api/?inc&results=8&nat=gb';
        const BASE_POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

        Promise.all([
            fetch(BASE_USERS_URL),
            fetch(BASE_POSTS_URL)
        ]).then(([users, posts]) => {
            users.json().then(data => {
                this.setState({ users: data.results });
            });
            posts.json().then(data => {
                this.setState({ posts: data });
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        const POSTS = this.state.posts;
        const USERS = this.state.users;

        if (!POSTS) return <div>Loading...</div>;
        return (
            <div className="container">
                {/* <form>
                    <div className="form-group">
                        <input name="email" type="email" className="form-control" id="email" placeholder="Enter email" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <input name="password" type="password" className="form-control" id="password" placeholder="Enter password" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.login}>Submit</button>
                </form> */}
                <div className="row">
                    <div className="col-sm-4">
                        <h4>USER</h4>
                        <div className="media">
                            <div className="media-left media-middle">
                                <img src={USERS[0].picture.thumbnail} alt="avatar" className="media-object" width="64px" height="64px" />
                            </div>
                            <div className="media-body">
                                <h4 className="media-heading">{USERS[0].name.first}</h4>
                                <p className="media-text">{USERS[0].name.first}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <form name="FORM_TWEET" className="well clearfix" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="">Comment</label>
                                <textarea className="form-control" name="COMMENT" id="COMMENT" onChange={this.handleChange}></textarea>
                            </div>
                            <button className="btn btn-primary pull-right">Publish</button>
                            <label type="button" className="btn btn-default pull-right">
                                {this.state.photoAdded ? "✓ Photo Added" : "Add Photo"}
                                <input type="file" name="FILE" id="" hidden onChange={this.onFileUpload} />
                            </label>
                        </form>
                        {POSTS.map((post, index) => {
                            return (
                                <div className="media" key={index}>
                                    <div className="media-body">
                                        <h4 className="media-heading">{post.title}</h4>
                                        <p className="media-text">{post.body}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-sm-4">
                        <h4>Members</h4>
                        {USERS.map((user, index) => {
                            return (
                                <div className="media" key={index}>
                                    <div className="media-left media-middle">
                                        <img src={user.picture.thumbnail} alt="avatar" className="media-object" width="64px" height="64px" />
                                    </div>
                                    <div className="media-body">
                                        <h4 className="media-heading">{user.name.first}</h4>
                                        <p className="media-text">{user.name.last}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
