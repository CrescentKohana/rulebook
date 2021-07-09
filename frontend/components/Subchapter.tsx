import * as types from '../types'
import Link from 'next/link'
import Rule from "./Rule"

export default function Subchapter({ data, chapterId }: { data: types.Subchapter, chapterId: number }): JSX.Element {
  return <div id={`${data.id}`}>
    <Link href={`/chapter/${chapterId}#${data.id}`}><a><h4>{data.id}. {data.title}</h4></a></Link>
    <div>
      {data.rules.map((rule: types.Rule) => <Rule key={rule.id} subId={data.id} chapterId={chapterId} data={rule} />)}
    </div>
  </div>
}
