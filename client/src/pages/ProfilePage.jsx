import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Logout from "../components/Logout";
import Accommodations from "./PlacePage";

import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  const { ready, user } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }
  // loading
  if (!ready) {
    return <Loading />;
  }
  // 非用户返回登陆页面
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccountNav />

      {subpage === "profile" && <Logout />}

      {subpage === "places" && <Accommodations />}
    </div>
  );
};
export default ProfilePage;
