import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import "./Styles/Register.css"

const Register = () => {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
      })
      const onSubmit = async (data:any) => {
        console.log("submitting data to server",data)
        try {
            const response = await fetch('http://localhost:5000/registergame', {
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
                navigate("/login")
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
    <div id="nothing">
    <form onSubmit={handleSubmit(onSubmit)}>
        <label >Username</label><br/>
        <input type="text" placeholder="enter username"{...register("username", {
          required: "Please enter your first name.",
        })} />

        <label htmlFor="">Email</label>
        <input type="email" placeholder='enter mail'{...register("email", {
          required: "Please enter youremail",
        })}/>

        <label htmlFor="">Password</label>
        <input type="password" placeholder='enter password'{...register("password", {
          required: "Please enter your password",
        })}/>

        <button id="nothingbtn">Register</button>
      </form>
    </div>
  )
}

export default Register
