import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [check, setCheck] = useState(true);
  const [valid, setValid] = useState();

  useEffect(() => {
    async function checker() {
      try {
        const response = await fetch(`http://localhost:4000/authentication`, {
          method: "GET",
          headers: {
            "api-key": process.env.REACT_APP_API_KEY,
            authorization: Cookies.get("token"),
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            window.location.href = "/404";
          } else {
            throw new Error("Request failed.");
          }
        }

        const data = await response.json();

        if (data.message === "succeed") {
          setCheck(false);
          setValid(true);
        } else {
          setCheck(false);
          setValid(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    checker();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        check ? null : valid ? <Component {...props} /> : <Redirect to="/404" />
      }
    />
  );
};

export default PrivateRoute;