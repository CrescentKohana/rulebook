export default function Rule({ data }: { data: {id: number, content: string, subrules: Array<any>} }) {
  return <div style={{whiteSpace: "pre-wrap"}}>
    {data.id}{': '} {data.content}
    <ol type='a'>
      {Object.entries(data.subrules).map(([key, value]) => <li key={key}>{value}</li>) }
    </ol>
    <br/>
 </div>
}
