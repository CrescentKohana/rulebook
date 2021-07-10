import Link from "next/link"
import { FunctionComponent } from "react"
import * as types from "../types"
import Rule from "./Rule"

interface SubchapterProps {
  data: types.Subchapter
  chapterId: number
}

const Subchapter: FunctionComponent<SubchapterProps> = ({ data, chapterId }: SubchapterProps) => {
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
