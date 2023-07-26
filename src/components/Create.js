import { useState } from "react";

import './Create.css'
import { db } from "./config/firebase";
import Navbar from "./Navbar";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "./config/firebase";
import { useNavigate } from "react-router-dom";


const Create = () => {
    
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [role, setRole] = useState('Faculty');
    const [name,setName] = useState('');
    
    const navigate = useNavigate()
    let now = new Date();

    // Extract the current date components
    let year = now.getFullYear();
    let month = now.getMonth() + 1; // Add 1 because getMonth() returns 0-indexed values
    let day = now.getDate();

    // Format the date string
    let dateString = `${month}/${day}/${year}`;

    const ref = collection(db,"blogs");
    const saveFile = {
        title:title,
        blog:body,
        author:name,
        role:role,
        date:dateString,
        userId: auth ?. currentUser ?.uid
    }
    const id = ref.id;
    console.log(id);

    const addBlog = async(e) => {
        e.preventDefault()
        console.log(ref)
        try {
            await addDoc(ref,saveFile)

            .then(
                navigate('/')
            )
        } catch (e){
            console.log(e);
        }
    }

    return (
    
    <div>
        <Navbar/>
        <div className="create-blog">
            <h2>Add a New Blog</h2>
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
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
            </select>
            <button onClick={addBlog}>Add Blog</button>
            </form>
        </div>
    </div>
  )
}

export default Create