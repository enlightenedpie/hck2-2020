import React from "react"

import "./hamberder.sass"

export default ({ toggleMenu, toggled = false }) => {
  return (
    <div
      role="button"
      aria-label="Mobile Menu Toggle Switch"
      aria-expanded={toggled}
      className={"hamburger"}
      onClick={toggleMenu}
    >
      <div className={"hamburgerMenuIcon"}>
        <div className={"hamburgerMenuIconLines"}></div>
      </div>
    </div>
  )
}
