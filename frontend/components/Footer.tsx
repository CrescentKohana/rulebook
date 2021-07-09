import Link from 'next/link'
import styles from '../styles/Layout.module.css'

export default function Footer(): JSX.Element {
  return <footer id={styles.footer}>
    <Link href="https://github.com/Luukuton/rulebook"><a>GitHub Repository</a></Link>
  </footer>
  
}
