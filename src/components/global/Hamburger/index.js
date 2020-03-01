import React, { useState } from "react"

import "./hamberder.sass"

export default ({ toggleMenu }) => {
  return (
    <div className={"hamburger"} onClick={toggleMenu}>
      <div className={"hamburgerMenuIcon"}>
        <div className={"hamburgerMenuIconLines"}></div>
      </div>
    </div>
  )
}
