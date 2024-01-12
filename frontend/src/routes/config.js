import { lazy } from "react";

export const DefaultRoute = "/";

/**
 * By default all routes are protected and have 'default' layout.
 * If a route doesn't requires auth, provide public: true
 * If a route requires blank layout, provide layout: 'blank'
 */
export const pageRoutes = [
  {
    path: "/",
    component: lazy(() => import("../pages/user-login/NameEntry")),
    public: true,
  },
  {
    path: "/new-post",
    component: lazy(() => import("../pages/post/NewPost")),
    public: true,
  },
];

