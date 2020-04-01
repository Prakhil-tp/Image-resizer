import React from 'react'
import JSZip from 'jszip';
import  Resizer from 'react-image-file-resizer';
import Button from '@material-ui/core/Button'
import { saveAs } from 'file-saver';


const ResizeControl = ({ imageList, clearImageList }) => {

  // image resizer - returns base64 encoded data uri
  const resizer = async file => {
    const ext = file.type.split('/').pop();
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,1280,300,ext,100,0,
        uri => {
          if(uri) return resolve(uri);
          return reject('something wrong. resizing is not completed');
        },
        'base64'
      )
    })
  }

  // returns a list of resized image data uri
  const resizeImageList = async imagefiles => {
    const resizedList = await Promise.all(imagefiles.map(async ({filename, file}) => {
      const imgData = await resizer(file)
      return { filename, dataUri:imgData }
    }))
    return resizedList;
  }

  // returns a zip file, which contains resized images
  const generateZipFile = async resizedImages => {
    const zip = new JSZip();
    for(let item of resizedImages) {
      const { filename, dataUri } = item;
      const idx = dataUri.indexOf('base64,') + 'base64,'.length; // or = 23 if you're sure about the prefix
      const content = dataUri.substring(idx);
      zip.file(filename, content, {base64: true});  
    }
    return zip.generateAsync({type:'blob'});
  } 

  const handleClick = async () => {
    if(imageList && imageList.length) {
      const resizedImages = await resizeImageList(imageList);
      const zipFile = await generateZipFile(resizedImages);
      saveAs(zipFile,"resized-images.zip");
      clearImageList();
    }
  }
  return (
    <div>
      <Button 
        variant="contained"
        className="aws-btn resizer"
        onClick={handleClick}
        disabled={!(imageList && imageList.length)}
      >
        resize
      </Button>
    </div>
  )
}
export default React.memo(ResizeControl)