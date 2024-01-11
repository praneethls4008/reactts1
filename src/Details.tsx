import { useSearchParams } from "react-router-dom";
import { Table } from "./Table"
import { NotFound } from "./NotFound";
import { useContext, useEffect } from "react";
import { contextProvider } from './App';

export const Details=()=>{
    const [searchParam] = useSearchParams();
    const {tableState} = useContext(contextProvider);
    const {data:details, error:isError, loading:isLoading} = tableState;
    
    return (
        <div className="Details">
             {isError.error && <div>{isError.msg}</div>}
             {isLoading && <div>Loading....</div>}
             {details && <Table searchParam={searchParam}/>}
             {!isError.error && !isLoading && !details && <NotFound/>}
        </div>
        
    )
}