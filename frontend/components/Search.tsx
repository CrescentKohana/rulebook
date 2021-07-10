import React, { useState, useCallback, FunctionComponent, SyntheticEvent } from "react"
import { Typography, TextField, Card, CardContent } from "@material-ui/core"
import LinkIcon from "@material-ui/icons/Link"
import Link from "next/link"
import styles from "../styles/search.module.css"
import * as types from "../types"
import { search } from "../lib/search"

interface SearchProps {
  chapters: types.Chapter[]
  closePopup:
    | ((event?: SyntheticEvent<Element, Event> | KeyboardEvent | TouchEvent | MouseEvent | undefined) => void)
    | undefined
}

const Search: FunctionComponent<SearchProps> = ({ chapters, closePopup }) => {
  const defaultResults: types.SearchResult[] = []
  const [results, setResults] = useState(defaultResults)
  const [query, setQuery] = useState("")
  const [error, setError] = useState(false)
  const [helperText, sethelperText] = useState("")

  const onChange = useCallback(
    async (event) => {
      setQuery(event.target.value)
      setError(false)
      sethelperText("")

      if (query.length < 3) {
        setError(true)
        sethelperText("At least 3 characers")
        setResults([])
        return
      }

      const results = await search(chapters, query)

      if (results != null && results.length > 0) {
        setResults(results)
      } else {
        sethelperText("No results")
        setResults([])
      }
    },
    [chapters, query]
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

      {results.length > 0 && (
        <ul className={styles.results}>
          {results.map(({ chapterId, comboId, snippet }) => (
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
                        {snippet}...
                      </Typography>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search
