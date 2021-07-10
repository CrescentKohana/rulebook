import React, { FunctionComponent, useState } from "react"
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
  return (
    <>
      <Button variant="contained" color="default" onClick={() => setOpen((o) => !o)}>
        Search
      </Button>
      <Popup className={styles.modal} open={open} closeOnDocumentClick onClose={closePopup} modal>
        <div className={styles.modal}>
          <Search chapters={chapters} closePopup={closePopup} />
        </div>
      </Popup>
    </>
  )
}

export default SearchPopup
