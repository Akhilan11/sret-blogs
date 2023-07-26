import {  collection, doc,  getDocs,  updateDoc } from 'firebase/firestore';
import React, {  useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from './config/firebase';

const UpdateBlog = () => {
  
    const {id} = useParams() 
    
    
    // const blogTitle = blog.map((blog)=>blog.title)
    // const blogBody = blog.map((blog)=>blog.body)
    // const blogAuthor = blog.map((blog)=>blog.author)
    
    const [blog,setBlog] = useState([]);
    
    const blogTitles = blog.length ? blog[0].title : '';
    const blogBodys = blog.length ? blog[0].blog : '';
    const blogAuthors = blog.length ? blog[0].author : '';
    
    const [title, setTitle] = useState(blogTitles);
    const [body, setBody] = useState(blogBodys);
    const [role, setRole] = useState('Faculty');
    const [name,setName] = useState(blogAuthors);

    console.log("blog title " + blogTitles)
    console.log(title)
    


    // const [blogTitle,setBlogTitle] = useState(blogTitles)
    // const [blogBody,setBlogBody] = useState(blogBodys)
    // const [blogAuthor,setBlogAuthor] = useState(blogAuthors)

    const navigate = useNavigate()
    let now = new Date();

    // Extract the current date components
    let year = now.getFullYear();
    let month = now.getMonth() + 1; // Add 1 because getMonth() returns 0-indexed values
    let day = now.getDate();

    // Format the date string
    let dateString = `${month}/${day}/${year}`;

    const updateBlog = async(id) => {
        const movieDoc = doc(db,"blogs",id);
        await updateDoc(movieDoc,
            {
                title:title,
                blog:body,
                author:name,
                role:role,
                date:dateString,
                userId: auth ?. currentUser ?.uid
            }).then(()=>{
                alert("Successfully updated");
                navigate("/")}).catch((e)=>alert(e))
    }

    const getBlogList = async () => {
        //READ THE DATA
        try{
          const data = await getDocs(collection(db,"blogs"));
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
        getBlogList()
      },[])
  

    return (
    <div>

    <div className="create-blog">
        <h2>Update your Blog</h2>
        {/* <h2>{id}</h2> */}
        <form>
        <label>Blog title:</label>
        <input 
            type="text" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Author Name:</label>
        <input 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <label>Author Role:</label>
        <select
            required
            onChange={(e) => setRole(e.target.value)}
        >
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
        </select>
        <button  onClick={()=>updateBlog(id)}>Update Blog</button>
        </form>
    </div>
    </div>
  )
}

export default UpdateBlog