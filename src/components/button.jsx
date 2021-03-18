import {Button} from 'rsuite';
import {useDispatch} from 'react-redux';
import {useState} from 'react'
const ButtonWrapper = ({filter})=>{
  const dispatch = useDispatch();
  const [isActive,setIsActive] = useState(false);
  const handleClick = ()=>{
    dispatch({type:"loading",payload:true});
    if(isActive){
      setIsActive(false);
      dispatch({
        type:'remove_filter',
        payload:filter
      })
    }
    else {
      setIsActive(true);
      dispatch({
        type:'add_filter',
        payload:filter
      })
    }
  }
  return <Button style={{textTransform:'capitalize'}} onClick={handleClick} appearance={`${isActive ? 'primary' : 'default'}`}>
    {filter}
  </Button>
}

export default ButtonWrapper;
