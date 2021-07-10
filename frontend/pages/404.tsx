import { GetStaticProps, InferGetStaticPropsType } from "next"
import { ReactElement } from "react"
import Layout from "../components/Layout"
import { fetchAPI } from "../lib/api"
import * as types from "../types"

const Custom404 = ({ chapters }: InferGetStaticPropsType<typeof getStaticProps>): ReactElement => {
  return <Layout pageTitle="404 - Page not found" chapters={chapters}></Layout>
}

export const getStaticProps: GetStaticProps = async () => {
  const rulebook = await fetchAPI("/")
  const chapters: types.Chapter[] = rulebook.chapters

  return {
    props: { chapters },
    revalidate: 1,
  }
}

export default Custom404
