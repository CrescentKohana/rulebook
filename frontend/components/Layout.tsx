import { FunctionComponent } from 'react'; // importing FunctionComponent

import styles from '../styles/Home.module.css'

import Link from 'next/link'

import Nav from './Nav'
import Footer from './Footer'

interface LayoutProps {
  chapters: Array<any>
  children: React.ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({ chapters, children }) => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.row}>
          <div className={styles.leftColumn}>
          <div className={styles.header}> 
            <h1 className={styles.title}>
              <Link href='/'>Rulebook</Link>
            </h1>
          </div>
            <Nav chapters={chapters} />
          </div>
          <div className={styles.rightColumn}>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Layout