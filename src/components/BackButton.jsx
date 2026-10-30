import { useNavigate } from "react-router-dom";
import buttonStyles from "./Button.module.css"
export default function BackButton() {
    const navigate=useNavigate()
  return <div>
    <button className={buttonStyles.button} onClick={(e)=>{e.preventDefault();navigate(-1)}}>  &larr; Back</button>
  </div>;
}