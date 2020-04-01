import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'


const FileInput = ({ handleImage }) => {
  const inputRef = useRef(null);

  return (
    <div>
      <Button 
        variant="contained"
        className="aws-btn"
        onClick={() => inputRef.current.click()}
      >
        upload
      </Button>
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{display:'none'}}
        onChange={handleImage}
      />
    </div>
  )
}
export default FileInput;
