import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
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
            console.log(data.data);
            if (data.data.accessToken) {
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
    <div className='max-w-72 mx-auto flex flex-col gap-4 px-4 py-4 rounded-md border border-solid border-gray-500 ' >
         <input ref={emailRef} className='rounded-md border border-solid border-blue-400 px-3 ' type="email" placeholder='Enter email...' />
         <input ref={passwordRef} className='rounded-md border border-solid border-blue-400 px-3 ' type="password" placeholder='Enter password...' />
         <button onClick={log_btn} className='bg-blue-400 text-white rounded-md border-none'>Login</button>
    </div>
  )

}
export default Login