import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import * as routerLink from "../../config/routersConfig";
import { checkLoginStatus } from "../../utils/functions/commonFunctions";
import { getDatabase } from "../../middleware/api/methods/methodAxios";
import { users } from "../../config/resourcesAxiosConfig";

function PrivateRouter() {
  let navigate = useNavigate();
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    let data = getDatabase(users, "");
    data.then((res) => {
      let loginStatus = checkLoginStatus();
      let flag = false;
      res.data.forEach((user) => {
        if (
          loginStatus.typeUser === "user" &&
          loginStatus.email === user.email &&
          user.statusUser
        ) {
          flag = true;
        }
      });
      if (flag) {
        setPermission(true);
      } else {
        navigate(routerLink.error403.path, { replace: true });
      }
    });
  }, [navigate]);

  return !permission ? <></> : <Outlet />;
}

export default PrivateRouter;
