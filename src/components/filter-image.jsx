import styled from 'styled-components';
import {useRef,useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Button} from 'rsuite'
import download from 'downloadjs'
const LenaJS = require('lena.js');


const Container = styled.div`
  margin: 0 auto;
  position: relative;
  width:400px;
  img{
    width:100%;
    object-fit: cover;
  }
  #filtered-image{
    left: 0;
    position: absolute;
    top: 0;
    display: block;
    &.hidden{
      z-index:-1;
    }
  }
`
let mounted = false
let data = {};
let edited = false
const Filter = ({img})=>{
  const filter = useSelector(state=>state.filter)
  const save = useSelector(state=>state.download)
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [up,setUp] = useState(true);
  const filtering = (name,add)=>{
    if(add === true){
      var filter = LenaJS[name];
      if(edited){
        LenaJS.redrawCanvas(canvasRef.current, filter);
      }
      else{
       var filter = LenaJS[name];
       LenaJS.filterImage(canvasRef.current, filter, imgRef.current);
      // LenaJS.histogram(imgRef.current)
       edited=true
       setUp(true)
     }
      data[name]=true
    }
    if(add === false){
      edited=false;
      setUp(false);
      dispatch({
        type:'remove'
      })
    }
    dispatch({
      type:'filtred_img',
      payload:canvasRef.current.toDataURL("image/png")
    })
   dispatch({type:"loading",payload:false});
  }
  const saveImg=()=>{
    let x = canvasRef.current.toDataURL("image/png");
    download( x, `img_proc${Math.random() * 99999}.png`, "image/png" );

  }
  useEffect(()=>{
      if(filter.name || filter?.add === false) filtering(filter.name,filter.add);
  },[filter])
  useEffect(()=>{
    if(!mounted){
      mounted = true;
      return
    }
    dispatch({
      type:'remove'
    })
     edited=false;
     setUp(false)
  },[img])
  useEffect(()=>{
    if(save) saveImg();
  },[save])
  return <Container>
     <img id="original-image" ref={imgRef} src={img} />
    <canvas id="filtered-image" className={edited || up ? '':'hidden'} ref={canvasRef}></canvas>
 </Container>

}

export default Filter
