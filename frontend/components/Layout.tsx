import { FunctionComponent } from 'react'

import * as types from '../types'
import styles from '../styles/Layout.module.css'
import typography from '../styles/Typography.module.css'

import Link from 'next/link'
import Nav from './Nav'
import Footer from './Footer'

interface LayoutProps {
  chapters: types.TinyChapter[]
  children: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ chapters, children }) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
            <div className={styles.leftColumnWrap}>
              <div className={typography.header}> 
                <h1 className={typography.title}><Link href='/'>Rulebook</Link></h1>
              </div>
              <Nav chapters={chapters} />
              <Footer />
            </div>
          </div>
          <div className={styles.rightColumn}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout