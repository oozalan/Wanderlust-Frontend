import "./Post.css";
import { useState } from "react";
import Comment from "../Comment/Comment.jsx";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCommentApi } from "../../api/apiCalls";
import { getUserPageAction } from "../../redux/actions";

export default function Post(props) {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [isAddCommentVisible, setIsAddCommentVisible] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const { id: userId } = useSelector((store) => store);
  const { info } = props;
  const dispatch = useDispatch();

  const comments = info.comments.map((comment) => (
    <Comment
      key={comment.id}
      info={comment}
      push={props.push}
    />
  ));

  const onClickPoster = () => {
    dispatch(getUserPageAction(info.userId));
    props.push(`/user/${info.username}`);
  };

  const onClickComment = () => {
    if (isCommentsVisible) {
      setCommentContent("");
      setIsAddCommentVisible(false);
    }

    setIsCommentsVisible(!isCommentsVisible);
  };

  let postImages;

  if (info.postImages.length == 1) {
    postImages = (
      <div>
        <img
          className="my-post-picture"
          src={info.postImages[0]}
        />
      </div>
    );
  } else if (info.postImages.length > 1) {
    postImages = (
      <Carousel interval={null}>
        {info.postImages.map((postImage) => {
          return (
            <Carousel.Item key={postImage}>
              <img
                className="my-post-picture"
                src={postImage}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }

  const onExpandAddComment = (event) => {
    event.preventDefault();
    setIsAddCommentVisible(true);
  };

  const onClickCancel = (event) => {
    event.preventDefault();
    setCommentContent("");
    setIsAddCommentVisible(false);
  };

  const onClickAddComment = (event) => {
    event.preventDefault();

    let date = new Date();
    date = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    console.log(date);

    const commentInfo = {
      userId,
      commentContent,
      date,
    };

    addCommentApi({ commentInfo, postId: info.id });
  };

  let addComment = (
    <div className="add-comment-wrapper">
      <textarea
        rows="1"
        placeholder="Click here to comment."
        className="form-control add-comment-minimized"
        value={commentContent}
        readOnly
        onClick={onExpandAddComment}
      ></textarea>
    </div>
  );

  if (isAddCommentVisible) {
    addComment = (
      <div className="add-comment-wrapper">
        <textarea
          rows="2"
          placeholder="Type your comment here."
          className="form-control add-comment"
          onChange={(event) => setCommentContent(event.target.value)}
        ></textarea>
        <button
          className="btn btn-primary btn-sm"
          style={{ marginTop: "0.5rem", fontWeight: 500 }}
          onClick={onClickAddComment}
        >
          Comment
        </button>
        <button
          className="btn btn-primary btn-sm"
          style={{ marginLeft: "0.5rem", marginTop: "0.5rem", fontWeight: 500 }}
          onClick={onClickCancel}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="my-post">
      <div className="my-post-inner-wrapper">
        <div className="my-post-header">
          <div
            onClick={onClickPoster}
            style={{ cursor: "pointer" }}
          >
            <img
              className="my-post-image"
              src={info.image}
            />
            <span>
              {info.name} {info.surname}
            </span>
          </div>
          <span className="my-post-date">{info.date}</span>
        </div>
        <div className="my-post-info">
          <span className="my-post-category">
            <i className="fa-solid fa-landmark"></i> {info.category}
          </span>
          <span>
            <i className="fa-solid fa-location-crosshairs"></i> {info.location}
          </span>
        </div>
        <p className="my-post-content">{info.content}</p>
        <p className="my-post-tag">{info.tags}</p>
        {postImages}
        <div>
          <button
            className="btn btn-primary btn-sm my-post-like"
            style={{ fontWeight: 500 }}
          >
            Like
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={onClickComment}
            style={{ fontWeight: 500 }}
          >
            Comments
          </button>
        </div>
      </div>
      {isCommentsVisible && (
        <>
          <div className="my-post-comments-container">{comments}</div>
          {addComment}
        </>
      )}
    </div>
  );
}
