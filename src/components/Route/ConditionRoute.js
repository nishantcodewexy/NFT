import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toastAlert } from "../../lib/toastAlert";
// import action
import { logout } from "../../actions/users";

// import lib
import isLogin from "../../lib/isLogin";

const ConditionRoute = ({
  component: Component,
  layout: Layout,
  type,
  store,
  ...rest
}) => {
  const history = useHistory();

  // redux-state
  const authData = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (type == "auth" && isLogin() == true) {
          return <Redirect to="/admin-list" />;
        } else if (type == "private" && isLogin() != true) {
          return <Redirect to="/" />;
        } else if (authData.role != "superadmin") {
          if (authData.restriction && authData.restriction.length > 0) {
            let restrictionData = authData.restriction.find(
              (item) => item.path == props.match.path
            );
            console.log(
              props.match,
              "======================authData.restriction==========="
            );
            if (!restrictionData && authData.restriction[0].path) {
              return <Redirect to={authData.restriction[0].path} />;
            }
          }
        }

        if (Layout) {
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default ConditionRoute;
