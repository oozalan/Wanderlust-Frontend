import "./FriendsList.css";
import React from "react";
import { connect } from "react-redux";
import Friend from "../Friend/Friend.jsx";
import ali from "../../images/ali.jpg";
import oya from "../../images/oya.jpg";

class FriendsList extends React.Component {
  state = {
    friends: [],
    isMinimized: false,
  };

  onClickBtn = () => {
    this.setState({
      isMinimized: !this.state.isMinimized,
    });
  };

  async componentDidMount() {
    // const response = await getFriends(this.props.username);
    // this.setState({
    //   friends: response.data,
    // });

    let friends = [];
    friends[0] = {
      username: "ooya",
      name: "Oya",
      surname: "Başaran",
      image: oya,
    };

    friends[1] = {
      username: "aali",
      name: "Ali",
      surname: "Altan",
      image: ali,
    };

    this.setState({
      friends,
    });
  }

  render() {
    let friendsList = (
      <div className="my-friends-list">
        {this.state.friends.map((friend) => (
          <Friend
            key={friend.username}
            info={friend}
          />
        ))}
        <button
          className="my-friends-list-btn"
          onClick={this.onClickBtn}
        >
          <i className="fa-solid fa-angle-down"></i>
        </button>
      </div>
    );

    if (this.state.isMinimized) {
      friendsList = (
        <div className="my-friends-list-minimized">
          <button
            className="my-friends-list-btn"
            onClick={this.onClickBtn}
          >
            <i className="fa-solid fa-angle-up"></i>
          </button>
        </div>
      );
    }

    return <>{friendsList}</>;
  }
}

function mapStateToProps(store) {
  return {
    username: store.username,
  };
}

export default connect(mapStateToProps)(FriendsList);
