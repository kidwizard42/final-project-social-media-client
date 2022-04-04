import axios from "axios";
import Edit from "./Edit"
import React, { useEffect, useRef, useState } from "react"

const Posts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [postUser, setPostUser] = useState('')
    const [postContent, setPostContent] = useState('')
    
    // const [editTodo, setEditTodo] = useState({ ...props.todo });
    const getPosts =  async () => {
       const res =  await axios.get('http://localhost:8080/posts',{
        auth: {
            username: 'blah',
            password: 'blah'
          }
       })
    //    console.log(res.data)
       setAllPosts(res.data.reverse())
    }
    const deletePost = async (id) => {
      const res = await axios.delete('http://localhost:8080/posts/'+id,
        {
            auth: {
                username: 'blah',
                password: 'blah'
              }
           }
        )
        getPosts()
    }
   
//         const handleChange = (event) => {
//     setEditTodo({ ...editTodo, [event.target.name]: event.target.value });
//     // console.log(editTodo.todo_choices);
//   };
    const submitEditPost = async (edit) => {
        
        console.log(edit);
        
        const res = await axios.put('http://localhost:8080/posts/'+edit.id,edit,
        {
            auth: {
                username: 'blah',
                password: 'blah'
              }
           }
        )
        getPosts()
    }

    // const handleUpdate = async (edit) => {
    //     const idk = await axios.put(herokuSite + "/" + edit.id, edit);
    //     getTodos();
    //   };

    const renderPosts = () => {
        return(
            
            allPosts.map((postData, index) => {
           return(
                <div key={index}>
                <strong>{postData.poster}</strong> : <span> {postData.post}</span>
                <button onClick={() => {
                    deletePost(postData.id)
                }}>Delete</button>
                <div>
                    <Edit edit={postData} submitEditPost={submitEditPost}/>
                </div>
                </div>
            )
        })
        )
        
    }
    const handleChangePoster = (e) => {
        setPostUser(e.target.value)
        // console.log(postUser)
    }
   const  handleChangePost =(e) => {
    setPostContent(e.target.value)
        // console.log(postContent)
    }
    
    const submitPost = async (e) => {
        e.preventDefault()
      const res = await axios.post('http://localhost:8080/posts',{
            post:postContent,
            poster:postUser
        },
        {
            auth: {
                username: 'blah',
                password: 'blah'
              }
           })
        e.target.reset()
		setPostUser("")
        setPostContent("")
        getPosts()
    }

    useEffect( () => {
       getPosts()
    },[])

    return(
        <div>
            <form onSubmit={submitPost}>
              user:  <input onChange={handleChangePoster} required />
              Post: <input onChange={handleChangePost} required />

              
              <input type="submit" />
            </form>

        {renderPosts()}
        bro
        </div>
    )
}

export default Posts