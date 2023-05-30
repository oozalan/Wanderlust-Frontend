import "./Comment.css";

export default function Comment(props) {
  const { info } = props;

  return (
    <div className="my-comment-container">
      <div className="my-comment-header">
        <img
          className="my-comment-image"
          src={info.image}
        />
        <span>
          {info.name} {info.surname}
        </span>
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
