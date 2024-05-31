import React from "react";
import UserLayout from "../layout/UserLayout";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <UserLayout>
      <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
          <figure className="avatar avatar-profile">
            <img
            style={{height:"100%",width:"100%"}}
              className="rounded-circle img-fluid"
              src={user?.avatar}
              alt="avatar"
            />
          </figure>
        </div>

        <div className="col-12 col-md-5">
          <h4>Name</h4>
          <p>{user?.name}</p>

          <h4>Email Address</h4>
          <p>{user?.email}</p>

          <h4>Joined On</h4>
          <p>{user?.createdAt}</p>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
