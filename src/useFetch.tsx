import { useEffect } from "react"
import { TableState,DetailsState } from "./App"
export const useFetch = (url:string, searchParam:URLSearchParams, dispatcher:React.Dispatch<{
    type: string; 
    payload: TableState;
}>)=>{
    useEffect(()=>{
        fetch(url)
        .then(res=>{
            if(!res.ok){
                throw new Error(`Error while Fetching:{url:${url}, statusCode:${res.status}, statusText:${res.statusText}}`);
            }
            return res.json();
        })
        .then((data:DetailsState[])=>{
            if(searchParam.size>0){
                const result = data.filter(curr =>{
                        for (const [key, value] of searchParam.entries()) {
                            if(curr[key]!==value){
                                return false;
                            }
                        }
                        return true;
                    })
                dispatcher({type:'UPDATE', 
                    payload:{
                        data:result.length>0 ? result : [],
                        error: {error:false, msg: null},
                        loading: false
                    }})
            }
            else{
                dispatcher({type:'UPDATE', 
                    payload:{
                        data:data,
                        error: {error:false, msg: null},
                        loading: false
                    }})
            }
        })
        .catch(err=>{
            dispatcher({type:'UPDATE', 
                    payload:{
                        data:[],
                        error: {error:true,msg: err.message==='error' ? `fetch error: ${url}` : err.message },
                        loading: false
                    }})
        })
    }, [url,searchParam])
}