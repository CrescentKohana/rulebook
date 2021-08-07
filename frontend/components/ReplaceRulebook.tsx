import { Button, TextField } from "@material-ui/core"
import { FC, useCallback, useState } from "react"
import validator from "validator"
import { postNextAPI } from "../lib/api"
import styles from "../styles/Popup.module.css"

/**
 * Rulebook replacer.
 */
const ReplaceRulebook: FC = () => {
  const defaultHelper = "Enter a direct URL to a correctly formatted text file to replace the rulebook on the site."
  const [url, setURL] = useState("")
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState(defaultHelper)

  const addURL = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const element = event.currentTarget as HTMLInputElement
    setURL(element.value)

    if (!error) {
      const response = await postNextAPI("/api/v1/chapters", { url })
      if (response.code === 201) {
        // Reload the site to fetch new data after a replacing the ruledata.
        window.location.reload()
      } else {
        setError(true)
        setHelperText("There was a problem trying to parse the given file.")
      }
    }
  }

  const onChange = useCallback((event) => {
    const currentUrl: string = event.target.value
    setURL(currentUrl)

    if (currentUrl.length === 0) {
      setError(false)
      setHelperText(defaultHelper)
    } else if (validator.isURL(currentUrl)) {
      setError(false)
      setHelperText("✔️ Valid URL.")
    } else {
      setError(true)
      setHelperText("Not a valid URL.")
    }
  }, [])

  return (
    <div className={styles.container}>
      <form onSubmit={addURL}>
        <TextField
          id="url-input"
          label="URL"
          variant="filled"
          required
          fullWidth={true}
          className={styles.textField}
          error={error}
          helperText={helperText}
          onChange={onChange}
        />
        <Button id="submit-url-btn" variant="contained" color="default" type="submit">
          Replace
        </Button>
      </form>
    </div>
  )
}

export default ReplaceRulebook
