import * as types from '../types'
import styles from '../styles/Rule.module.css'
import Link from 'next/link'

interface Props {
  data: types.Rule
  chapterId: number
  subId: number
}

export default function Rule({ data, chapterId, subId }: Props): JSX.Element {
  return <div id={`${subId}.${data.id}`} className={styles.rule}>
    <Link href={`/chapter/${chapterId}#${subId}.${data.id}`}><a>{data.id}:</a></Link>
    {" "} {data.content}
    <div className={styles.subrules}>
      {Object.entries(data.subrules).map(([key, value]) => (
        <div key={key} id={`${subId}.${data.id}${key}`}>
          <Link href={`/chapter/${chapterId}#${subId}.${data.id}${key}`}><a>{key}.</a></Link>
          {" "}{value}
        </div>
      ))}
    </div>
    <br/>
 </div>
}
