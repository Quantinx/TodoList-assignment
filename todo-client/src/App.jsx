import TodoPage from "./pages/TodoPage/TodoPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./provider/TaskProvider";

function App() {
  return (
    <>
      <TaskProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todo" element={<TodoPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TaskProvider>
    </>
  );
}

export default App;
