import React, { FunctionComponent, useState, useEffect } from "react"
import Popup from "reactjs-popup"
import { Button } from "@material-ui/core"
import Search from "./Search"

import styles from "../styles/search.module.css"
import * as types from "../types"

interface SearchProps {
  chapters: types.Chapter[]
}

const SearchPopup: FunctionComponent<SearchProps> = ({ chapters }) => {
  const [open, setOpen] = useState(false)
  const closePopup = () => setOpen(false)

  // Prevent main page scrolling when the search popup is open.
  useEffect(() => {
    open && (document.body.style.overflow = "hidden")
    !open && (document.body.style.overflow = "unset")
  }, [open])

  return (
    <>
      <Button variant="contained" color="default" onClick={() => setOpen((o) => !o)}>
        Search
      </Button>
      <Popup className={styles.modal} open={open} closeOnDocumentClick onClose={closePopup} modal>
        <div>
          <Search chapters={chapters} closePopup={closePopup} />
        </div>
      </Popup>
    </>
  )
}

export default SearchPopup
