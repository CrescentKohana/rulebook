import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import { ReactElement } from "react"
import Layout from "../../components/Layout"
import Subchapter from "../../components/Subchapter"
import { fetchAPI } from "../../lib/api"
import { addReferences } from "../../lib/references"
import * as types from "../../types"

interface Params extends ParsedUrlQuery {
  id: string
}

/**
 * Server side generated chapter.
 */
const Chapter = ({ chapters, chapter }: InferGetStaticPropsType<typeof getStaticProps>): ReactElement => {
  return (
    <Layout pageTitle={`${chapter.id}. ${chapter.title}`} chapters={chapters}>
      <Head>
        <title>Rulebook | {chapter.title}</title>
      </Head>
      {chapter.subchapters.map((subchapter: types.Subchapter) => (
        <Subchapter key={subchapter.id} chapterId={chapter.id} data={subchapter} />
      ))}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all available chapters during build
  const rulebook = (await fetchAPI("/chapters", "?filter=true")) as types.Rulebook
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

  const rulebook = (await fetchAPI("/chapters")) as types.Rulebook
  const chapters: types.Chapter[] = rulebook.chapters
  let chapter: types.Chapter = chapters[Number(params.slug) - 1] || null

  if (!rulebook || !chapter) {
    return {
      notFound: true,
    }
  }

  chapter = addReferences(chapter)

  return {
    props: { chapters, chapter },
    revalidate: 1,
  }
}

export default Chapter
