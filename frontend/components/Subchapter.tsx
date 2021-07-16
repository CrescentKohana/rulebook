import Link from "next/link"
import { FC } from "react"
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
      <Link href={`/chapter/${chapterId}#${data.id}`}>
        <a>
          <h4>
            {data.id}. {data.title}
          </h4>
        </a>
      </Link>
      <div>
        {data.rules.map((rule: types.Rule) => (
          <Rule key={rule.id} subchapterId={data.id} chapterId={chapterId} data={rule} />
        ))}
      </div>
    </div>
  )
}

export default Subchapter
