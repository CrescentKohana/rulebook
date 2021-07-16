import Link from "next/link"
import { FC } from "react"
import styles from "../styles/Layout.module.css"
import * as types from "../types"

interface NavProps {
  chapters: types.Chapter[]
}

/**
 * Dynamically build navigation consisting of chapters.
 */
const Nav: FC<NavProps> = ({ chapters }: NavProps) => {
  return (
    <nav id={styles.nav}>
      {chapters.map((chapter: types.Chapter) => (
        <div key={chapter.id}>
          <Link href={`/chapter/${chapter.id}`}>
            <a id={`chapter-${chapter.id}`}>
              {chapter.id}. {chapter.title}
            </a>
          </Link>
        </div>
      ))}
    </nav>
  )
}

export default Nav
