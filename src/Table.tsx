import { Link, useNavigate } from 'react-router-dom';
import './Table.css'
import { contextProvider } from './App';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FetchDetailsData } from './FetchDetailsData'
export const Table = (props:{searchParam:URLSearchParams})=>{
    const searchParam =props.searchParam;
    const {tableState, dispatcher} = useContext(contextProvider);
    const {data} = tableState;
    let details=null;
    const deleteHandler=(id: number)=>{
    fetch(`http://localhost:8000/details/${id}`,{
            method:'DELETE',
        }).then(response=>{
            if(response.ok){
                FetchDetailsData('http://localhost:8000/details',{} as URLSearchParams,dispatcher);
            }
        })
    }

   if(searchParam.size>0){
    details = data.filter(curr =>{
            for (const [key, value] of searchParam.entries()) {
                if(curr[key]!==value){
                    return false;
                }
            }
            return true;
        })
   }
   else{
    details=data;
   }
   return(
       <table className='detailTable'>
                <tbody>
                    <tr className='detailRow detailRowHead'>
                        <td className='detailColumn detailColumn1'>Name</td>
                        <td className='detailColumn detailColumn2'>age</td>
                        <td className='detailColumn detailColumn3'>Office</td>
                    </tr>
                {
                    details.map((detail, index)=>{
                        return (
                           <tr className='detailRow' key={`detailRow${index}`}>

                                <td className='detailColumn detailColumn1'> 
                                    <span>{detail.name}</span> 
                                </td>

                                <td className='detailColumn detailColumn2'> 
                                    <span>{detail.age}</span> 
                                </td>

                                <td className='detailColumn detailColumn3'> 
                                    <Link className='detailColumnLink' to={{
                                        pathname:'/details',
                                        search: `?office=${detail.office}`
                                    }}>
                                        {detail.office}
                                    </Link>
                                </td>
                                
                                <td className='detailColumn  detailColumn4'>
                                    <button onClick={()=>deleteHandler(detail.id)}><RiDeleteBin6Line/></button>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
    )
}