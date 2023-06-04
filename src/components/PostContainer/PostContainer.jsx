import "./PostContainer.css";
import blankPhoto from "../../images/blank.webp";
import Post from "../Post/Post";
import museum1 from "../../images/museum1.jpg";
import museum2 from "../../images/museum2.webp";
import museum3 from "../../images/museum3.jpg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFriendsPosts } from "../../api/apiCalls.js";
import CreatePost from "../CreatePost/CreatePost";

export default function PostContainer(props) {
  const [posts, setPosts] = useState([]);
  const { id } = useSelector((store) => store);

  useEffect(() => {
    // const response = getFriendsPosts({id});
    // setPosts(response.data);

    const post = {
      id: 10,
      userId: 50530,
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
      userId: 163242,
      name: "Ali",
      surname: "Candan",
      username: "aali",
      date: "16/04/2027 17:49",
      content: "I agree with you.",
      image: blankPhoto,
    };

    const comment2 = {
      id: 800,
      userId: 75621,
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
      userId: 232323,
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
      userId: 2111212,
      name: "Ali",
      surname: "Candan",
      username: "aali",
      date: "16/04/2027 17:49",
      content: "I agree with you.",
      image: blankPhoto,
    };

    const comment4 = {
      id: 500,
      userId: 23424342,
      name: "Aliye",
      surname: "Camcı",
      username: "aaliye",
      date: "16/04/2027 17:56",
      content: "It's not that great.",
      image: blankPhoto,
    };

    post1.comments.push(comment3, comment4);
    setPosts([post, post1]);
  }, []);

  return (
    <div className="my-post-container">
      <CreatePost />
      {posts.map((mypost) => (
        <Post
          key={mypost.id}
          info={mypost}
          push={props.push}
        />
      ))}
    </div>
  );
}
