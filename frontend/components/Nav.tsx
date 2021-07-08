
interface NavProps {
  chapters: Array<{id: number, title: string, subchapters: null}>
}

const Nav = ({ chapters }: NavProps) => {
  return (
    <div>
      {chapters.map((chapter: { id: number, title: string }) => 
      <div key={chapter.id}><a href={`/chapter/${chapter.id}`}>{chapter.id}. {chapter.title}</a></div>
      )} 
    </div>
  )
}

export default Nav
