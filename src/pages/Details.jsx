import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../axios";

function Details() {
  const params = useParams();
  const [books, setbooks] = useState();

  useEffect(function () {
    
      http.get(`books/${params.id}`)
      .then((data) => {
        console.log(data.data);
        setbooks(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




  
  return (
    <div className="max-w-[1200px] mx-auto">
        {books &&
                <div className='max-w-[500px] mx-auto gap-5 border border-solid flex border-gray-600 rounded-md px-6 py-5 text-center' >
                    <img  className=' cover ' src={books.thumbnailUrl} alt="" />
                    <div className="flex flex-col gap-4">
                    <h1 className="text-2xl">Authors: {
                        books.authors.length > 0 && books.authors.map(function (author) {
                        return author
                        })
                    }</h1>
                    <h2>Page: {books.pageCount}</h2>
                    <h2 className="text-xl">Title: {books.title}</h2>
                    </div>
                </div>
            
                }
      
    </div>
  );
}

export default Details;
