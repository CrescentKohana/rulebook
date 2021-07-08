import Rule from "./Rule"

export default function Subchapter({ data }: { data: {id: number, title: string, rules: Array<any>} }) {
  return <div>
    <h4>{data.id}. {data.title}</h4>
    <div>{data.rules.map((rule: { id: number, content: string, subrules: Array<any> }) => <Rule key={rule.id} data={rule} />) }</div>
  </div>
}
