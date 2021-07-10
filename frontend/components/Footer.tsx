import { FunctionComponent } from "react"
import Link from "next/link"
import styles from "../styles/Layout.module.css"

const Footer: FunctionComponent = () => {
  return (
    <footer id={styles.footer}>
      <Link href="https://github.com/Luukuton/rulebook">
        <a>GitHub Repository</a>
      </Link>
    </footer>
  )
}

export default Footer
