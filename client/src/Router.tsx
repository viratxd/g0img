import { createBrowserRouter } from "react-router-dom";
import { Favorite } from "./pages/Favorite";
import { ImageSearch } from "./pages/ImageSearch";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./pages/Layout";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <ImageSearch />,
        index: true
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ]
  }
]);
