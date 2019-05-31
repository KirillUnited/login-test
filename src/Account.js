import React, { Component } from 'react';
import './App.css';
import List from './List';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: 'anonymous',
            text: '',
            photoAdded: false,
            imgUrl: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    remainingCharacters = () => {
        return 140 - this.state.text.length;
    }

    overflowAlert = () => {
        if (this.remainingCharacters() < 0) {
            return (
                <div className="alert alert-warning">
                    <strong>Oops! Too Long</strong>
                </div>
            );
        } else {
            return '';
        }
    }

    handleDelete = (index) => {
        let new_data = this.state.data.filter((item, i) => {
            return i !== index
        });

        this.setState({
            data: new_data
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

        const form = document.forms.FORM_TWEET;
        const elem_author = form.elements.AUTHOR;

        this.setState({
            text: '',
            photoAdded: false,
            imgUrl: '',
            data: [...this.state.data,
            {
                author: (elem_author.value === '') ? this.state.author : elem_author.value,
                msg: this.state.text,
                date: Date(),
                avatar: (this.state.imgUrl === '') ? this.state.defaultImgUrl : this.state.imgUrl
            }
            ]
        });

        for (let i = 0; i < form.elements.length; i++) {
            form.elements[i].value = '';
        }
    }

    render() {
        return (
            <div className="container">
                <form name="FORM_TWEET" className="well clearfix" onSubmit={this.onSubmit}>
                    {this.overflowAlert()}
                    <div className="form-group">
                        <label for="">Title</label>
                        <input type="text" className="form-control" name="AUTHOR" id="" aria-describedby="helpId" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label for="">Comment *</label>
                        <textarea className="form-control" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label for="">Avatar</label>
                        {/* <LoadedImg photoAdded={this.state.photoAdded} imgURL={this.state.imgUrl} /> */}
                    </div>
                    <p>* - required</p>
                    <span className={(this.remainingCharacters() < 0) ? "is_invalid" : undefined}>Remaining Characters: {this.remainingCharacters()}</span>
                    <button className="btn btn-primary pull-right" disabled={this.remainingCharacters() === 140 || this.remainingCharacters() < 0}>Tweet</button>
                    <label type="button" className="btn btn-default pull-right">
                        {this.state.photoAdded ? "✓ Photo Added" : "Add Photo"}
                        <input type="file" name="FILE" id="" hidden onChange={this.onFileUpload} />
                    </label>
                </form>
                <List data={this.state.data} handleDelete={this.handleDelete} />
            </div>
        );
    }
}

export default Account;
