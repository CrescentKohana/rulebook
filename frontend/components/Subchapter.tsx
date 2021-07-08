import * as types from '../types'
import Rule from "./Rule"

export default function Subchapter({ data }: { data: types.Subchapter }): JSX.Element {
  return <div>
    <h4>{data.id}. {data.title}</h4>
    <div>{data.rules.map((rule: types.Rule) => <Rule key={rule.id} data={rule} />) }</div>
  </div>
}
