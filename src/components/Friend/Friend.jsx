import "./Friend.css";

export default function Friend(props) {
  const { name, surname, image } = props.info;
  return (
    <div className="my-friend">
      <img
        className="my-friend-photo"
        src={image}
        alt={name}
      />
      <span>
        {name} {surname}
      </span>
    </div>
  );
}
