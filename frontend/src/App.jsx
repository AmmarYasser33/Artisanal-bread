import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoginState,
  getRoleState,
  getToken,
  getUserInfoFromLocalStorage,
} from "./Store/userInfo-actions";
import fetchCartCounter from "./Store/cartCounter-actions";
import fetchProfileData from "./Store/profileInfo-actions";
import PR from "./components/ProtectedRoute";
import AR from "./components/AdminRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import CourseWatch from "./pages/CourseWatch";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import UserOrders from "./pages/UserOrders";
import UserOrder from "./pages/UserOrder";
import UserCourses from "./pages/UserCourses";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMain from "./pages/AdminMain";
import AdminOrders from "./pages/AdminOrders";
import AdminOrder from "./pages/AdminOrder";
import AdminCategories from "./pages/AdminCategories";
import AdminProducts from "./pages/AdminProducts";
import AdminCourses from "./pages/AdminCourses";
import AdminAddCourse from "./pages/AdminAddCourse";
import AdminCourse from "./pages/AdminCourse";
import AdminUsers from "./pages/AdminUsers";
import AdminUser from "./pages/AdminUser";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const isArLang = localStorage.getItem("i18nextLng") === "ar";
  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng") === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", "en");
    }
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData"))) {
      dispatch(getUserInfoFromLocalStorage());
    }
    if (JSON.parse(localStorage.getItem("token"))) {
      dispatch(getRoleState());
      dispatch(getToken());
    }
    dispatch(getIsLoginState());
  }, [dispatch]);

  useEffect(() => {
    if (token && role === "user") {
      dispatch(fetchCartCounter(token));
    }
  }, [dispatch, token, role]);

  // get profile data from database
  useEffect(() => {
    if (token) {
      dispatch(fetchProfileData(token));
    }
  }, [dispatch, token, role]);

  // #eaa636
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnFocusLoss={false}
        rtl={isArLang}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/course/:id" element={<PR><CourseWatch /></PR>} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<PR><Cart /></PR>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<PR><UserDashboard /></PR>}>
          <Route path="" element={<UserProfile />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="orders/:id" element={<UserOrder />} />
          <Route path="courses" element={<UserCourses />} />
        </Route>

        <Route path="/admin" element={<PR><AR><AdminDashboard /></AR></PR>}>
          <Route path="" element={<AdminMain />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrder />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/add" element={<AdminAddCourse />} />
          <Route path="courses/:id" element={<AdminCourse />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<AdminUser />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
