import * as React from "react";
import { NavLink } from "react-router-dom";
import layoutStyles from "./Layout.module.css";

const Menu = () => {
  return (
    <nav className={layoutStyles.sidebarMenu}>
      <h3><NavLink to="/">Able Farm</NavLink></h3>

      <ol className={layoutStyles.sidebarMenu__list}>
        <li className={layoutStyles.sidebarMenu__list__item}>
          <NavLink to="/logout">Log Out</NavLink>
        </li>
      </ol>
    </nav>
  )
}
const Layout = ({ children, loggedIn = true }) => {
  return (
    <div className={layoutStyles.Layout}>
      <Menu />
      <div className={layoutStyles.Layout__main}>
        <div className={layoutStyles.mainContent}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
