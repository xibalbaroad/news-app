import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../AC';
import './style.css';

class CommentForm extends Component {
    state = {
      user: '',
      text: '',
    };

    getClassName = (type) => {
      const checkMin = this.state[type].length < limits[type].min;
      return (this.state[type].length && checkMin ? 'input-error' : '');
    };

    handleChange = type => (event) => {
      const { value } = event.target;
      if (value.length > limits[type].max) return;
      this.setState({
        [type]: event.target.value,
      });
    }

    addComment = (event) => {
      event.preventDefault();
      this.props.addComment(this.state, this.props.articleId);
      this.setState({
        user: '',
        text: '',
      });
    }

    render() {
      return (
        <form className="comment-form" onSubmit={this.addComment}>
          <div className="comment-form-username">
            <span>User name:</span>
            <input
              value={this.state.user}
              onChange={this.handleChange('user')}
              className={this.getClassName('user')}
            />
          </div>
          <div className="comment-form-text">
            Comment:
            <textarea
              rows="5"
              cols="50"
              value={this.state.text}
              onChange={this.handleChange('text')}
              className={this.getClassName('text')}
            />
          </div>
          <input
            className="comment-form-btn btn"
            type="submit"
            value="Submit"
          />
        </form>
      );
    }
}


const limits = {
  user: {
    min: 5,
    max: 15,
  },
  text: {
    min: 10,
    max: 50,
  },
};

export default connect(null, { addComment })(CommentForm);
