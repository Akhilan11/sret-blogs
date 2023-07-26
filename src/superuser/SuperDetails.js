import React, { useEffect, useState } from 'react'
import { auth, db } from '../components/config/firebase'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'

const SuperDetails = () => {

    const {id} = useParams()  
    const navigate = useNavigate()

    const [blog,setBlog] = useState([]);
    const ref = collection(db,"blogs")

    const getBlogList = async () => {
        //READ THE DATA
        try{
          const data = await getDocs(ref);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id,
          })).filter((obj) => obj.id === id);
          console.log(filteredData); 
          setBlog(filteredData);
        }
        catch(err) {
          alert(err)
          console.error(err);
        }
      }

      useEffect(()=>{
        getBlogList();
      },[])
  
    const deleteBlog = async (id) => {
        const blogDoc = doc(db,"blogs",id);
        await deleteDoc(blogDoc)
        .then(()=>{
            alert("Successfully Deleted")
            navigate('/superHome')
        }).catch((e)=>{
            console.error(e);
        })     
    }
  
    return (
    <div>

    <div className='blogDetails'>
        <Navbar/>
        <center>
        {
            blog.map((blog)=>{
            return( 
            <div className='blog-details' key={blog.id}>
                <h1>{blog.title}</h1>
                <div>{blog.blog}</div>
                <p>Written by {blog.author} on {blog.date}</p>
                <button onClick={() => deleteBlog(blog.id)}>Delete </button>
            </div>
            )
            })
        }
        </center>
    </div>

    </div>
  )
}

export default SuperDetails