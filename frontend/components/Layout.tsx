import { IconButton, Typography } from "@material-ui/core"
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined"
import React, { FC, useState } from "react"
import styles from "../styles/Layout.module.css"
import * as types from "../types"
import Menu from "./Menu"

interface LayoutProps {
  pageTitle: string
  chapters: types.Chapter[]
  children?: React.ReactNode
}

/**
 * The main layout of the app.
 */
const Layout: FC<LayoutProps> = ({ pageTitle, chapters, children }) => {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(!open)

  const menuClasses = `${styles.menu} ${open && styles.menuHidden}`

  return (
    <>
      <div className={styles.main}>
        <IconButton id={styles.menuButton} color="default" onClick={closeMenu} edge="start" aria-label="menu">
          <MenuOutlinedIcon />
        </IconButton>
        <div className={styles.row}>
          <div className={menuClasses}>
            <Menu chapters={chapters} />
          </div>
          <div className={styles.content}>
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
