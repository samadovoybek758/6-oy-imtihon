import React, { useRef } from 'react'
import http from '../../axios';
import { useNavigate,Link } from 'react-router-dom';

function Register() {
    const fnameRef = useRef();
    const lnameRef = useRef();
    const emailRef = useRef();
    const ageRef = useRef();
    const passwordRef = useRef();
    const conpasswordRef = useRef();

    const navigate = useNavigate()
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    function Validate() {
        if (fnameRef.current.value < 3) {
            confirm("firstname yaroqsiz");
            fnameRef.current.style.outhlineColor = 'red';
            fnameRef.current.focus()
            return false
        }
        if (lnameRef.current.value < 3) {
            confirm("lastname yaroqsiz");
            lnameRef.current.style.outhlineColor = 'red';
            lnameRef.current.focus()
            return false
        }
        if (ageRef.current.value <= 0) {
            confirm("yoshingizda hatolik ");
            ageRef.current.style.outhlineColor = 'red';
            ageRef.current.focus()
            return false
        }
        if (!validateEmail(emailRef.current.value)) {
            confirm("email yaroqsiz ");
            emailRef.current.style.outhlineColor = 'red';
            emailRef.current.focus()
            return false
        }

        // if (passwordRef.current.value === conpasswordRef.current.value) {
        //     confirm("parollar birxil emas");
        //     passwordRef.current.style.outhlineColor = 'red';
        //     passwordRef.current.focus()
        //     return false
        // }
        return true
    }



    function reg_btn(event) {
        event.preventDefault()

        const isValid = Validate();
        if (!isValid) {
            return
        }
        const user = {
            firstName : fnameRef.current.value,
            lastName : lnameRef.current.value,
            age : ageRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value,
            confirmPassword : conpasswordRef.current.value
        }
        
        http.post('register' , user,{
            headers :{
                'Content-type' : 'application/json'
            }
        })
        .then(function (data) {
            if (data.data.message === "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi") {
                navigate('/login')
            }else(
                alert(data.message)
            )
        })
        .catch(err =>{
            console.log(err);
        })
    }
  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md my-10 flex flex-col gap-4 px-4 py-4'>
        <input ref={fnameRef} className='rounded-md border border-solid border-blue-400 px-6 py-1  ' type="text" placeholder='Enter firstname...' />
        <input ref={lnameRef} className='rounded-md border border-solid border-blue-400 px-6 py-1  ' type="text" placeholder='Enter lastname...' />
        <input ref={ageRef} className='rounded-md border border-solid border-blue-400 px-6 py-1' type="number" placeholder='Enter age...' />
        <input ref={emailRef} className='rounded-md border border-solid border-blue-400 px-6 py-1  ' type="email" placeholder='Enter email...' />
        <input ref={passwordRef} className='rounded-md border border-solid border-blue-400 px-6 py-1 ' type="password" placeholder='Enter password...' />
        <input ref={conpasswordRef} className='rounded-md border border-solid border-blue-400 px-6 py-1 ' type="password" placeholder='Enter repassword...' />

        <button onClick={reg_btn} className='bg-blue-400 py-1 text-white rounded-md border-none'>Register</button>
        <Link to={'/login'} className='text-blue-500'>Akkauntingiz bormi ?</Link>
    </div>
  )
}

export default Register