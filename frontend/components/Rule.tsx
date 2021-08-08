import { FC } from "react"
import { HashLink } from "react-router-hash-link"
import { keepLinks } from "../lib/sanitizers"
import styles from "../styles/Rule.module.css"
import * as types from "../types"
import Subrule from "./Subrule"

interface RuleProps {
  data: types.Rule
  chapterId: number
  subchapterId: number
}

/**
 * A rule. Has subrules and belongs to a subchapter.
 */
const Rule: FC<RuleProps> = ({ data, chapterId, subchapterId }: RuleProps) => {
  return (
    <div id={`${subchapterId}.${data.id}`} className={styles.rule}>
      <HashLink to={`/chapter/${chapterId}#${subchapterId}.${data.id}`}>{data.id}:</HashLink>{" "}
      <span dangerouslySetInnerHTML={{ __html: keepLinks(data.content) }} />
      <div className={styles.subrules}>
        {data.subrules.map((subrule) => (
          <Subrule key={subrule.id} data={subrule} chapterId={chapterId} subchapterId={subchapterId} ruleId={data.id} />
        ))}
      </div>
      <br />
    </div>
  )
}

export default Rule
