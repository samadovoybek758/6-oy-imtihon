import React, { useRef } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import http from '../../axios';


function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    function Validate() {
        if (!validateEmail(emailRef.current.value)) {
            confirm("email yaroqsiz ");
            emailRef.current.style.outhlineColor = 'red';
            emailRef.current.focus()
            return false
        }
        return true
    }

    function log_btn(event) {
        event.preventDefault()

        const isValid = Validate()
        if (!isValid) {
            return
        }

        const user = {
            email : emailRef.current.value,
            password : passwordRef.current.value
        }

        http.post('login' , user,{
            headers :{
                'Content-type' : 'application/json'
            }
        })
        .then(function (data) {
            
            if (data.data.accessToken) {
                localStorage.setItem('token', data.data.accessToken)
                navigate('/')
            }else(
                alert(data.message)
            )
        })
        .catch(err =>{
            console.log(err);
        })
    }
    

  return (
    <div className=' max-w-md mx-auto p-6 bg-white shadow-md my-20  flex flex-col gap-4 px-4 py-4 rounded-md' >
         <input ref={emailRef} className='rounded-md border border-solid  border-blue-400 px-3 py-1 ' type="email" placeholder='Enter email...' />
         <input ref={passwordRef} className='rounded-md border border-solid border-blue-400 px-3 py-1 ' type="password" placeholder='Enter password...' />
         <button onClick={log_btn} className='bg-blue-400 text-white rounded-md border-none py-1'>Login</button>
         <Link to={'/register'} className='text-blue-500'>Ro'yhatdan o'ting!</Link>
    </div>
  )

}
export default Login