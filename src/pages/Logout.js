import * as React from "react";
import { UserContext } from "../contexts/UserContext";

const Logout = () => {
  const { user, onLogout } = React.useContext(UserContext);

  React.useEffect(() => {
    if (!!user) onLogout();
  })

  return <p>Logging Out...</p>;
}

export default Logout;
