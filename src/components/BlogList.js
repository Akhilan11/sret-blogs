import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { Link } from "react-router-dom";

import './BlogList.css'

const BlogList = () => {
  
    console.log(auth?.currentUser?.email)
    const [blog,setBlog] = useState([]);

    const ref = collection(db,"blogs")

    const getBlogList = async () => {
    //READ THE DATA
    try{
        const data = await getDocs(ref);
        const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id:doc.id,
        }));
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
  
     
    function handleSelectChange(event) {
    const selectedValue = event.target.value;
    console.log(`Selected value: ${selectedValue}`);

    if (selectedValue === "Student") {
        getBlogList();
        const filteredData = blog.filter((data) => data.role === "Student");
        setBlog(filteredData);
    } else if (selectedValue === "Faculty") {
        getBlogList();
        const filteredData = blog.filter((data) => data.role === "Faculty");
        setBlog(filteredData);
    } else if (selectedValue === "my") {
        getBlogList();
        const filteredData = blog.filter(
        (data) => data.userId === auth?.currentUser?.uid
        );
        setBlog(filteredData);
    } else {
        // If "All" option is selected, get all the blogs again from Firestore
        getBlogList();
    }
    }
      

    return (
        <div>
        <center>
        <div className="head">
            <h1 className='title'>All Blogs! </h1>

            <select className='option' onChange={handleSelectChange}>
            <option value="All">All Blogs</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="my">My Blog</option>
            </select>
        </div>
        </center>
        <div className="blog">
        <center>
        {
          blog.map((blog)=>{
            return( 
            <div className="blog-preview" key={blog.id}>
                <Link to={`blog/${blog.id}`}>
                <h2>{blog.title}</h2>
                <div>{blog.blog.split(" ").slice(0,40).join(" ")} <span style={{opacity:0.5}}>see more...</span></div>
                <p>Written by {blog.author}({blog.role}) on {blog.date}</p>
                {/* <p>{blog.id}</p> */}
                </Link>
            </div>
            )
          })
        }
        </center>
    </div>
    </div>
  )
}

export default BlogList