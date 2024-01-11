import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Home.css'
import { Table } from './Table';
import { FetchDetailsData } from './FetchDetailsData';
import { contextProvider } from './App';
import {DispatcherType } from './App';
import LoaderComp from "./Loader"

const retryHandler=(searchParam :URLSearchParams, dispatcher :DispatcherType)=>{
    FetchDetailsData('http://localhost:8000/details', searchParam, dispatcher)
}


export const Home = () => {
    const [searchParam,setSearchParam] = useSearchParams();
    const {tableState, dispatcher} = useContext(contextProvider);
    useEffect(()=>FetchDetailsData('http://localhost:8000/details', searchParam, dispatcher)
    ,[])
    
    const {data:details, loading:isDetailsLoading, error:isDetailsFetchError} = tableState;
    return(
        <div className="Home">
            {isDetailsLoading && <LoaderComp/>}
            {isDetailsFetchError.error && <button onClick={()=>retryHandler(searchParam, dispatcher)}>Retry</button>}
            {details && <Table searchParam={searchParam}/>}
        </div>
    );
}