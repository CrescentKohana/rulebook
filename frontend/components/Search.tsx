import { Card, CardContent, TextField, Typography } from "@material-ui/core"
import LinkIcon from "@material-ui/icons/Link"
import Link from "next/link"
import { FC, SyntheticEvent, useCallback, useState } from "react"
import Highlighter from "react-highlight-words"
import { sanitize } from "../lib/sanitizers"
import { search, SearchResults } from "../lib/search"
import styles from "../styles/Popup.module.css"
import * as types from "../types"

interface SearchProps {
  chapters?: types.Chapter[]
  closePopup: (event: SyntheticEvent) => void
}

/**
 * Search bar and results.
 *
 * @param chapters
 * @param closePopup  when a search result is clicked, this closes the whole popup
 * @returns JSON response as Rulebook
 */
const Search: FC<SearchProps> = ({ chapters, closePopup }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultResults: SearchResults = { data: [], shown: 0, total: 0 }
  const [results, setResults] = useState(defaultResults)
  const [query, setQuery] = useState("")
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState("Format for finding an exact rule: 100.1a")

  const onChange = useCallback(
    (event) => {
      setQuery(event.target.value)
      const currentQuery: string = event.target.value

      if (currentQuery.length < 3) {
        setError(true)
        setHelperText("At least 3 characters.")
        setResults(defaultResults)
        return
      }

      setError(false)
      setHelperText("")

      const chaptersHelper = chapters == null ? [] : chapters
      const results = search(chaptersHelper, currentQuery)

      if (results != null && results.total > 0) {
        setResults(results)
        setHelperText(`Showing ${results.shown} out of ${results.total} results.`)
      } else {
        setHelperText("No results.")
        setResults(defaultResults)
      }
    },
    [chapters, defaultResults]
  )

  return (
    <div className={styles.container}>
      <TextField
        id="search-box"
        label="Search for rules"
        variant="filled"
        fullWidth={true}
        className={styles.textField}
        error={error}
        helperText={helperText}
        onChange={onChange}
        value={query}
      />

      {results.total > 0 && (
        <>
          <ul id="search-results" className={styles.results}>
            {results.data.map(({ chapterId, comboId, snippet }) => (
              <li id={`${chapterId}#${comboId}`} key={`${chapterId}#${comboId}`} className={styles.result}>
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
                          <Highlighter searchWords={[query]} autoEscape={true} textToHighlight={sanitize(snippet)} />
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
