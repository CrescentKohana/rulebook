import { FC } from "react"
import { HashLink } from "react-router-hash-link"
import * as types from "../types"
import Rule from "./Rule"

interface SubchapterProps {
  data: types.Subchapter
  chapterId: number
}

/**
 * A subchapter. Has rules and belongs to a chapter.
 */
const Subchapter: FC<SubchapterProps> = ({ data, chapterId }: SubchapterProps) => {
  return (
    <div id={`${data.id}`}>
      <HashLink to={`/chapter/${chapterId}#${data.id}`}>
        <h4>
          {data.id}. {data.title}
        </h4>
      </HashLink>
      <div>
        {data.rules.map((rule: types.Rule) => (
          <Rule key={rule.id} subchapterId={data.id} chapterId={chapterId} data={rule} />
        ))}
      </div>
    </div>
  )
}

export default Subchapter
