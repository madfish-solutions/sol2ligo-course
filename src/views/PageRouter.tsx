import * as React from "react";
import { Router, Redirect, useLocation, HistoryAction } from "woozie";

import Home from "./Home";
import CoursePage from "./CoursePage";

const ROUTE_MAP = Router.createMap([
  ["/", () => <Home />],
  [
    "/section/:id?",
    ({ id }) =>
      id !== "0" && !id ? (
        <Redirect to="/section/0" />
      ) : (
        <CoursePage selectedSection={Number(id)} />
      ),
  ],
  ["*", () => <Redirect to="/" />],
]);

const PageRouter: React.FC = () => {
  const { trigger, pathname } = useLocation();

  // Scroll to top after new location pushed.
  React.useLayoutEffect(() => {
    if (trigger === HistoryAction.Push) {
      window.scrollTo(0, 0);
    }
  }, [trigger, pathname]);

  return React.useMemo(() => Router.resolve(ROUTE_MAP, pathname, null), [
    pathname,
  ]);
};

export default PageRouter;
