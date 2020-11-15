import { lazy } from "react";
const Home = lazy(() => import(/* webpackChunkName: "home" */ "../pages/Home"));
const Skills = lazy(() =>
  import(/* webpackChunkName: "skills" */ "../pages/Skills")
);
const About = lazy(() =>
  import(/* webpackChunkName: "about" */ "../pages/About")
);
const MyWork = lazy(() =>
  import(/* webpackChunkName: "my-work" */ "../pages/MyWork")
);
const Contact = lazy(() =>
  import(/* webpackChunkName: "contact" */ "../pages/Contact")
);
const Blog = lazy(() => import(/* webpackChunkName: "blog" */ "../pages/Blog"));

const routerConfig = [
  {
    path: "/",
    component: Home,
    name: "Home",
    exact: true,
    strict: true,
  },
  {
    path: "/skills",
    component: Skills,
    name: "Skills",
    exact: true,
    strict: true,
  },
  {
    path: "/about",
    component: About,
    name: "About",
    exact: true,
    strict: true,
  },
  {
    path: "/work",
    component: MyWork,
    name: "MyWork",
    exact: true,
    strict: true,
  },
  {
    path: "/contact",
    component: Contact,
    name: "Contact",
    exact: true,
    strict: true,
  },
  {
    path: "/blog",
    component: Blog,
    name: "Blog",
    exact: true,
    strict: true,
  },
  // {
  //   path: "/risks",
  //   component: Risks,
  //   name: "Risks",
  //   routes: [
  //     {
  //       path: "/risks/:id",
  //       name: "Risks Id",
  //     },
  //   ],
  // },
];

export default routerConfig;
