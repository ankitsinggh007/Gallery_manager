import {FcNext} from "react-icons/fc";
import {FcPrevious} from "react-icons/fc"
import {GrFormAdd} from "react-icons/gr"
import React,{useState,useEffect,useCallback,useContext} from 'react';
import List from './UI/List';
import { store } from "../App";
function LandingPage(props) {
const state=useContext(store);
  const [page, setpage] = useState(1);
  const fetcher = useCallback(async (page)=>{
    const response=await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${page}`)
    const data=await response.json();
    state.setAlbumData(data);
  },[]);
useEffect(()=>{
fetcher(page);
},[fetcher,page])
const form=()=>{

    props.CartOpen(true);
}
    return (
        <>
    <h1 className='text-center capitalize   text-sky-600 font-bold text-2xl font-sans mb-7'>LandingPage</h1>
   <button className="bg-sky-600 p-2 ml-[90rem] text-2xl text-slate-200 rounded-full " onClick={form}>Add an Album<GrFormAdd className="inline"/></button>
{
    state.AlbumData.length>1 && <div>

    <div className='flex flex-wrap justify-evenly content-around'>
{
    state.AlbumData.map((data,i)=>{
        return(
    <List title={data.title} id={data.id} key={i}/>

        )
})
}
    </div>
  {page<11 &&   <button onClick={()=>{
        setpage(page+1);

    }} disabled={page>=10} className={page===10?`h-20 w-48 font-bold ml-[40.5rem] text-xl text-grey-600`:`h-20 w-48 font-bold ml-[40.5rem] text-xl text-sky-600`}>Next page
 <FcNext className="inline "/>
 <FcNext className="inline "/>
   
    </button>}
    {
        page>1 && <button onClick={()=>{
        
            setpage(page-1)
        }} className="h-20 w-48 font-bold  text-xl text-sky-600 "><FcPrevious className="inline text-indigo-700 "/><FcPrevious className="inline text-indigo-700 "/>Previous page
        </button>
    }
    
    </div>
}


    </>
 
    )
}

export default LandingPage;