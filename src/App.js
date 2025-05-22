import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./index.scss";

import { store } from "./redux/store";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register/Register";
import MainPage from "./pages/MainPage";

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Navigate to="/start" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/start"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Provider>
  );
};
