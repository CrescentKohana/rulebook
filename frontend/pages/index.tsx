import { IconButton, Typography } from "@material-ui/core"
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined"
import { GetServerSideProps } from "next"
import Head from "next/head"
import React, { ReactElement, useEffect, useState } from "react"
import { BrowserRouter as Router, Link, Route, Switch, useLocation } from "react-router-dom"
import Chapter from "../components/Chapter"
import Home from "../components/Home"
import Menu from "../components/Menu"
import { fetchAPI } from "../lib/api"
import { addReferences } from "../lib/references"
import styles from "../styles/Layout.module.css"
import typography from "../styles/Typography.module.css"
import * as types from "../types"

interface Props {
  chapters: types.Chapter[]
}

/**
 * Helper to make the page scroll to the top when clicking navigation links.
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

/**
 * Home page.
 */
const Index = ({ chapters }: Props): ReactElement => {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(!open)

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const menuClasses = `${styles.menu} ${!open && styles.menuHidden}`

  return (
    <Router>
      <ScrollToTop />
      <div className={styles.main}>
        <IconButton id={styles.menuButton} color="default" onClick={closeMenu} edge="start" aria-label="menu">
          <MenuOutlinedIcon />
        </IconButton>
        <div className={styles.row}>
          <div className={menuClasses}>
            <div className={styles.menuWrap}>
              <div className={typography.header}>
                <h1 className={typography.title}>
                  <Link to="/">Rulebook</Link>
                </h1>
              </div>
              <nav id="nav">
                {chapters.map((chapter: types.Chapter) => (
                  <div key={chapter.id}>
                    <Link id={`chapter-${chapter.id}`} to={`/chapter/${chapter.id}`}>
                      {chapter.id}. {chapter.title}
                    </Link>
                  </div>
                ))}
              </nav>

              <Menu chapters={chapters} />
            </div>
          </div>
          <div className={styles.content}>
            <div>
              <Switch>
                {chapters.map((chapter: types.Chapter) => (
                  <Route key={chapter.id} path={`/chapter/${chapter.id}`}>
                    <Chapter chapter={chapter} />
                  </Route>
                ))}
                <Route exact path="/">
                  <div>
                    <Head>
                      <title>Rulebook</title>
                    </Head>
                    <Home />
                  </div>
                </Route>
                <Route>
                  <div>
                    <Head>
                      <title>Rulebook | 404</title>
                    </Head>
                    <Typography variant="h3" align="center">
                      404 - not found
                    </Typography>
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const rulebook = (await fetchAPI("/chapters")) as types.Rulebook
  const rawChapters: types.Chapter[] = rulebook.chapters

  // Add references to every chapter.
  const chapters: types.Chapter[] = []
  rawChapters.forEach((chapter) => {
    chapters.push(addReferences(chapter))
  })

  return {
    props: { chapters },
  }
}

export default Index
