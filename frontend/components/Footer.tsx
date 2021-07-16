import Link from "next/link"
import { FC } from "react"
import styles from "../styles/Layout.module.css"

/**
 * Footer used below the navigation and buttons on the left.
 */
const Footer: FC = () => {
  return (
    <footer id={styles.footer}>
      <Link href="https://github.com/Luukuton/rulebook">
        <a>GitHub Repository</a>
      </Link>
    </footer>
  )
}

export default Footer
