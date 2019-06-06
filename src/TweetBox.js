import React, { Component } from 'react';

class TweetBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            auth_token: '5bcd9623fb6fc060274aace1',
            user_posts: [],
            user_followers: [],
            postImg: '',
            comment: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    getData = () => {
        fetch('api/users/' + this.state.auth_token)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    user: json,
                    user_posts: json.posts,
                    user_followers: json.followers
                });
            });
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
        let userData = { id: this.state.auth_token, img: this.state.postImg, comment: this.state.comment };

        if (this.state.comment !== '') {
            return new Promise((resolve, reject) => {
                fetch('api/users', {
                    method: 'PUT',
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

        for (let i = 0; i < form.elements.length; i++) {
            form.elements[i].value = '';
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const USER = this.state.user;
        const USER_POSTS = this.state.user_posts;
        const USER_FOLLOWERS = this.state.user_followers;

        if (!USER) return <div>Loading...</div>;
        console.log(USER_POSTS);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="card">
                            <img src={USER.avatarImageURL} alt="avatar" className="card-img-top" />
                            <div className="card-body">
                                <h4 className="card-title">{USER.name}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <form name="FORM_TWEET" className="well clearfix" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="">Comment</label>
                                <textarea className="form-control" name="comment" id="comment" onChange={this.handleChange}></textarea>
                            </div>
                            <button className="btn btn-primary pull-right">Publish</button>
                            <label type="button" className="btn btn-default pull-right">
                                {this.state.photoAdded ? "✓ Photo Added" : "Add Photo"}
                                <input type="file" name="FILE" id="" hidden onChange={this.onFileUpload} />
                            </label>
                        </form>
                        {USER_POSTS.map((post, index) => {
                            return (
                                <div className="media" key={index}>
                                    <div className="media-left media-middle">
                                        <img src={post.img} alt="img" className="media-object" width="64px" height="64px" />
                                    </div>
                                    <div className="media-body">
                                        <p className="media-text">{post.body}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-sm-3">
                        <h4>Followers</h4>
                        {USER_FOLLOWERS && USER_FOLLOWERS.map((follower, index) => {
                            return (
                                <div className="media" key={index}>
                                    <div className="media-left media-middle">
                                        <img src={follower.imgURL} alt="avatar" className="media-object" width="64px" height="64px" />
                                    </div>
                                    <div className="media-body">
                                        <h4 className="media-heading">{follower.name}</h4>
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

export default TweetBox;
