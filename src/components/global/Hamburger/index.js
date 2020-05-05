import React from "react"

import "./hamberder.sass"

export default ({ toggleMenu }) => {
  return (
    <div
      role="button"
      aria-label="Mobile Menu Toggle Switch"
      className={"hamburger"}
      onClick={toggleMenu}
    >
      <div className={"hamburgerMenuIcon"}>
        <div className={"hamburgerMenuIconLines"}></div>
      </div>
    </div>
  )
}
