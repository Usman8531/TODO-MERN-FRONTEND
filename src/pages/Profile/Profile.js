import React, { useContext, useState } from "react";
import { Context } from "../../index";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useContext(Context);
  console.log(user);
  return <div>Profile</div>;
}

export default Profile;
