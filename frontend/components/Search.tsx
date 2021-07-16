import { Card, CardContent, TextField, Typography } from "@material-ui/core"
import LinkIcon from "@material-ui/icons/Link"
import Link from "next/link"
import { CSSProperties, FC, SyntheticEvent, useCallback, useState } from "react"
import Highlighter from "react-highlight-words"
import { FixedSizeList as List } from "react-window"
import { sanitize } from "../lib/sanitizers"
import { search, SearchResults } from "../lib/search"
import styles from "../styles/Popup.module.css"
import * as types from "../types"

interface SearchProps {
  chapters?: types.Chapter[]
  closePopup: (event: SyntheticEvent) => void
}

interface RowProps {
  index: number
  style: CSSProperties
}

/**
 * Search bar and results.
 *
 * @param chapters
 * @param closePopup  when a search result is clicked, the popup is closed.
 */
const Search: FC<SearchProps> = ({ chapters, closePopup }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultResults: SearchResults = { data: [], total: 0 }
  const [results, setResults] = useState(defaultResults)
  const [query, setQuery] = useState("")
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState("Format for finding an exact rule: 100.1a")

  const row: FC<RowProps> = ({ index, style }) => {
    const r = results.data[index]
    return (
      <div
        id={`${r.chapterId}#${r.comboId}`}
        key={`${r.chapterId}#${r.comboId}`}
        className={styles.result}
        style={style}
      >
        <Link href={`/chapter/${r.chapterId}?highlight=${query}#${r.comboId}`}>
          <a onClick={closePopup}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {r.comboId + " "}
                  <Typography color="textSecondary" display="inline">
                    Chapter {r.chapterId}: {r.chapterTitle}
                  </Typography>
                  <LinkIcon color="primary" className={styles.linkIcon} />
                </Typography>
                <Typography variant="body2" component="p">
                  <div className={styles.resultContent}>
                    <Highlighter searchWords={[query]} autoEscape={true} textToHighlight={sanitize(r.snippet)} />
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </a>
        </Link>
      </div>
    )
  }

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
        setHelperText(`Showing ${results.total} results.`)
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
        <div id="search-results">
          <List className={styles.results} height={500} itemCount={results.total} itemSize={150} width={"100%"}>
            {row}
          </List>
        </div>
      )}
    </div>
  )
}

export default Search
