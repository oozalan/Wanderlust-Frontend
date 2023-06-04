import { useDispatch } from "react-redux";
import "./User.css";
import { getUserPageAction } from "../../redux/actions";

export default function User(props) {
  const { userInfo: user } = props;
  const dispatch = useDispatch();

  const onClickUser = () => {
    dispatch(getUserPageAction(user.id));
    props.push(`/user/${user.username}`);
  };

  return (
    <div
      className="my-user"
      onClick={onClickUser}
      style={{ cursor: "pointer" }}
    >
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
