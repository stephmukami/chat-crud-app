import React, { useContext } from "react";
import { Route} from "react-router-dom";
import { AuthContext } from "./Auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate



const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Use useNavigate hook

  return (
    <Route
      {...rest}
      element={ // Replace the render prop with element prop
        !!currentUser ? (
          <RouteComponent />
        ) : (
          // Use navigate function instead of Redirect
          // Specify the path to navigate when not logged in (e.g., "/feed")
          navigate("/feed")
        )
      }
    />
  );
};

export default PrivateRoute