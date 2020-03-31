import React from 'react'
import shortid from 'shortid';
import './styles.scss'

const ImagePreview = ({ imageList, removeItem }) => {
  
  return (
    <div className="image-preview-container">
      <div className="wrap">
        {
            imageList.map(item => (
              <div 
                className="image-container"
                key={shortid.generate()} 
              >
                <img
                  className="preview-image"
                  src={item.dataUri}
                  alt="uploaded-item"
                />
                <span 
                  className="material-icons remove-trash"
                  onClick={() => removeItem(item)}
                >
                  delete_forever
                </span>
              </div>
            ))
          }
      </div>
    </div>
  );
}
export default React.memo(ImagePreview);