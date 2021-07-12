import { Button, TextField } from "@material-ui/core"
import Router from "next/router"
import { FC, useCallback, useState } from "react"
import validator from "validator"
import { postAPI } from "../lib/api"
import styles from "../styles/popup.module.css"

const AddRulebook: FC = () => {
  const defaultHelper = "Enter a direct URL to a correctly formatted text file to replace the rulebook on the site."
  const [url, setURL] = useState("")
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState(defaultHelper)

  const addURL = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const element = event.currentTarget as HTMLInputElement
    setURL(element.value)

    if (!error) {
      const response = await postAPI("/chapters", { url })
      console.log(response.code)

      if (response.code === 201) {
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
      setHelperText("✔️ Valid URL")
    } else {
      setError(true)
      setHelperText("Not a valid URL")
    }
  }, [])

  return (
    <div className={styles.container}>
      <form onSubmit={addURL}>
        <TextField
          id="url"
          label="URL"
          variant="filled"
          required
          fullWidth={true}
          className={styles.textField}
          error={error}
          helperText={helperText}
          onChange={onChange}
        />
        <Button variant="contained" color="default" type="submit">
          Replace
        </Button>
      </form>
    </div>
  )
}

export default AddRulebook
