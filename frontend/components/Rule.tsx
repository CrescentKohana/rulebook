import * as types from '../types'

export default function Rule({ data }: { data: types.Rule }): JSX.Element {
  return <div style={{whiteSpace: "pre-wrap"}}>
    {data.id}{': '} {data.content}
    <ol type='a'>
      {Object.entries(data.subrules).map(([key, value]) => <li key={key}>{value}</li>) }
    </ol>
    <br/>
 </div>
}
