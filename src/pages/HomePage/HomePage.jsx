import "./HomePage.css";
import travelPhoto from "../../images/travel.jpg";
import { useSelector } from "react-redux";
import FriendsList from "../../components/FriendsList/FriendsList.jsx";

export default function HomePage() {
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
    homePage = <FriendsList />;
  }

  return <>{homePage}</>;
}
