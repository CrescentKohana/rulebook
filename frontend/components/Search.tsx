import { Card, CardContent, TextField, Typography } from "@material-ui/core"
import LinkIcon from "@material-ui/icons/Link"
import Link from "next/link"
import { FC, SyntheticEvent, useCallback, useState } from "react"
import Highlighter from "react-highlight-words"
import { search, SearchResults } from "../lib/search"
import styles from "../styles/search.module.css"
import * as types from "../types"

interface SearchProps {
  chapters: types.Chapter[]
  closePopup:
    | ((event?: SyntheticEvent<Element, Event> | KeyboardEvent | TouchEvent | MouseEvent | undefined) => void)
    | undefined
}

const Search: FC<SearchProps> = ({ chapters, closePopup }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultResults: SearchResults = { data: [], shown: 0, total: 0 }
  const [results, setResults] = useState(defaultResults)
  const [query, setQuery] = useState("")
  const [error, setError] = useState(false)
  const [helperText, sethelperText] = useState("")

  const onChange = useCallback(
    (event) => {
      setQuery(event.target.value)
      const currentQuery: string = event.target.value

      if (currentQuery.length < 3) {
        setError(true)
        sethelperText("At least 3 characters")
        setResults(defaultResults)
        return
      }

      setError(false)
      sethelperText("")

      const results = search(chapters, currentQuery)

      if (results != null && results.total > 0) {
        setResults(results)
        sethelperText(`Showing ${results.shown} out of ${results.total} results.`)
      } else {
        sethelperText("No results")
        setResults(defaultResults)
      }
    },
    [chapters, defaultResults]
  )

  return (
    <div className={styles.container}>
      <TextField
        id="filled-basic"
        label="Search rules"
        variant="filled"
        fullWidth={true}
        className={styles.searchField}
        error={error}
        helperText={helperText}
        onChange={onChange}
        value={query}
      />

      {results.total > 0 && (
        <>
          <ul className={styles.results}>
            {results.data.map(({ chapterId, comboId, snippet }) => (
              <li key={`${chapterId}#${comboId}`} className={styles.result}>
                <Link href={`/chapter/${chapterId}#${comboId}`}>
                  <a onClick={closePopup}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">
                          {comboId + " "}
                          <Typography color="textSecondary" display="inline">
                            Chapter {chapterId}
                          </Typography>
                          <LinkIcon color="primary" className={styles.linkIcon} />
                        </Typography>
                        <Typography variant="body2" component="p">
                          <Highlighter searchWords={[query]} autoEscape={true} textToHighlight={snippet} />
                        </Typography>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Search
