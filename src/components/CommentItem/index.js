import './index.css'

const likedImage =
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
const likeImage =
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

const deleteImage =
  'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png'

const CommentItem = props => {
  const {commentItem, toggleLikeStatus, deleteComment} = props
  const {id, userName, comment, commentedAgo, isLiked, colorFill} = commentItem

  const getUserInitialLetter = () => userName.slice(0, 1).toUpperCase()

  const likeStatusImg = isLiked ? likedImage : likeImage
  const likeText = isLiked ? 'liked' : 'like'

  const changeLikeStatus = () => {
    toggleLikeStatus(id)
  }

  const onClickDeleteComment = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="username-time-container">
        <p className={`user-initial ${colorFill}`}>{getUserInitialLetter()}</p>
        <h1 className="user-name">{userName}</h1>
        <p className="time-ago">{commentedAgo}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="like-delete-container">
        <div className="like-container">
          <button
            type="button"
            onClick={changeLikeStatus}
            className="like-delete-button"
          >
            <img src={likeStatusImg} alt="like" className="like-delete-img" />
          </button>
          <span className={`like-text ${likeText}`}>Like</span>
        </div>
        <button
          type="button"
          testid="delete"
          onClick={onClickDeleteComment}
          className="like-delete-button"
        >
          <img src={deleteImage} alt="delete" className="like-delete-img" />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
