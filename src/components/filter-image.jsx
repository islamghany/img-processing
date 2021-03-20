import styled from 'styled-components';
import {useRef,useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
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
  const dispatch = useDispatch();
  console.log(LenaJS)
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [up,setUp] = useState(true);
  const filtering = (name,add)=>{
    if(add === true && !data[name]){
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
   dispatch({type:"loading",payload:false});
  }
  useEffect(()=>{
      if(filter.name) filtering(filter.name,filter.add);
  },[filter])
  useEffect(()=>{
    console.log(img)
    if(!mounted){
      mounted = true;
      return
    }
     edited=false;
     setUp(false)
  },[img])
  return <Container>
     <img id="original-image" ref={imgRef} src={img} />
    <canvas id="filtered-image" className={edited || up ? '':'hidden'} ref={canvasRef}></canvas>
   </Container>

}

export default Filter
