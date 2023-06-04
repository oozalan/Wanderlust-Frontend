import "./FriendsList.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Friend from "../Friend/Friend.jsx";
import blankPhoto from "../../images/blank.webp";
import { getFriends } from "../../api/apiCalls";

export default function FriendsList(props) {
  const [friends, setFriends] = useState([]);
  const [isMinimized, setIsMinimized] = useState(true);
  const { id } = useSelector((store) => store);

  const onClickBtn = () => setIsMinimized(!isMinimized);

  useEffect(() => {
    // TODO: Connection with backend
    // const response = await getFriends({id});
    // setFriends(response.data);

    let friends = [];
    friends[0] = {
      id: 1800,
      username: "ooya",
      name: "Oya",
      surname: "Başaran",
      image: blankPhoto,
    };

    friends[1] = {
      id: 1600,
      username: "aali",
      name: "Ali",
      surname: "Altan",
      image: blankPhoto,
    };

    setFriends(friends);
  }, []);

  let friendsList = (
    <div className="my-friends-list">
      {friends.map((friend) => (
        <Friend
          key={friend.username}
          info={friend}
          push={props.push}
        />
      ))}
      <button
        className="btn btn-primary my-friends-list-btn"
        onClick={onClickBtn}
      >
        <i className="fa-solid fa-angle-down"></i>
      </button>
    </div>
  );

  if (isMinimized) {
    friendsList = (
      <button
        className="btn btn-primary my-friends-list-btn-minimized"
        onClick={onClickBtn}
      >
        <i className="fa-solid fa-angle-up"></i>
      </button>
    );
  }

  return <>{friendsList}</>;
}
