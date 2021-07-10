import Link from "next/link"
import { FunctionComponent } from "react"
import styles from "../styles/Layout.module.css"
import * as types from "../types"

interface NavProps {
  chapters: types.Chapter[]
}

const Nav: FunctionComponent<NavProps> = ({ chapters }: NavProps) => {
  return (
    <nav id={styles.nav}>
      {chapters.map((chapter: types.Chapter) => (
        <div key={chapter.id}>
          <Link href={`/chapter/${chapter.id}`}>
            <a>
              {chapter.id}. {chapter.title}
            </a>
          </Link>
        </div>
      ))}
    </nav>
  )
}

export default Nav
