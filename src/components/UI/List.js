 import React,{useState,useContext} from 'react'
import {MdModeEdit} from "react-icons/md"
import{MdDeleteOutline} from "react-icons/md"
import pic from "../UI/Gallery.svg";
import { store } from '../../App';
import Modal from './Modal';
 function List({title,id}) {
  const state=useContext(store);
  const [hoverer, sethoverer] = useState("icons");  
  const [Delete, setDelete] = useState(false);
  const [Update, setUpdate] = useState(false);
  const [UpdatedTitle, setUpdatedTitle] = useState();
    const author="ankit";
    const hover=()=>{
      sethoverer("iconAfter");
    }
    const stophover=()=>{
      sethoverer("icons");
    }
    const deletePost=async (e)=>{
      const index=+e.target.value;
      const response=await fetch(`https://jsonplaceholder.typicode.com/albums/${index}`, {
  method: 'DELETE',
});
const data =await response.json();
console.log(data);
      state.setAlbumData(prev=>{
        const result=prev.filter(element => element.id !== +e.target.value);
        return[
          ...result
        ]
      })
      setDelete(false);
    }
    const updatePost=async (e)=>{
      e.preventDefault();
      const index=+e.target.value;
      if(!UpdatedTitle){
        return;
      }
      else{
    const response=await fetch(`https://jsonplaceholder.typicode.com/albums/${index}`,
    {
      method:"PATCH",
      body: JSON.stringify({
        title: UpdatedTitle,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
            state.setAlbumData(prev=>{
              const index1=prev.findIndex(i=>i.id===index);
              return[
                ...prev,{...prev[index1].title=UpdatedTitle},
              ]
            })
            setUpdate(false);
      }
    }
    return (
      <>
     <div onMouseEnter={hover} onMouseLeave={stophover} className='flex border border-black w-80 my-5 flex-col'>
        <img className='h-fit m-4' src={pic} alt={"gallerypic"}/>
        <div className=' p-2 border text-center h-fit truncate font-semibold'>
            <h1 className='text-center font-semibold underline decoration-2'>Title</h1>  {title}</div>
        <div className='capitalize my-3 text-center font-semibold'>
        <h1 className='text-center font-semibold underline decoration-2'>Author</h1> 
            {author}</div>
            <div className={` ${hoverer}`}><MdModeEdit onClick={()=>{setUpdate(true)}} className='edit'/>
            <MdDeleteOutline onClick={()=>{setDelete(true)}} className='edit' />
            </div>
     </div>
     {
      Delete && <Modal onclose={setDelete}><div className='border-4 rounded-md h-32 bg-slate-50'><div className='text-black font-sans m-2'>Are You sure you want to Delete this album?</div>
      <div className='mt-7 flex justify-center'>
      <button onClick={()=>{setDelete(false)}} className='mr-5 h-10 w-24 rounded bg-sky-600'>NO</button>
      <button onClick={deletePost} value={id} className='ml-10 h-10 w-24 rounded bg-sky-600'>Yes</button>
      </div>
      </div></Modal >
     }
     {
      Update && <Modal  onclose={setUpdate}>
        <form className='rounded-md  bg-gray-300 text-sky-600 m-5 p-2 text-2xl mb-7 '>
        <label className='font-sans mt-10'>title*</label>
        <br/>
        <input  type="text" placeholder='title' onChange={(e)=>{
          setUpdatedTitle(e.target.value);
        }}></input>
        <br/>
        <div className='h-24 flex justify-end mt-10'>
        <button onClick ={()=>{setUpdate(false)}} className='bg-sky-600 text-white mr-5  h-12 rounded-md p-1'>Cancel</button>
        <button onClick={updatePost} value ={id}className='bg-sky-600 text-white h-12 rounded-md p-1'>Submit</button>
        </div>
        
        </form> 
      </Modal>
     }

     </>

   )
 }
 
 export default List