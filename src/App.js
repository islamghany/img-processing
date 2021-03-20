import styled,{ThemeProvider} from 'styled-components';
import GlobalStyle from './utils/GlobalStyle'
import theme from './utils/theme'
import {useRef,useEffect,useState,memo} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Button from './components/button';
import Loader from './components/loader';
import Image from './components/image'
import {Tag,Button as RButton} from 'rsuite'
const AppWrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  gap:2rem;
`
const Container = styled.div`
  padding: 2rem;
  display: flex;
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
const RemoveFilters = memo(({hasFilters})=>{
  const dispatch = useDispatch();
  if(!hasFilters) return null
  return <div style={{textAlign:'center'}}>
    <RButton
      onClick={()=>{
        dispatch({
        type:'remove_filter'
      }
    )
    dispatch({
      type:'image',
      payload:Math.random() * 10000
    })
  }
  }
       appearance="primary">
     Remove All filters
  </RButton>
</div>
})
const AppliedFilters = ()=>{
  const filters = useSelector(state=>state.filtersList)
  return <>
    <RemoveFilters hasFilters={filters.length > 0}/>
   <Container>
    {filters.map(item => <Tag key={item.name} color="violet">{item.name}</Tag>)}
  </Container>
 </>
}
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
       <h2 style={{
           padding:'1rem',
           textAlign:'center'
         }}>
        Image Processing
      </h2>
      <AppWrapper>
        <EdegDetection />
        <Image />
        <PixelToPixel />
      </AppWrapper>
      <AppliedFilters />
    </div>
    </ThemeProvider>
  );
}

export default App;
