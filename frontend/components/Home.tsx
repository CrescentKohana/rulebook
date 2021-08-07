import { Typography } from "@material-ui/core"
import Link from "next/link"
import { FC } from "react"

/**
 * Footer used below the navigation and buttons on the left.
 */
const Home: FC = () => {
  return (
    <>
      <Typography variant="h3" align="center">
        Rulebook
      </Typography>
      <Typography variant="body1" paragraph={true} align="left">
        On this site one can find well-formatted rules for Magic the Gathering (
        <Link href="https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt">
          <a>source</a>
        </Link>
        ). Aforementioned URL and{" "}
        <Link href="https://raw.githubusercontent.com/Luukuton/rulebook/master/backend/tests/testdata/rulebook_test_data.txt">
          <a>the mock data here</a>
        </Link>{" "}
        can be used with the <b>Replace</b> on the left.
      </Typography>
      <Typography variant="body1" paragraph={true} align="left">
        This is just the frontend which is powered by Next.js + TypeScript. The backend doing the actual parsing is
        written in Go. By Marko Leinikka (2021).
      </Typography>
      <Typography variant="body1" paragraph={true} align="left">
        <b>Hint: Pressing Q opens up the search!</b>
      </Typography>
    </>
  )
}

export default Home
