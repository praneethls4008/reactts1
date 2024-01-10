import { Link } from 'react-router-dom';
import './Table.css'
import { contextProvider } from './App';
import { useContext, useEffect } from 'react';
export const Table = (props:{searchParam:URLSearchParams})=>{
const searchParam =props.searchParam;
   const {tableState, dispatcher} = useContext(contextProvider);
   const {data} = tableState; 
   let details=null;

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
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
    )
}