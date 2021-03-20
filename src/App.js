import styled,{ThemeProvider} from 'styled-components';
import GlobalStyle from './utils/GlobalStyle'
import theme from './utils/theme'
import {useRef,useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Button from './components/button';
import Loader from './components/loader';
import Image from './components/image'
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
  }
`
let data = {};
let edited = false
const Filter = ()=>{
  const filter = useSelector(state=>state.filter)
  const dispatch = useDispatch();
  console.log(LenaJS)
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [up,setUp] = useState();
  const filtering = (name,add)=>{
    console.log(name)
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
     }
      data[name]=true
    }
   dispatch({type:"loading",payload:false});
  }
  useEffect(()=>{
      if(filter.name) filtering(filter.name,filter.add);
  },[filter])
  return <Container>
     <img id="original-image" ref={imgRef} src="lena.jpg" />
     <canvas id="filtered-image" ref={canvasRef}></canvas>
   </Container>

}

const AppWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  gap:2rem;
`
const ControlContainer = styled.div`
.content{
  display:flex;
  flex-wrap:wrap;
  align-items:flex-start;
  gap:.6rem;
}
  flex:1;
  h4{

  }
`
const EdegDetection = ()=>{
  return <ControlContainer>
    <h4>
      Edge/Line Detection
    </h4><br />
  <div className="content">
    <Button filter="gaussian" />
    <Button filter="bigGaussian" />
    <Button filter="laplacian" />
    <Button filter="prewittVertical" />
    <Button filter="prewittHorizontal" />
    <Button filter="roberts" />
    <Button filter="highpass" />
    <Button filter="lowpass3" />
    <Button filter="lowpass5" />
    <Button filter="sharpen" />
    <Button filter="sobelHorizontal" />
    <Button filter="sobelVertical" />
    <Button filter="noise" />
    </div>
  </ControlContainer>

}
const PixelToPixel = ()=>{
  return <ControlContainer>
    <h4>
      Pixel To Pixel
    </h4><br />
      <div className="content">
    <Button filter="grayscale" />
    <Button filter="sepia" />
    <Button filter="blue" />
    <Button filter="red" />
    <Button filter="invert" />
    <Button filter="mirror" />
    </div>
  </ControlContainer>
}
function App() {
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Loader />
    <div className="App">
       <h2>
        Image Processing
      </h2>
      <AppWrapper>
        <EdegDetection />
        <Image />
       <PixelToPixel />
      </AppWrapper>
    </div>
    </ThemeProvider>
  );
}

export default App;
