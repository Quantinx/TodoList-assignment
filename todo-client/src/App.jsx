import TodoPage from "./pages/TodoPage/TodoPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./provider/TaskProvider";
import "./App.css";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <>
      <TaskProvider>
        <BrowserRouter>
          <div className="wrapper">
            <Header />
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/todo" element={<TodoPage />} />
              </Route>
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </TaskProvider>
    </>
  );
}

export default App;
