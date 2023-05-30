import "./HomePage.css";
import { useSelector } from "react-redux";
import FriendsList from "../../components/FriendsList/FriendsList.jsx";
import Search from "../../components/Search/Search.jsx";
import PostContainer from "../../components/PostContainer/PostContainer.jsx";

export default function HomePage(props) {
  const { isLoggedIn } = useSelector((store) => store);

  let homePage = (
    <div className="my-homepage">
      <p className="my-homepage-text">
        Wanderlust is a social media platform for sharing travel experiences.
        Join now to discover your next travel location!
      </p>
    </div>
  );

  if (isLoggedIn) {
    homePage = (
      <>
        <Search push={props.history.push} />
        <PostContainer />
        <FriendsList />
      </>
    );
  }

  return <>{homePage}</>;
}
