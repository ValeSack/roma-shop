import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Callback from "./pages/Callback";
import { AuthProvider } from "./auth/AuthProvider";
import { Movies } from "./pages/Movies";
import PrivateRoute from "./auth/PrivateRouter";

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
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
