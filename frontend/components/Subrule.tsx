import Link from "next/link"
import { FC } from "react"
import { keepLinks } from "../lib/sanitizers"
import * as types from "../types"

interface SubruleProps {
  data: types.Subrule
  chapterId: number
  subchapterId: number
  ruleId: number
}

/**
 * A subrule. Belongs to a rule.
 */
const Subrule: FC<SubruleProps> = ({ data, chapterId, subchapterId, ruleId }: SubruleProps) => {
  return (
    <div id={`${subchapterId}.${ruleId}${data.id}`}>
      <Link href={`/chapter/${chapterId}#${subchapterId}.${ruleId}${data.id}`}>
        <a>{data.id}.</a>
      </Link>{" "}
      <span dangerouslySetInnerHTML={{ __html: keepLinks(data.content) }} />
    </div>
  )
}

export default Subrule
