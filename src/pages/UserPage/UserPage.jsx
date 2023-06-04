import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./UserPage.css";
import blankPhoto from "../../images/blank.webp";
import User from "../../components/User/User";
import Post from "../../components/Post/Post";
import museum1 from "../../images/museum1.jpg";
import museum2 from "../../images/museum2.webp";
import museum3 from "../../images/museum3.jpg";
import { addFriend, removeFriend } from "../../api/apiCalls";

export default function UserPage(props) {
  const [name, setName] = useState("Oya");
  const [surname, setSurname] = useState("Başaran");
  const [username, setUsername] = useState("oozalan");
  const [profilePhoto, setProfilePhoto] = useState(blankPhoto);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [displayedInfo, setDisplayedInfo] = useState("posts");
  const { id, displayedUserId } = useSelector((store) => store);
  const store = useSelector((store) => store);

  useEffect(() => {
    // const response = await getUserInfo(displayedUserId);
    // TODO: Set all the states with response data
    console.log("Hello");

    const post = {
      id: 10,
      username: "ooya",
      name: "Oya",
      surname: "Başaran",
      date: "16/04/2027 17:43",
      category: "Museum",
      tags: "#balon #tatil",
      location: "Istanbul",
      content: "It is the best museum I've ever seen.",
      image: blankPhoto,
      postImages: [museum1, museum2, museum3],
      comments: [],
    };

    const comment1 = {
      id: 700,
      name: "Ali",
      surname: "Candan",
      username: "aali",
      date: "16/04/2027 17:49",
      content: "I agree with you.",
      image: blankPhoto,
    };

    const comment2 = {
      id: 800,
      name: "Aliye",
      surname: "Camcı",
      username: "aaliye",
      date: "16/04/2027 17:56",
      content: "It's not that great.",
      image: blankPhoto,
    };

    post.comments.push(comment1, comment2);

    const post1 = {
      id: 20,
      username: "ooya",
      name: "Oya",
      surname: "Başaran",
      date: "16/04/2027 17:44",
      category: "Museum",
      tags: "#balon #tatil",
      location: "Istanbul",
      content: "It is the best museum I've ever seen.",
      image: blankPhoto,
      postImages: [museum1, museum2, museum3],
      comments: [],
    };

    const comment3 = {
      id: 400,
      name: "Ali",
      surname: "Candan",
      username: "aali",
      date: "16/04/2027 17:49",
      content: "I agree with you.",
      image: blankPhoto,
    };

    const comment4 = {
      id: 500,
      name: "Aliye",
      surname: "Camcı",
      username: "aaliye",
      date: "16/04/2027 17:56",
      content: "It's not that great.",
      image: blankPhoto,
    };

    post1.comments.push(comment3, comment4);

    const user1 = {
      id: 1532,
      image: blankPhoto,
      name: "Oya",
      surname: "Başaran",
      username: "user1",
    };

    const user2 = {
      id: 1422,
      image: blankPhoto,
      name: "Ali",
      surname: "Altan",
      username: "user2",
    };

    setPosts([post, post1]);
    setFriends([user1, user2]);
  }, [displayedUserId]);

  const onClickAddFriend = async () => {
    const senderId = id;
    const receiverId = displayedUserId;
    await addFriend({ senderId, receiverId });
    setFriends([
      ...friends,
      {
        id: store.id,
        name: store.name,
        surname: store.surname,
        username: store.username,
        image: store.image,
      },
    ]);
  };

  const onClickRemoveFriend = async () => {
    const senderId = id;
    const removedFriendId = displayedUserId;
    await removeFriend({ senderId, removedFriendId });
    let newFriends = [...friends];

    for (let i = 0; i < newFriends.length; i++) {
      if (newFriends[i].id == id) {
        newFriends.splice(i, 1);
        break;
      }
    }

    setFriends[newFriends];
  };

  let friendshipButton = <></>;
  if (id != displayedUserId) {
    let isFriend = false;

    for (let i = 0; i < friends.length; i++) {
      if (id == friends[i].id) {
        isFriend = true;
        break;
      }
    }

    if (isFriend) {
      friendshipButton = (
        <button
          className="btn btn-primary"
          style={{ fontWeight: 500 }}
          onClick={onClickRemoveFriend}
        >
          Remove Friend
        </button>
      );
    } else {
      friendshipButton = (
        <button
          className="btn btn-primary"
          style={{ fontWeight: 500 }}
          onClick={onClickAddFriend}
        >
          Add Friend
        </button>
      );
    }
  }

  let content;
  if (displayedInfo == "friends") {
    content = friends.map((user) => (
      <User
        key={user.id}
        userInfo={user}
        push={props.history.push}
      />
    ));
  } else {
    content = posts.map((post) => (
      <Post
        key={post.id}
        info={post}
        push={props.history.push}
      />
    ));
  }

  return (
    <div className="my-userpage">
      <div className="my-userpage-user">
        <img
          className="my-userpage-profile-photo"
          src={profilePhoto}
        />
        <span>
          {name} {surname}
        </span>
        <span className="my-userpage-username">{username}</span>
        {friendshipButton}
      </div>
      <div className="my-userpage-content">
        <div className="my-userpage-control">
          <button
            className="btn btn-primary"
            style={{ fontWeight: 500 }}
            onClick={() => setDisplayedInfo("posts")}
          >
            Posts
          </button>
          <button
            className="btn btn-primary"
            style={{ fontWeight: 500, marginLeft: "0.5rem" }}
            onClick={() => setDisplayedInfo("friends")}
          >
            Friends
          </button>
          {content}
        </div>
      </div>
    </div>
  );
}
