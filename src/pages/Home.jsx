import React, { useEffect, useRef, useState } from 'react'
import http from '../../axios'
import Card from '../components/Card';
import FilterCard from '../components/FilterCard';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/loader.webp'

function Home() {
    const [products,setproducts] = useState([]);
    const [bookes, setbookes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
   
    const minRef = useRef()
    const maxRef = useRef()

    const [loading,setloading] = useState(true)
    const navigate = useNavigate()

    useEffect(function () {
        http.get('books')
        .then(data =>{
            setproducts(data.data)
            setloading(false)
        })
        .catch(err =>{
            console.log(err);
        })
    },[])



   

    function filter_btn(event) {
        event.preventDefault()
        setloading(true)
        
        http.get(`books/filter?minPages= ${minRef.current.value}&maxPages= ${maxRef.current.value}`)
        .then(data =>{
            setbookes(data.data)
           
            setloading(false)
        })
        .catch(err =>{
            console.log(err);
        })
    }

    function Click_card(id) {
        navigate(`/product/${id}`)
       
    }
  return (
    <div className='max-w-[1200px] mx-auto'>
        <div className='flex justify-between mb-32'>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Qidiruv maydoni o'zgarishiga o'zgartiring
             className='border border-solid border-gray-500 border-2-2 rounded-md px-3 py-2 w-[400px]' type="text" placeholder='search' />
            <div className='flex flex-row gap-3'>
                <input ref={minRef} className='bg-gray-600 text-white border border-solid border-gray-500 border-2-2 px-2 py-2 rounded-md' type="number" placeholder='min page' />
                <input ref={maxRef} className='bg-gray-600 text-white border border-solid border-gray-500 border-2-2 px-2 py-2 rounded-md' type="number" placeholder='max page' />
                <button onClick={filter_btn} className='bg-slate-500 px-12 py-2 rounded-md border-none text-white '>Filter</button>
            </div>
        </div>
        <div className=' flex flex-wrap mx-auto gap-4'>
        {loading ? (
                    <div className="mx-auto mt-[-30px]">
                        <img className='w-[500px] mt-0' src={loader} alt="" />
                    </div> 
                ) : (
                    <>
                        {bookes.length > 0 ? (
                            bookes.map(book => <FilterCard Click_card={Click_card} data={book} key={book.id} />)
                        ) : (
                            products.map(product => <Card Click_card={Click_card} data={product} key={product.id} />)
                        )}
                    </>
                )}
        </div>
    </div>
  )
}

export default Home