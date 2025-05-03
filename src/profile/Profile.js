import React, { useEffect } from "react";
import { Card, Avatar, Button } from "antd";
import { useRecoilState } from "recoil";
import { loggedInUser } from "../atom/globalState";
import { LogoutOutlined } from "@ant-design/icons";
import { getCurrentUser } from "../util/ApiUtil";
import defaultImage from "./../assets/user.png";
import "./Profile.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

const { Meta } = Card;

const Profile = (props) => {
  const [currentUser, setLoggedInUser] = useRecoilState(loggedInUser);
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      props.history.push("/login");
    }
    loadCurrentUser();
  }, []);

  const loadCurrentUser = () => {
    getCurrentUser()
      .then((response) => {
        setLoggedInUser(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    props.history.push("/login");
  };

  return (
    <div className="profile-container">
      <Card
        style={{ width: 420, border: "1px solid #e1e0e0" }}
        actions={[
          <Button key="chat" block>
            <Link to={"/chat"}>Перейти в чаты</Link>
          </Button>,
          <Button key="logout" block onClick={logout}>
            <LogoutOutlined /> Выйти
          </Button>
        ]}
      >
        <Meta
          avatar={<Avatar src={defaultImage} className="user-avatar-circle" />}
          title={currentUser.username}
          description={"@" + currentUser.username}
        />
      </Card>
    </div>
  );
};

export default Profile;
