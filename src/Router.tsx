import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import ShowMatchedJobs from "./components/ShowMatchedJobs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
        index: true,
      },
      {
        path: "/found-job",
        element: <ShowMatchedJobs></ShowMatchedJobs>,
      },
    ],
  },
]);
