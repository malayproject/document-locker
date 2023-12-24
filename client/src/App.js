import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import { loader } from "./helpers";

function App() {
  const router = createBrowserRouter([
    {
      path: "/oauth2/redirect/google",
      loader: loader,
    },
    {
      path: "/",
      element: <LandingPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
