import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Feed from "../components/Feed";
import Home from "../components/Home";

export default function Auth({ handleView }) {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        handleView(true); // Set viewLogin to true when user is authenticated
      } else {
        setAuthUser(null);
        handleView(false); // Set viewLogin to false when user is not authenticated
      }
    });

    return () => {
      listen();
    };
  }, [handleView]);

  return (
    <>
      <div>
        {authUser ? (
          <>
            <Feed />
          </>
        ) : (
          <Home />
        )}
      </div>
    </>
  );
}
