import React, { FC, useEffect, useState } from "react"
import styles from "../styles/Layout.module.css"
import * as types from "../types"
import Footer from "./Footer"
import PopupWrap from "./PopupWrap"
import ReplaceRulebook from "./ReplaceRulebook"
import Search from "./Search"

interface MenuProps {
  chapters: types.Chapter[]
}

/**
 * Left side menu.
 */
const Menu: FC<MenuProps> = ({ chapters }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearchPopup = () => setSearchOpen(false)

  const [addOpen, setAddOpen] = useState(false)
  const closeAddPopup = () => setAddOpen(false)

  // Pressing q to opens search popup
  useEffect(() => {
    const handleOnKeyDown = (event: { keyCode: number }) => {
      // 81 is 'q'
      if (event.keyCode === 81) {
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handleOnKeyDown)
    return () => window.removeEventListener("keydown", handleOnKeyDown)
  }, [])

  // Prevent main page scrolling when the search popup is open.
  useEffect(() => {
    ;(searchOpen || addOpen) && (document.body.style.overflow = "hidden")
    !searchOpen && !addOpen && (document.body.style.overflow = "unset")
  }, [searchOpen, addOpen])

  return (
    <div id={styles.subNav}>
      <PopupWrap btnTitle="Search" openState={[searchOpen, setSearchOpen]} closePopup={closeSearchPopup}>
        <Search chapters={chapters} closePopup={closeSearchPopup} />
      </PopupWrap>
      <PopupWrap btnTitle="Replace" openState={[addOpen, setAddOpen]} closePopup={closeAddPopup}>
        <ReplaceRulebook />
      </PopupWrap>
      <Footer />
    </div>
  )
}

export default Menu
