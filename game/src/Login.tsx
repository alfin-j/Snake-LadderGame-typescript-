import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import "./Styles/Login.css"

const Login = () => {
    const navigate = useNavigate();
    const [user,setUser]=useState<string>("")

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
      })
      const onSubmit = async (data:any) => {
        try {
            const response = await fetch('http://localhost:5000/logingame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            console.log("Response status:", response.status); // Log status code
    
            if (response.ok) {
                const result = await response.json();
                console.log('User data saved:', result);
                if(result.username){
                    setUser(result.username)
                    //here we storing in locallly
                    localStorage.setItem("username", result.username);
                }
                navigate("/game")
            } else {
                const error = await response.json();
                console.error('Failed to save data:', error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        console.log(data)
        console.log(typeof(data))
      }
  return (
    <div id="newnothing">
        <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="">Email</label>
        <input type="email" placeholder='enter mail'{...register("email", {
          required: "Please enter youremail",
        })}/>

        <label htmlFor="">Password</label>
        <input type="password" placeholder='enter password'{...register("password", {
          required: "Please enter your password",
        })}/>

        <button  id="newnthbtn" type="submit">Login</button>
      </form>
      <h3>welcome{user}</h3>
    </div>
  )
}

export default Login
