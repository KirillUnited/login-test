import React, { Component } from 'react';
/** display comments list */

class List extends Component {
    render() {
        const comments = this.props.data.map((comment, index) => {
            return (
                <div className="media" key={index}>
                    {this.props.handleDelete &&
                        <button type="button" className="close" aria-label="Close" onClick={this.props.handleDelete.bind(null, index)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    }
                    <div className="media-left media-middle">
                        <img src={comment.avatar} alt="avatar" className="media-object" width="64px" height="64px" />
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">{comment.author}</h4>
                        <p className="media-text">{comment.msg}</p>
                        <small>{comment.date}</small>
                    </div>
                </div>
            );
        });
        return comments;
    }
}

export default List;