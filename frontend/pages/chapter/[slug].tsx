import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { ParsedUrlQuery } from "querystring"
import { ReactElement } from "react"
import Layout from "../../components/Layout"
import Subchapter from "../../components/Subchapter"
import { fetchAPI } from "../../lib/api"
import * as types from "../../types"
import Custom404 from "../404"

interface Params extends ParsedUrlQuery {
  id: string
}

const Chapter = ({ chapters, chapter }: InferGetStaticPropsType<typeof getStaticProps>): ReactElement => {
  if (chapters === null || chapter === null) {
    return <Custom404 chapters={chapters} />
  }

  return (
    <Layout pageTitle={`${chapter.id}. ${chapter.title}`} chapters={chapters}>
      {chapter.subchapters.map((subchapter: types.Subchapter) => (
        <Subchapter key={subchapter.id} chapterId={chapter.id} data={subchapter} />
      ))}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all available chapters during build
  const rulebook = await fetchAPI("/", "?filter=true")
  if (rulebook.chapters !== null && rulebook.chapters.length !== 0) {
    const paths = rulebook.chapters.map((chapter) => ({ params: { slug: `${chapter.id}` } }))
    return { paths, fallback: "blocking" }
  }

  // No chapters found. Basically just giving a dummy slug to the renderer.
  const paths = [{ params: { slug: "#" } }]
  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params

  const rulebook = await fetchAPI("/")
  const chapters: types.Chapter[] = rulebook.chapters
  const chapter: types.Chapter = chapters[Number(params.slug) - 1] || null

  return {
    props: { chapters, chapter },
    revalidate: 1,
  }
}

export default Chapter
