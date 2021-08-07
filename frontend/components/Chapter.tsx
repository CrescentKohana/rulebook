import { Typography } from "@material-ui/core"
import Head from "next/head"
import { ReactElement } from "react"
import * as types from "../types"
import Subchapter from "./Subchapter"

interface ChapterProps {
  chapter: types.Chapter
}

/**
 * A chapter. Has subchapters.
 */
const Chapter = ({ chapter }: ChapterProps): ReactElement => {
  return (
    <>
      <Head>
        <title>Rulebook | {chapter.title}</title>
      </Head>
      <Typography variant="h3" align="center">
        {chapter.title}
      </Typography>
      {chapter.subchapters.map((subchapter: types.Subchapter) => (
        <Subchapter key={subchapter.id} chapterId={chapter.id} data={subchapter} />
      ))}
    </>
  )
}

export default Chapter
