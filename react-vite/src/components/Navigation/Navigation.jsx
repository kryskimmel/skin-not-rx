import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import ExploreButton from "./ExploreButton";
import { Icon } from '@iconify/react';
import "./Navigation.css";


function Navigation() {
  const [theme, setTheme] = useState("light")

  console.log(theme)
  // Function to change between light and dark themes
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    }
    else if (theme === "dark") {
      setTheme("light")
    }
  };
  const themeSettings = {}

  useEffect(() => {
    themeSettings.pageBackgroundColor = theme === "light" ? document.body.style.backgroundColor="#FFF8E8" : document.body.style.backgroundColor="#363537"
    themeSettings.iconColor = theme === "light" ? "#000000" : "#FFFFFF"
    console.log(themeSettings.iconColor)
  }, [theme])






  return (
    <div className="nav-container">
      <ul className="nav-left">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
      </ul>
      <ul className="nav-right">
        <li>
          <ExploreButton />
        </li>
        <li onClick={toggleTheme}>
          {theme === "light" ? <Icon icon="mdi:theme-light-dark" rotate={2} width="30" height="30"/> : <Icon icon="mdi:theme-light-dark" rotate={2} width="30" height="30" color="white"/>}
        </li>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
