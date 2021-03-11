import * as React from "react";
import { NavLink } from "react-router-dom";
import layoutStyles from "./Layout.module.css";

const Menu = () => {
  return (
    <nav className={layoutStyles.sidebarMenu}>
      <h3><NavLink to="/">Able Farm</NavLink></h3>
    </nav>
  )
}
const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.Layout}>
      <Menu />
      <div className={layoutStyles.Layout__main}>
        <div className={layoutStyles.topMenu}>
          <div className={layoutStyles.topMenu__spacer}>
            <nav className={layoutStyles.topMenu__navigation}>
              <ul className={layoutStyles.topMenu__navigation__list}>
                <li className={`${layoutStyles.avatar} ${layoutStyles.topMenu__navigation__list__item}`}>
                  <NavLink to="/settings">USERNAME</NavLink>
                </li>
                <li className={layoutStyles.topMenu__navigation__list__item}>
                  <NavLink to="/logout">Log Out</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className={layoutStyles.mainContent}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
