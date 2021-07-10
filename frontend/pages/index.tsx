import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import Link from "next/link"
import { ReactElement } from "react"
import Layout from "../components/Layout"
import { fetchAPI } from "../lib/api"
import * as types from "../types"

const Home = ({ chapters }: InferGetStaticPropsType<typeof getStaticProps>): ReactElement => {
  return (
    <div>
      <Head>
        <title>Rulebook</title>
        <meta name="description" content="Rulebook (Next.js / TypeScript)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout chapters={chapters}>
        <h1>Rulebook</h1>
        <p>
          This frontend is powered by Next.js + TypeScript. The backend parsing and serving the ruleset is written by
          Go. By Marko Leinikka (2021).
        </p>
        <p>
          Source for the rules (MagicCompRules 20210419.txt):{" "}
          <Link href="https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt">
            <a>wizards.com</a>
          </Link>
        </p>
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const rulebook = await fetchAPI("/")
  const chapters: types.Chapter[] = rulebook.chapters

  return {
    props: { chapters },
    revalidate: 1,
  }
}

export default Home
