import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { auth, db } from './config/firebase'

import './BlogDetails.css'
import Navbar from './Navbar'

const BlogDetails = (props) => {
  
    const {id} = useParams() 
    const user = auth?.currentUser?.uid
    console.log(user)

    // const [users,setUsers] = useState(false);

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
            navigate('/')
        }).catch((e)=>{
            console.error(e);
        })     
    }

    const users = blog.some(blog => blog.userId === user);
    console.log(users)

    console.log("blog id" + blog.userId)
    console.log(id)

    return (
    <div className='blogDetails'>
    
    <Navbar/>

    <center>
    {
        blog.map((blog)=>{
        return( 
        <div className='blog-details' key={blog.id}>
            <h1>{blog.title}</h1>
            <div>{blog.blog}</div>
            <span className='useLess'></span>
            {/* { blog.userId === id ? setUsers(true) : setUsers(false) } */}
            { users && 
            <div className="buttons">
                <button><Link to={`/update/${blog.id}`} style={{textDecoration:'none',color:'white'}} >Update</Link></button>
                <button onClick={() => deleteBlog(blog.id)} style={{marginLeft:'1rem'}}>Delete </button>
            </div>}
            <p>Written by {blog.author} on {blog.date}</p>
        </div>
        )
        })
    }
    </center>

    </div>
  )
}

export default BlogDetails