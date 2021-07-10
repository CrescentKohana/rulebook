import { Typography } from "@material-ui/core"
import Link from "next/link"
import { FC } from "react"
import styles from "../styles/Layout.module.css"
import typography from "../styles/Typography.module.css"
import * as types from "../types"
import Footer from "./Footer"
import Nav from "./Nav"
import SearchPopup from "./SearchPopup"

interface LayoutProps {
  pageTitle: string
  chapters: types.Chapter[]
  children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ pageTitle, chapters, children }) => {
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
              <SearchPopup chapters={chapters} />
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
