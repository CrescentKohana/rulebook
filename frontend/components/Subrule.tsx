import Link from "next/link"
import { FunctionComponent } from "react"

interface SubruleProps {
  id: string
  content: string
  chapterId: number
  subchapterId: number
  ruleId: number
}

const Subrule: FunctionComponent<SubruleProps> = ({ id, content, chapterId, subchapterId, ruleId }: SubruleProps) => {
  return (
    <div id={`${subchapterId}.${ruleId}${id}`}>
      <Link href={`/chapter/${chapterId}#${subchapterId}.${ruleId}${id}`}>
        <a>{id}.</a>
      </Link>{" "}
      {content}
    </div>
  )
}

export default Subrule
