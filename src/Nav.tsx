import { useContext, useRef, useState } from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';
import { contextProvider } from './App';
export const Nav = () => {
    const [search,setSearch] = useState('');
    const {tableState}= useContext(contextProvider)
    const {data} = tableState;
    const inputRef = useRef<HTMLInputElement>(null);
    const dropDownRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const searchHandler = (KeyBoardEvent :React.KeyboardEvent<HTMLInputElement>)=>{
        if(KeyBoardEvent.key==='Enter'){
            navigate(`/details?office=${search}`);
            setSearch('');
        }
        if(KeyBoardEvent.key==='Escape'){
            setSearch('');
            inputRef.current && inputRef.current.blur();
        }
        
    }

    const linkClickHandler = (id:number)=>{
        setSearch('');  
    }

    return(
        <div className="Nav">
            <Link to='/'><h1>Navigation bar</h1></Link>
            <div className="NavLinks">
                <Link className='NavLinkHref' to={'/redux'}>Home</Link>
                <div className='searchContainer'>
                    <input ref={inputRef} onMouseEnter={(e)=>console.log('mouseEnteredinp')} onMouseLeave={(e)=>console.log('mouseLeftinp')} className='searchInput' placeholder={'Search here'} value={search} onClick={()=>{setSearch('')}} onChange={e=>setSearch(e.target.value)} onKeyDown={searchHandler} />
                    {(search && data) && 
                        <div ref={dropDownRef} onMouseEnter={(e)=>console.log('mouseEnteredDrop')} onMouseLeave={(e)=>console.log('mouseLeftDrop')} className='searchDropDown'>
                            {
                                data.filter(currObj => currObj.name.includes(search) || currObj.office.includes(search) || currObj.id===Number(search))
                                    .map((filteredObj,index) => 
                                    <Link className='searchDropDownLink' key={`searchDropDown${index}`} to={`/details/${filteredObj.id}`} onClick={()=>linkClickHandler(filteredObj.id)}>
                                        {`${filteredObj.id} ${filteredObj.name} ${filteredObj.office} `}
                                    </Link>
                                )
                            }
                        </div>
                    }
                </div>
                <Link className='NavLinkHref' to={'/create'}>Create</Link>
            </div>
        </div>
    );
}