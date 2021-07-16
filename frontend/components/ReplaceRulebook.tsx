import { Button, TextField } from "@material-ui/core"
import Router from "next/router"
import { FC, useCallback, useState } from "react"
import validator from "validator"
import { postNextAPI } from "../lib/api"
import styles from "../styles/Popup.module.css"

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
        // Even with this the user has to reload the site manually after. I wasn't able to debug the cause in
        // reasonable time. When 'on-demand revalidation' is going be available for Next.js, this will be fixed:
        // https://github.com/vercel/next.js/discussions/11552#discussioncomment-2655
        // https://stackoverflow.com/questions/66995817/next-js-static-regeneration-on-demand
        Router.reload()
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
