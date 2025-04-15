import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Callback from "./pages/Callback";
import { AuthProvider } from "./auth/AuthProvider";
import { Movies } from "./pages/Movies";
import PrivateRoute from "./auth/PrivateRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/callback" element={<Callback />} />
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <Movies />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
