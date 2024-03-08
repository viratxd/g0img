import { createBrowserRouter } from "react-router-dom";
import { Favorite } from "./pages/Favorite";
import { ImageSearch } from "./pages/ImageSearch";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ImageSearch />,
    errorElement: <NotFound />
  },
  {
    path: "/favorite",
    element: <Favorite />,
  },
]);
