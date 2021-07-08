import { GetStaticProps, GetStaticPaths } from 'next'
import { fetchAPI } from "../../lib/api"
import { InferGetStaticPropsType } from 'next'
import { ParsedUrlQuery, stringify } from 'querystring'

import Layout from '../../components/Layout'
import Subchapter from '../../components/Subchapter'

interface Params extends ParsedUrlQuery {
  id: string
}

const Chapter = ({ chapters, chapter }: InferGetStaticPropsType<typeof getStaticProps> ) => {
  return <Layout chapters={chapters}>
    <h1>{chapter.id}. {chapter.title}</h1>
    {chapter.subchapters.map(
      (subchapter: { id: number, title: string, rules: Array<any> }) => <Subchapter key={subchapter.id} data={subchapter} />
     )}
  </Layout>
}


export const getStaticPaths: GetStaticPaths = async () => {
  // Get all available chapters during build
  const rulebook = await fetchAPI('/', '?filter=true')
  const paths = rulebook.chapters.map(
    (chapter: { id: number, title: string, rules: null }) => ({ params: { slug: `${chapter.id}` }})
  )

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params

  // API calls in parallel
  const [rulebook, chapter] = await Promise.all([
    fetchAPI('/', '?filter=true'),
    fetchAPI(`/${params.slug}`),
  ]);

  const chapters = rulebook.chapters

  return {
    props: { chapters, chapter },
    revalidate: 1
  }
}

export default Chapter
