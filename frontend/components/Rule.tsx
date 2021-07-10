import { FunctionComponent } from "react"
import * as types from "../types"
import styles from "../styles/Rule.module.css"
import Link from "next/link"
import Subrule from "./Subrule"

interface RuleProps {
  data: types.Rule
  chapterId: number
  subchapterId: number
}

const Rule: FunctionComponent<RuleProps> = ({ data, chapterId, subchapterId }: RuleProps) => {
  return (
    <div id={`${subchapterId}.${data.id}`} className={styles.rule}>
      <Link href={`/chapter/${chapterId}#${subchapterId}.${data.id}`}>
        <a>{data.id}:</a>
      </Link>{" "}
      {data.content}
      <div className={styles.subrules}>
        {data.subrules.map((subrule) => (
          <Subrule
            key={subrule.id}
            id={subrule.id}
            content={subrule.content}
            chapterId={chapterId}
            subchapterId={subchapterId}
            ruleId={data.id}
          />
        ))}
      </div>
      <br />
    </div>
  )
}

export default Rule
