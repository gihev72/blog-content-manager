import { Routes, Route } from "react-router-dom";
import MainPage from "./features/auth/MainPage";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import "./index.css";
import BlogsList from "./features/blogs/BlogsList";
import SingleBlog from "./features/blogs/SingleBlog";
import EditBlog from "./features/blogs/EditBlog";
import NewBlog from "./features/blogs/NewBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="main" element={<MainPage />} />
          <Route path="blogs">
            <Route index element={<BlogsList />} />
            <Route path=":id" element={<SingleBlog />} />
            <Route path="edit/:id" element={<EditBlog />} />
            <Route path="newBlog" element={<NewBlog />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
