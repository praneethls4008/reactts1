import { useDispatch, useSelector } from "react-redux"
import { RootStoreType } from "./Store"
import { inc } from "./ReduxSlice"


export const ReduxElement = ()=>{
    const dispatch = useDispatch();
    const reduxDispatch=()=>{
        dispatch(inc());
    } 
    const msg = useSelector((state: RootStoreType)=>state.redux.msg);
    return(
        <>
            <div>{msg}</div>
            <button onClick={reduxDispatch}>click</button>
        </>

    )
}