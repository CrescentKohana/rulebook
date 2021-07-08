import { GetStaticProps } from 'next'
import { fetchAPI } from "../lib/api"
import { InferGetStaticPropsType } from 'next'

import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Layout from '../components/Layout'

const Home = ({ chapters }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Rulebook (Next.js / TypeScript)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout chapters={chapters}>
        <h2>Home</h2>
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const rulebook = await fetchAPI('/', '?filter=true')
  const chapters = rulebook.chapters

  return {
    props: { chapters },
    revalidate: 1
  }
}

export default Home
