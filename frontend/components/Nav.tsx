import * as types from '../types'
import styles from '../styles/Layout.module.css'
import Link from 'next/link'

interface NavProps {
  chapters: types.TinyChapter[]
}

const Nav = ({ chapters }: NavProps): JSX.Element => {
  return (
    <nav id={styles.nav}>
      {chapters.map((chapter: types.TinyChapter) => 
      <div key={chapter.id}>
        <Link href={`/chapter/${chapter.id}`}><a>{chapter.id}. {chapter.title}</a></Link>
      </div>
      )} 
    </nav>
  )
}

export default Nav
