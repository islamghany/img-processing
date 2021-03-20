import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from 'styled-components'
import {useState,useRef,memo} from 'react'
import {Button} from 'rsuite'
import {useDispatch} from 'react-redux';

const ImageCrop =memo ( ({ previewUrl, setImgData, closePreviewImage }) => {
  const dispatch = useDispatch();
  const [crop, setCrop] = useState(previewUrl);
  const [cropper, setCropper] = useState();
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setImgData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  if(!previewUrl) return null
  return  <Container>
        <div className="modal__container">
          <div className="modal">
            <div
              className="modal__body cropper"
              onClick={(e) => e.stopPropagation()}
            >
              <Cropper

                src={`${previewUrl}`}
                style={{ height: "80vh", width: "100%" }}
                zoomable={false}
                aspectRatio={1}
                viewMode={2}
                responsive={true}
                guides={false}
                onInitialized={(instance) => {
                 setCropper(instance);
               }}
              />
              <div className="modal__footer">
                <Button
                  color="red"
                  className="btn btn--outlined-danger"
                  onClick={() => closePreviewImage()}
                >
                  Cancel
                </Button>
                <Button
                  color="green"
                  className="btn btn--contained-success"
                  onClick={() => {
                    dispatch({
                      type:'image',
                      payload:Math.random() * 10000
                    })
                    getCropData();
                    closePreviewImage();
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
    </Container>
});

const Container = styled.div`
.modal {
&__container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  overflow-y:auto;
  width: 100vw;

}
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
&__body {
  width: 45rem;
  background: #f0f0f3;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  &.cropper{
    width: 60rem;
    margin:0 auto;

  }

  @include respond(phone){
    width:95vw;
  }

}
&__footer{
      display: flex;
      justify-content: flex-end;
      padding:1rem;
      > * {
        margin-right:.8rem;
      }
    }
&__list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
&__state {
  &--header {
    padding: 3rem 0;
    display: flex;
    justify-content: center;

    &.success {
      background: #2ecc71;
    }
    &.error {
      background: #ea6153;
    }
  }
  &--tail {
    padding: 1rem 0;
    display: flex;
    justify-content: center;
  }
  &--body {
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 2.4rem;
      font-weight: 300;
    }
    p {
      font-size: 1.4rem;
      color: #666666;
      font-weight: 300;
    }
  }
}
&__item {
  padding: 1.5rem 0;
  line-height: 2.4rem;
  font-size: 1.7rem;
  color: #333;
  align-items: center;
  cursor: pointer;
  text-align: center;
  &:not(:first-child) {
    border-top: 1px solid #dbdbdb;
  }
  &:hover {
    color: $link;
  }
  a {
    display: block;
    width: 100%;
  }

  &.delete {
    color: #ed4956;
    .icon {
      svg {
        fill: #ed4956 !important;
      }
    }
  }
  .icon {
    margin-left: 3rem;
    margin-right: 1rem;
  }
}
 &-enter{
  .modal__container{
    background: transparent;
  }
  .modal__body,.chat__form__container{
    opacity: 0;
    transform: scale(.2);
  }
}
&-enter-active{
  .modal__body,.chat__form__container{
     opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  &.modal__container{
    background: rgba(0, 0, 0, 0.4);
    transition:  background .3s;
  }
}
&-enter-done{
background: rgba(0, 0, 0, 0.4);
}


//exit
&-exit{
  .modal__body,.chat__form__container{
    opacity: 1;
  }
}
&-exit-active{
  .modal__body,.chat__form__container{
    opacity: 0;
transform: scale(0.2);
transition: opacity 300ms, transform 300ms;
  }
}
}
`

export default ImageCrop;
