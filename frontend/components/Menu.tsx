import Link from "next/link"
import React, { FC, useEffect, useState } from "react"
import styles from "../styles/Layout.module.css"
import typography from "../styles/Typography.module.css"
import * as types from "../types"
import Footer from "./Footer"
import Nav from "./Nav"
import PopupWrapper from "./PopupWrap"
import ReplaceRulebook from "./ReplaceRulebook"
import Search from "./Search"

interface MenuProps {
  chapters: types.Chapter[]
}

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
    <div className={styles.menuWrap}>
      <div className={typography.header}>
        <h1 className={typography.title}>
          <Link href="/">
            <a>Rulebook</a>
          </Link>
        </h1>
      </div>
      <Nav chapters={chapters} />
      <div id={styles.subNav}>
        <PopupWrapper btnTitle="Search" openState={[searchOpen, setSearchOpen]} closePopup={closeSearchPopup}>
          <Search chapters={chapters} closePopup={closeSearchPopup} />
        </PopupWrapper>
        <br />
        <br />
        <PopupWrapper btnTitle="Replace" openState={[addOpen, setAddOpen]} closePopup={closeAddPopup}>
          <ReplaceRulebook />
        </PopupWrapper>
        <br />
        <br />
        <Footer />
      </div>
    </div>
  )
}

export default Menu
