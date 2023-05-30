import "./User.css";

export default function User(props) {
  const { userInfo: user } = props;

  return (
    <div className="my-user">
      <img
        src={user.image}
        className="my-user-image"
      />
      <span>
        {user.name} {user.surname}
      </span>
    </div>
  );
}
