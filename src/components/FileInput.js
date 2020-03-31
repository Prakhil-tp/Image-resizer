import React, { useRef } from 'react'
import { AwesomeButton } from "react-awesome-button";


const FileInput = ({ handleImage }) => {
  const inputRef = useRef(null);

  return (
    <div>
      <AwesomeButton 
        className="aws-btn"
        type="primary"
        onPress={() => inputRef.current.click()}
      >
        upload
      </AwesomeButton>
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
