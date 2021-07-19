import { Typography } from "@material-ui/core"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Head from "next/head"
import Link from "next/link"
import { ReactElement } from "react"
import Layout from "../components/Layout"
import { fetchAPI } from "../lib/api"
import * as types from "../types"

/**
 * Home page.
 */
const Home = ({ chapters }: InferGetStaticPropsType<typeof getStaticProps>): ReactElement => {
  return (
    <div>
      <Head>
        <title>Rulebook</title>
      </Head>

      <Layout pageTitle="Rulebook" chapters={chapters}>
        <Typography variant="body1" paragraph={true} align="left">
          On this site one can find well-formatted rules for Magic the Gathering (
          <Link href="https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt">
            <a>source</a>
          </Link>
          ). Aforementioned URL and{" "}
          <Link href="https://raw.githubusercontent.com/Luukuton/rulebook/master/backend/tests/testdata/rulebook_test_data.txt">
            <a>the mock data here</a>
          </Link>{" "}
          can be used with the <b>Replace</b> on the left.{" "}
          <b>
            Replacing the data on the site requires a manual reload because of the nature of Next.js and static site
            generation.
          </b>{" "}
          I hope to change this in the future.{" "}
          <Link href="https://github.com/vercel/next.js/discussions/11552#discussioncomment-2655">
            <a>Some discussion</a>
          </Link>{" "}
          on the topic.
        </Typography>
        <Typography variant="body1" paragraph={true} align="left">
          This is just the frontend which is powered by Next.js + TypeScript. The backend doing the actual parsing is
          written in Go. By Marko Leinikka (2021).
        </Typography>
        <Typography variant="body1" paragraph={true} align="left">
          Hint: Pressing Q opens up the Search!
        </Typography>
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const rulebook = (await fetchAPI("/chapters")) as types.Rulebook
  const chapters: types.Chapter[] = rulebook.chapters

  return {
    props: { chapters },
    revalidate: 1,
  }
}

export default Home
