import Link from 'next/link'

interface NavProps {
  chapters: Array<{id: number, title: string, subchapters: null}>
}

const Nav = ({ chapters }: NavProps) => {
  return (
    <div>
      {chapters.map((chapter: { id: number, title: string }) => 
      <div key={chapter.id}>
        <Link href={`/chapter/${chapter.id}`}><a>{chapter.id}. {chapter.title}</a></Link>
      </div>
      )} 
    </div>
  )
}

export default Nav
