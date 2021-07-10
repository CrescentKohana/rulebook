import Link from "next/link"
import { FC } from "react"
import styles from "../styles/Layout.module.css"

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
