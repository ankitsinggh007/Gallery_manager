import  ReactDOM from "react-dom";


const Backdrop=(props)=>{
    return(
            <div onClick={()=>{
                props.onclose(false);
            }}className="Blur">{props.children}</div>
        )
}
const Modal1=(props)=>{

    return(
<div className="Modal1">{props.children}</div>

    )
}
const Modal=(props)=>{
    return(
        <>
        
        {
            ReactDOM.createPortal(<Backdrop onclose={props.onclose}/>,document.getElementById("Overlay"))
        }
        {
            ReactDOM.createPortal(<Modal1>{props.children}</Modal1>,document.getElementById("Overlay"))
        }
        </>
    ) 
}
export default Modal;