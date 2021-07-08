import { GetStaticProps } from 'next'
import { fetchAPI } from "../lib/api"
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import * as types from '../types'
import styles from '../styles/Layout.module.css'
import Layout from '../components/Layout'

const Home = ({ chapters }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rulebook</title>
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
  const chapters: types.Chapter[] = rulebook.chapters

  return {
    props: { chapters },
    revalidate: 1
  }
}

export default Home
