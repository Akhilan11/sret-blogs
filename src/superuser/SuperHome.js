import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../components/config/firebase'
import { Link } from 'react-router-dom'

const SuperHome = () => {
    
    console.log(auth?.currentUser?.email)
    
    const [blog,setBlog] = useState([]);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    
    const authen = "abcd@gmail.com";
    
    useEffect (()=>{
        if (auth.currentUser.email == authen){
        setIsLoggedIn(true);
        }
        else{
            setIsLoggedIn(false);
        }
    },[auth.currentUser]);

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
            const filteredData = blog.filter((data) => data.role === "Student");
            setBlog(filteredData);
        } else if (selectedValue === "Faculty") {
            const filteredData = blog.filter((data) => data.role === "Faculty");
            setBlog(filteredData);
        } else if (selectedValue === "my") {
            const filteredData = blog.filter(
            (data) => data.id === auth?.currentUser?.uid
            );
            setBlog(filteredData);
        } else {
            // If "All" option is selected, get all the blogs again from Firestore
            getBlogList();
        }
        }
          
  
    return (
    <div>
        <Navbar/>

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
            {isLoggedIn
                &&(
            <div>
                {
                blog.map((blog)=>{
                    return( 
                    <div className="blog-preview" key={blog.id}>
                        <Link to={`superDetails/${blog.id}`}>
                        <h2>{blog.title}</h2>
                        <div>{blog.blog.split(" ").slice(0,40).join(" ")} <span style={{opacity:0.5}}>see more...</span></div>
                        <p>Written by {blog.author}({blog.role}) on {blog.date}</p>
                        {/* <p>{blog.id}</p> */}
                        </Link>
                    </div>
                    )
                })
                }
            </div>)
            }

            </center>
            </div>  
        </div>

    </div>
  )
}

export default SuperHome