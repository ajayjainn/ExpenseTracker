import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function CheckAuth({ children }) {

  const user = useSelector(state=>state.auth.user)

  if(user){
    return children;
  }else{
    return <Navigate to={'/login'}/>
  }
  
}

