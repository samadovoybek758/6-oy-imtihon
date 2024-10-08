import React from 'react'

function FilterCard(props) {
    const {Click_card} = props
    const {thumbnailUrl,authors,title,pageCount,id } = props.data
  return (
    <div onClick={() =>{Click_card(id)}} className='w-96 flex flex-col gap-4 border border-solid border-blue-300 rounded-md px-3 py-4 text-center' >
        <img  className='mx-auto object-cover w-[300px]' src={thumbnailUrl} alt="" />
        <h1 className="text-2xl font-sans">Authors: {
            authors.length > 0 && authors.map(function (author) {
                return author
            })
        }</h1>
        <h2 className="text-xl font-sans">Pages: {pageCount}</h2>
        <h2 className="text-xl font-sans ">Title: {title}</h2>
    </div>
  )
}

export default FilterCard