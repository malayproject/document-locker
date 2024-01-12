import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import AuthCheckLayout from "./pages/AuthCheckLayout";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthCheckLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="home" element={<Home />} />
            <Route
              path="oauth2/redirect/google"
              element={<Navigate to="/home" />}
            />
          </Route>
          <Route path="/*" element={<h1>Wrong path</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
