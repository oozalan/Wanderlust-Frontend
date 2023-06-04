import { useDispatch } from "react-redux";
import "./Comment.css";
import { getUserPageAction } from "../../redux/actions";

export default function Comment(props) {
  const { info } = props;
  const dispatch = useDispatch();

  const onClickCommenter = () => {
    dispatch(getUserPageAction(info.userId));
    props.push(`/user/${info.username}`);
  };

  return (
    <div className="my-comment-container">
      <div className="my-comment-header">
        <div
          onClick={onClickCommenter}
          style={{ cursor: "pointer" }}
        >
          <img
            className="my-comment-image"
            src={info.image}
          />
          <span>
            {info.name} {info.surname}
          </span>
        </div>
        <span className="my-comment-date">{info.date}</span>
      </div>
      <p
        className="my-comment-content"
        style={{ marginLeft: "0.4rem" }}
      >
        {info.content}
      </p>
    </div>
  );
}
