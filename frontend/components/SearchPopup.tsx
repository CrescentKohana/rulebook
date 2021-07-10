import { Button } from "@material-ui/core"
import { FC, useEffect, useState } from "react"
import Popup from "reactjs-popup"
import styles from "../styles/search.module.css"
import * as types from "../types"
import Search from "./Search"

interface SearchProps {
  chapters: types.Chapter[]
}

const SearchPopup: FC<SearchProps> = ({ chapters }) => {
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
