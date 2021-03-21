import { useCallback, useEffect, useState, memo,useRef } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import ImageCrop from './image-crop'
import {Button,Divider} from 'rsuite'
import FilterImage from './filter-image'
function Fileimage(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" {...props}><path d="M159 336l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0l-39 39L63 448h256V304l-55.5-55.5c-4.7-4.7-12.3-4.7-17 0L159 336zm96-50.7l32 32V416H95.1l.3-67.2 15.6-15.6 48 48c20.3-20.3 77.7-77.6 96-95.9zM127 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm0-96c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm242.9-62.1L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM256 32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5zM352 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304z" /></svg>;
}

const UploaderContainer = styled.div`
    margin: 0 auto;
    position: relative;
    flex:1;

  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    outline: none;
    position: relative;
    .error {
      height: 0.4rem;
      width: 100%;
      background: transparent;
      &.active {
        background: red;
      }
    }

  }
  .active-drag {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.4);
      border: 2px dashed #666;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        margin-right: 0.8rem;
      }
    }
  }
  .box {
    padding: 2rem 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff
    border: 1px solid #1a1a1a;
  }
  .icon {
    svg {
      width: 5rem;
      height: 5rem;
    }
    margin-bottom: 2rem;
  }
  p {
    text-align: center;
  }
`;
function UploadIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="#6563ff"
        d="M15.707 5.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L11 5.414V17a1 1 0 002 0V5.414l1.293 1.293a1 1 0 001.414-1.414z"
      />
      <path
        fill="#a2a1ff"
        d="M18 9h-5v8a1 1 0 01-2 0V9H6a3.003 3.003 0 00-3 3v7a3.003 3.003 0 003 3h12a3.003 3.003 0 003-3v-7a3.003 3.003 0 00-3-3z"
      />
    </svg>
  );
}

const Image = ()=>{
  const [previewUrl, setPreviewUrl] = useState(null);
  const [cropData, setCropData] = useState();
  const [width, setWidth] = useState('100')
  const imgRef = useRef(null);

  const onDrop = useCallback((acceptedImage) => {
    setupReader(acceptedImage[0]);
  }, []);
  function setupReader(img) {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(img);
  }
  // useEffect(()=>{
  //   console.log(image)
  // },[image])
  const {
    rejectedFiles,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
  });
  return <UploaderContainer>
    {previewUrl?.length && <ImageCrop closePreviewImage={()=>setPreviewUrl(null)}  previewUrl={previewUrl} setImgData={(e,w)=>
      {
        setCropData(e)
        setWidth(w)
      }
      } />}
      <div className="container" {...getRootProps()}>
       {cropData ? <FilterImage img={cropData} width={width} /> :
        <div className="box">
         <div className="icon">
           <UploadIcon />
         </div>

         <p>Drag & Drop your Images here</p>
         <Divider />
         <p>or</p>
       <Button onClick={open}>Upload Image</Button>
       </div>}
       <input {...getInputProps()} />
        {isDragActive && (
          <div className="active-drag">
            <div className="icon">
              <Fileimage />
            </div>
            <h3>Drag Your SVGs here</h3>
          </div>
        )}
        {rejectedFiles && <p>error there are error in upload files</p>}
      </div>
    </UploaderContainer>
}

export default Image;
