import React,{useState,useContext} from 'react'
import Modal from './Modal'
import {store} from "../../App"
function AddPost(props) {
  const state=useContext(store);
  const post= async (data)=>{
  const response=await fetch(`https://jsonplaceholder.typicode.com/albums`,{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
      "content-type":"application/json"
    }
  });
const datares= await response.json();
}
  const [title, settitle] = useState();
  const closeModal=(e)=>{
    props.CartOpen(false);
  }
  const formFilled=(e)=>{
    e.preventDefault();
    console.log(title);
if(title===undefined ){
  return;
}
props.CartOpen(false);
const id=Math.random();
    post({title,id});
    props.setdata(prev=>{
      return[{
        title,id,
      },...prev];
    })
  }
  return (
   <>
   <Modal onclose={props.CartOpen} onSubmit={formFilled  }><div className='rounded-md  bg-gray-300'>
       <form onSubmit={formFilled} className='   text-sky-600 m-5 p-2 text-2xl mb-7 '>
        <label className='font-sans mt-10'>title*</label>
        <br/>
        <input  onChange={(e)=>settitle(e.target.value)} type="text" placeholder='title'></input>
        <br/>
        <div className='h-24 flex justify-end mt-10'>
        <button onClick ={closeModal} className='bg-sky-600 text-white mr-5  h-12 rounded-md p-1'>Cancel</button>
        <button className='bg-sky-600 text-white h-12 rounded-md p-1'>Submit</button>
        </div>
        
        </form> 
        

        </div></Modal>

        </>
  )
}

export default AddPost