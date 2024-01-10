import { useState } from "react"
import { useNavigate} from "react-router-dom";
import './CreatePost.css'

export const CreatePost = ()=>{
    const [name,setName] = useState<string>();
    const [age,setAge] = useState<number>();
    const [office,setOffice] = useState<string>();
    const [isPosting,setPosting] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const submitPost = (e:React.FormEvent<HTMLFormElement>)=>{
        setError(false);
        setPosting(true);
        e.preventDefault();
        if((!name || name.length<=0) || (!age || (age<18 || age>50)) || (!office || office.length<=0)){
            setError(true);
            setPosting(false);
            return
        }
        fetch('http://localhost:8000/details',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name, age, office})
        })
        navigate('/');
        setPosting(false);
    }

    return(
        <form onSubmit={e=>submitPost(e)}>
            <div className='detailsForm'>
                <label>Name</label>
                <input type='text' value={name} onChange={e=>{setError(false); setName(e.target.value.trim())}}/>
                <label>Age</label>
                <input type='number' value={age} onChange={e=>{setError(false); setAge(parseInt(e.target.value))}}/>
                <label>Office</label>
                <input type='text' value={office} onChange={e=>{setError(false); setOffice(e.target.value.trim())}}/>
            </div>
            <div className='detailsFormSubmit'>
                {isPosting ? <button disabled>Posting...</button> : <button>Submit</button>}
                {isError && <span>Values are not as expected</span>}
            </div>
        </form>
    )
}