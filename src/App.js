import React, { useState } from 'react';
import ImagePreview from './components/ImagePreview';
import ResizeControl from './components/ResizeControl';
import FileInput from './components/FileInput'
import "react-awesome-button/dist/styles.css";
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
    const revisedFileList = fileList.filter(imageitem => !imageList.some(image => (
      image.filename === imageitem.name
    )))
    const images = await Promise.all(revisedFileList.map(async file => {
      const dataUri = await readFile(file);
      return {filename: file.name, dataUri, file }
    }))
    setImageList([...imageList, ...images]);
  }

  const handleRemoveItem = item => {
    const newImgList = imageList.filter(image => {
      return image.filename !== item.filename
    })
    setImageList(newImgList);
  }

  return (
    <div className="app">
      <div className="btn-list">
        <FileInput handleImage={handleImage}/>
        <ResizeControl imageList={imageList} />
      </div>
      <span className="count">
        {`// ${imageList.length} ${imageList.length ===1?'file':'files'}`}
      </span>
      <ImagePreview
        imageList={imageList}
        removeItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
