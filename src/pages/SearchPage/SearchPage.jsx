import { useSelector } from "react-redux";
import User from "../../components/User/User";
import "./SearchPage.css";
import Post from "../../components/Post/Post";

export default function SearchPage(props) {
  const { searchResults } = useSelector((store) => store);

  let results;

  if (searchResults.searchType == "user") {
    results = searchResults.map((user) => (
      <User
        key={user.id}
        userInfo={user}
        push={props.history.push}
      />
    ));
  } else {
    results = searchResults.map((post) => (
      <Post
        key={post.id}
        info={post}
        push={props.history.push}
      />
    ));
  }

  return (
    <div className="my-search-page">
      <h2 className="my-search-page-header">Search Results</h2>
      <div className="my-search-page-content">{results}</div>
    </div>
  );
}
