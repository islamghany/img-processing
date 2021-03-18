import styled from 'styled-components';
import {useSelector} from 'react-redux'
import {Loader} from 'rsuite';


const LoadingContainer = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  position:fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  z-index:1000;
  background:rgba(0,0,0,.4);
  color:#1a1a1a !important;
  .rs-loader-spin::after{
        border-color: #1787e8 transparent transparent !important;
  }
`
const Loading = ()=>{
  const isLoading = useSelector(state=>state.loading);
  if(isLoading) return <LoadingContainer>
    <div className="loader-Container">
      <Loader size="lg"  />
    </div>
  </LoadingContainer>
  return null
}
export default Loading
