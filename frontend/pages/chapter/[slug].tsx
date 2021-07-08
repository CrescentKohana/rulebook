import { GetStaticProps, GetStaticPaths } from 'next'
import { fetchAPI } from "../../lib/api"
import { InferGetStaticPropsType } from 'next'

import Layout from '../../components/Layout'
import Subchapter from '../../components/Subchapter'

const Chapter = ({ chapters, chapter }: InferGetStaticPropsType<typeof getStaticProps> ) => {
  return <Layout chapters={chapters}>
    <h1>{chapter.id}. {chapter.title}</h1>
    
    {chapter.subchapters.map((subchapter: { id: number, title: string, rules: Array<any> }) => <Subchapter key={subchapter.id} data={subchapter} />) }
  </Layout>
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: '1' } }, { params: { slug: '2' } }, { params: { slug: '3' } }, { params: { slug: '4' } },
      { params: { slug: '5' } }, { params: { slug: '6' } }, { params: { slug: '7' } }, { params: { slug: '8' } },
      { params: { slug: '9' } },
    ], 
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const rulebook = await fetchAPI('/', '?filter=true')
  const chapter = await fetchAPI(`/${params?.slug}`)
  const chapters = rulebook.chapters

  return {
    props: { chapters, chapter },
    revalidate: 1
  }
}

export default Chapter
