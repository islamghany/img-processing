import {Button} from 'rsuite';
import {useDispatch,useSelector} from 'react-redux';
import {useState,useEffect} from 'react'
const ButtonWrapper = ({filter})=>{
  const dispatch = useDispatch();
  const img = useSelector(state=>state.img)
  const [isActive,setIsActive] = useState(false);
  useEffect(()=>{
    if(isActive)
    setIsActive(false)
  },[img,setIsActive])
  const handleClick = ()=>{
    if(!isActive && img){
      dispatch({type:"loading",payload:true});
      setIsActive(true);
      dispatch({
        type:'add_filter',
        payload:filter
      })
      dispatch({
        type:'add',
        payload:filter
      })
    }
  }
  return <Button style={{textTransform:'capitalize'}} onClick={handleClick}>
    {filter}
  </Button>
}

export default ButtonWrapper;
