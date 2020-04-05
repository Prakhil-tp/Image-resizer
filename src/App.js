import React, { useState } from 'react';
import ImagePreview from './components/ImagePreview';
import ResizeControl from './components/ResizeControl';
import FileInput from './components/FileInput'
import { isMobile } from 'react-device-detect'
import './App.scss';

function App() {
  const [imageList, setImageList] = useState([]);


  const readFile = async file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.result) return resolve(reader.result)
        return reject('no results')
      } 
      reader.readAsDataURL(file);
    })
  }

  const handleImage = async e => {
    const fileList = Array.from(e.target.files);
    if(fileList && fileList.length) {
      let revisedFileList = fileList.filter(imageitem => !imageList.some(image => (
        image.filename === imageitem.name
      )))

      let limit = revisedFileList.length;
      if(isMobile) {
        limit = 10 - imageList.length;
      } else {
        limit = 18 -imageList.length;
      }
      revisedFileList = revisedFileList.slice(0,limit)

      const images = await Promise.all(revisedFileList.map(async file => {
        const dataUri = await readFile(file);
        return {filename: file.name, dataUri, file }
      }))
      setImageList([...imageList, ...images]);
    }
  }

  // remove a single image from the imagelist
  const handleRemoveItem = item => {
    const newImgList = imageList.filter(image => {
      return image.filename !== item.filename
    })
    setImageList(newImgList);
  }

  // clear all images
  const handleClearImageList = () => {
    setImageList([]);
  }

  return (
    <div className="app">
      <div className="title">
        <span>IMAGE RESIZER</span>
      </div>
      <div className="btn-list">
        <FileInput handleImage={handleImage}/>
        <ResizeControl 
          imageList={imageList}
          clearImageList={handleClearImageList}
        />
      </div>
      <span className="file-count">
        {`${imageList.length} / ${isMobile?'10':'18'} ${imageList.length ===1?'file':'files'}`}
      </span>
      <ImagePreview
        imageList={imageList}
        removeItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
