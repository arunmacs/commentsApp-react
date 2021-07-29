import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInputValue: '',
    commentInputValue: '',
    commentsData: [],
  }

  updateInputField = event => {
    this.setState({nameInputValue: event.target.value})
  }

  updateCommentField = event => {
    this.setState({commentInputValue: event.target.value})
  }

  submitFormResponse = event => {
    event.preventDefault()
    const {nameInputValue, commentInputValue} = this.state
    const color = this.getRandomColor()

    const commentData = {
      id: uuidv4(),
      userName: nameInputValue,
      comment: commentInputValue,
      commentedAgo: formatDistanceToNow(new Date()),
      isLiked: false,
      colorFill: color,
    }
    this.setState(prevState => ({
      commentsData: [...prevState.commentsData, commentData],
      nameInputValue: '',
      commentInputValue: '',
    }))
  }

  toggleLikeStatus = id => {
    this.setState(prevState => ({
      commentsData: prevState.commentsData.map(item => {
        if (id === item.id) {
          return {...item, isLiked: !item.isLiked}
        }
        return item
      }),
    }))
  }

  deleteComment = id => {
    this.setState(prevState => ({
      commentsData: prevState.commentsData.filter(item => id !== item.id),
    }))
  }

  getRandomColor = () => {
    const randomIndex = Math.ceil(Math.random() * 6)
    const fillColor = initialContainerBackgroundClassNames[randomIndex]

    return fillColor
  }

  renderFormContainer = () => {
    const {nameInputValue, commentInputValue} = this.state

    return (
      <form onSubmit={this.submitFormResponse}>
        <input
          type="text"
          value={nameInputValue}
          onChange={this.updateInputField}
          className="input-field"
          placeholder="Your Name"
        />
        <textarea
          rows="7"
          cols="30"
          value={commentInputValue}
          onChange={this.updateCommentField}
          className="text-area-field"
          placeholder="Your Comment"
        />
        <button type="submit" className="comment-button">
          Add Comment
        </button>
      </form>
    )
  }

  renderContentContainer = () => (
    <div className="content-container">
      <div className="container">
        <h1 className="heading">Comments</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
          alt="comments"
          className="comment-img-mobile"
        />
        <p className="comment-caption">Say something about 4.0 Technologies</p>
        {this.renderFormContainer()}
      </div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
        alt="comments"
        className="comment-img-desktop"
      />
    </div>
  )

  render() {
    const {commentsData} = this.state
    console.log(commentsData)

    return (
      <div className="app-body">
        {this.renderContentContainer()}
        <div className="comments-section">
          <p className="comments-title">
            <span className="comments-count">{commentsData.length}</span>
            Comments
          </p>
          <ul className="comments-items-list">
            {commentsData.map(item => (
              <CommentItem
                commentItem={item}
                toggleLikeStatus={this.toggleLikeStatus}
                deleteComment={this.deleteComment}
                key={item.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
