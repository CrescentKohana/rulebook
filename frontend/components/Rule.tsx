import * as types from '../types'

export default function Rule({ data, subId }: { data: types.Rule, subId: number }): JSX.Element {
  return <div id={`${subId}.${data.id}`} style={{whiteSpace: "pre-wrap"}}>
    {data.id}{': '} {data.content}
    <ol type='a'>
      {Object.entries(data.subrules).map(([key, value]) => <li key={key} id={`${subId}.${data.id}${key}`}>{value}</li>) }
    </ol>
    <br/>
 </div>
}
