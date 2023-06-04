import { useState } from "react";
import "./Search.css";
import { performSearch } from "../../api/apiCalls";
import { useDispatch } from "react-redux";
import { getSearchAction } from "../../redux/actions";
import blankPhoto from "../../images/blank.webp";
import museum1 from "../../images/museum1.jpg";
import museum2 from "../../images/museum2.webp";
import museum3 from "../../images/museum3.jpg";

export default function Search(props) {
  const [isMinimized, setIsMinimized] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const dispatch = useDispatch();

  const onClickBtn = () => {
    if (!isMinimized) {
      setSearchText("");
      setSearchOption("");
    }

    setIsMinimized(!isMinimized);
  };

  const onClickSearch = async (event) => {
    event.preventDefault();

    const searchInfo = {
      text: searchText,
      option: searchOption,
    };

    // const response = await performSearch(searchInfo);
    // response.data.searchType = searchOption;
    // dispatch(getSearchAction(response.data));

    const user1 = {
      id: 1532,
      image: blankPhoto,
      name: "Oya",
      surname: "Başaran",
      username: "searchresult1",
    };

    const user2 = {
      id: 1422,
      image: blankPhoto,
      name: "Ali",
      surname: "Altan",
      username: "searchresult2",
    };

    let searchResults = [user1, user2];
    searchResults.searchType = "user";

    // const post = {
    //   id: 10,
    //   username: "ooya",
    //   name: "Oya",
    //   surname: "Başaran",
    //   date: "16/04/2027 17:43",
    //   category: "Museum",
    //   tags: "#balon #tatil",
    //   location: "Istanbul",
    //   content: "It is the best museum I've ever seen.",
    //   image: blankPhoto,
    //   postImages: [museum1, museum2, museum3],
    //   comments: [],
    // };

    // const comment1 = {
    //   id: 700,
    //   name: "Ali",
    //   surname: "Candan",
    //   username: "aali",
    //   date: "16/04/2027 17:49",
    //   content: "I agree with you.",
    //   image: blankPhoto,
    // };

    // const comment2 = {
    //   id: 800,
    //   name: "Aliye",
    //   surname: "Camcı",
    //   username: "aaliye",
    //   date: "16/04/2027 17:56",
    //   content: "It's not that great.",
    //   image: blankPhoto,
    // };

    // post.comments.push(comment1, comment2);

    // const post1 = {
    //   id: 20,
    //   username: "ooya",
    //   name: "Oya",
    //   surname: "Başaran",
    //   date: "16/04/2027 17:44",
    //   category: "Museum",
    //   tags: "#balon #tatil",
    //   location: "Istanbul",
    //   content: "It is the best museum I've ever seen.",
    //   image: blankPhoto,
    //   postImages: [museum1, museum2, museum3],
    //   comments: [],
    // };

    // const comment3 = {
    //   id: 400,
    //   name: "Ali",
    //   surname: "Candan",
    //   username: "aali",
    //   date: "16/04/2027 17:49",
    //   content: "I agree with you.",
    //   image: blankPhoto,
    // };

    // const comment4 = {
    //   id: 500,
    //   name: "Aliye",
    //   surname: "Camcı",
    //   username: "aaliye",
    //   date: "16/04/2027 17:56",
    //   content: "It's not that great.",
    //   image: blankPhoto,
    // };

    // post1.comments.push(comment3, comment4);
    // let searchResults = [post, post1];
    // searchResults.searchType = "post";
    dispatch(getSearchAction(searchResults));
    props.push("/search");
  };

  let search = (
    <form className="my-search">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        onChange={(event) => setSearchText(event.target.value)}
      />
      <span className="my-search-text">Search in:</span>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="search-option"
          id="users"
          onChange={(event) => setSearchOption("user")}
        />
        <label
          className="form-check-label"
          htmlFor="users"
        >
          Users
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="search-option"
          id="posts"
          onChange={(event) => setSearchOption("post")}
        />
        <label
          className="form-check-label"
          htmlFor="posts"
        >
          Posts
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="search-option"
          id="locations"
          onChange={(event) => setSearchOption("location")}
        />
        <label
          className="form-check-label"
          htmlFor="locations"
        >
          Locations
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="search-option"
          id="tags"
          onChange={(event) => setSearchOption("tag")}
        />
        <label
          className="form-check-label"
          htmlFor="tags"
        >
          Tags
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="search-option"
          id="categories"
          onChange={(event) => setSearchOption("category")}
        />
        <label
          className="form-check-label"
          htmlFor="categories"
        >
          Categories
        </label>
      </div>
      <button
        className="btn btn-primary mt-3"
        onClick={onClickSearch}
        style={{ fontWeight: 500 }}
      >
        Search
      </button>
      <button
        className="btn btn-primary my-search-btn"
        onClick={onClickBtn}
      >
        <i className="fa-solid fa-angle-down"></i>
      </button>
    </form>
  );

  if (isMinimized) {
    search = (
      <button
        className="btn btn-primary my-search-btn-minimized"
        onClick={onClickBtn}
      >
        <i className="fa-solid fa-angle-up"></i>
      </button>
    );
  }

  return <>{search}</>;
}
