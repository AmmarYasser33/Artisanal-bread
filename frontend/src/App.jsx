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
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userInfo.token);
  const role = useSelector((state) => state.userInfo.role);

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
    if (token) {
      dispatch(fetchCartCounter(token));
    }
  }, [dispatch, token]);

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
        // className={isArLang?"ar_toast":""}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/course/:id" element={<CourseWatch />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<UserDashboard />}>
          <Route path="" element={<UserProfile />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="orders/:id" element={<UserOrder />} />
          <Route path="courses" element={<UserCourses />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
