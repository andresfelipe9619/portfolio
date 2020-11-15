import React, { memo, Suspense } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
import routerConfig from "./router.config";
import NotFound from "../pages/NotFound";

function RouterApp() {
  return (
    <Suspense fallback={"Loading..."}>
      <Switch>
        {routerConfig.map((route) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
        <Route
          exact
          path="/not-found"
          render={(props) => <NotFound {...props} />}
        />
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
}

export default memo(RouterApp);