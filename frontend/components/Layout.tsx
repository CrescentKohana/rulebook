import { Typography } from "@material-ui/core"
import Link from "next/link"
import React, { FC, useEffect, useState } from "react"
import styles from "../styles/Layout.module.css"
import typography from "../styles/Typography.module.css"
import * as types from "../types"
import AddRulebook from "./AddRulebook"
import Footer from "./Footer"
import Nav from "./Nav"
import PopupWrapper from "./PopupWrap"
import Search from "./Search"

interface LayoutProps {
  pageTitle: string
  chapters: types.Chapter[]
  children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ pageTitle, chapters, children }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearchPopup = () => setSearchOpen(false)

  const [addOpen, setAddOpen] = useState(false)
  const closeAddPopup = () => setAddOpen(false)

  // Prevent main page scrolling when the search popup is open.
  useEffect(() => {
    ;(searchOpen || addOpen) && (document.body.style.overflow = "hidden")
    !searchOpen && !addOpen && (document.body.style.overflow = "unset")
  }, [searchOpen, addOpen])

  return (
    <>
      <div className={styles.main}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <div className={styles.leftColumnWrap}>
              <div className={typography.header}>
                <h1 className={typography.title}>
                  <Link href="/">
                    <a>Rulebook</a>
                  </Link>
                </h1>
              </div>
              <Nav chapters={chapters} />
              <PopupWrapper btnTitle="Search" openState={[searchOpen, setSearchOpen]} closePopup={closeSearchPopup}>
                <Search chapters={chapters} closePopup={closeSearchPopup} />
              </PopupWrapper>
              <br />
              <br />
              <PopupWrapper btnTitle="Replace" openState={[addOpen, setAddOpen]} closePopup={closeAddPopup}>
                <AddRulebook>
                  <p>a</p>
                </AddRulebook>
              </PopupWrapper>
              <br />
              <br />
              <Footer />
            </div>
          </div>
          <div className={styles.rightColumn}>
            <Typography variant="h3" align="center">
              {pageTitle}
            </Typography>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
