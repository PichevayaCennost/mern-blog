import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { checkIsAuth, logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
//   const { user } = useSelector((state) => state.authSlice);

  const navigate = useNavigate();

  const activeStyle = {
    textDecoration: "underline",
  };

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    toast("Вы вышли из системы");
    navigate("/");
  };

  return (
    <div className="flex p-2 justify-between items-center bg-neutral-800 sticky top-0">
      {/* Logo */}
      <img className=" w-20 h-20 ml-20" src="blog.png"></img>

      {/* Menu Bar */}
      {isAuth ? (
        <ul className="flex gap-8 text-blue-400 ">
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className=" hover:text-white"
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="hover:text-white"
            >
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className=" hover:text-white"
            >
              Добавить пост
            </NavLink>
          </li>
        </ul>
      ) : null}

      {/* Me / (login/register) */}
      <div className="flex flex-col text-blue-400 mr-20 border-l-2 border-blue-400 p-2">
        {isAuth ? (
          <div>
            <Link to="/me">
              <img className="w-12 h-12" src="user.png"></img>
            </Link>
            <button onClick={logoutHandler}>Выйти</button>
          </div>
        ) : (
          <div className="flex flex-col">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
