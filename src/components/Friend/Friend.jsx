import { getUserPageAction } from "../../redux/actions";
import "./Friend.css";
import { useDispatch } from "react-redux";

export default function Friend(props) {
  const { name, surname, username, image, id } = props.info;
  const dispatch = useDispatch();

  const onClickFriend = () => {
    dispatch(getUserPageAction(id));
    props.push(`/user/${username}`);
  };

  return (
    <div
      className="my-friend"
      onClick={onClickFriend}
    >
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
