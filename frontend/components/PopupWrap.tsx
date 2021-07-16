import { Button } from "@material-ui/core"
import React, { Dispatch, FC, SetStateAction, SyntheticEvent } from "react"
import Popup from "reactjs-popup"
import styles from "../styles/Popup.module.css"

interface PopupProps {
  btnTitle: string
  openState: [boolean, Dispatch<SetStateAction<boolean>>]
  closePopup: (event: SyntheticEvent<Element, Event> | KeyboardEvent | TouchEvent | MouseEvent | undefined) => void
  children: React.ReactNode
}

/**
 * Wrapper for the Popup class with a Button which opens it.
 */
const PopupWrapper: FC<PopupProps> = ({ btnTitle, openState, closePopup, children }) => {
  return (
    <>
      <Button
        id={`${btnTitle.toLowerCase()}-btn`}
        variant="contained"
        color="default"
        onClick={() => openState[1]((o) => !o)}
      >
        {btnTitle}
      </Button>
      <Popup className={styles.modal} open={openState[0]} closeOnDocumentClick onClose={closePopup} modal>
        {children}
      </Popup>
    </>
  )
}

export default PopupWrapper
