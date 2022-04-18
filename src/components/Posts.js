import axios from "axios";
import Edit from "./Edit"
import React, { useEffect, useRef, useState } from "react"
import '../App.css'

const herokuJavaBackend = "https://pacific-journey-81010.herokuapp.com/"

const Posts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [postUser, setPostUser] = useState('')
    const [postContent, setPostContent] = useState('')
    
    
    const getPosts =  async () => {
       const res =  await axios.get(herokuJavaBackend+'posts',{
        auth: {
            username: 'blah',
            password: 'blah'
          }
       })
       setAllPosts(res.data.reverse())
    }

    const deletePost = async (id) => {
      const res = await axios.delete(herokuJavaBackend+'posts/'+id,
        {
            auth: {
                username: 'blah',
                password: 'blah'
              }
           }
        )
        getPosts()
    }
   

    const submitEditPost = async (edit) => {
        
        // console.log(edit);
        
        const res = await axios.put(herokuJavaBackend+'posts/'+edit.id,edit,
        {
            auth: {
                username: 'blah',
                password: 'blah'
              }
           }
        )
        getPosts()
        
    }

    const renderPosts = () => {
        return(
            
            allPosts.map((postData, index) => {
           return(
                <div className="seperatePost" key={index}>
                <strong>{postData.poster}</strong> : <span> {postData.post}</span>
                <button className="deleteBtn" onClick={() => {
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
      const res = await axios.post(herokuJavaBackend+'posts',{
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
        // renderPosts()
    }

    useEffect( () => {
       getPosts()
    },[])

    return(<>
        <h3 className="makeAPostH2">Make a post</h3>
        <div className="posts">
            <form onSubmit={submitPost}>
                <div>user:  <input onChange={handleChangePoster} required /></div>
              <div>Post: <input onChange={handleChangePost} required /></div>
            
              <input type="submit" />
            </form>

        {renderPosts()}
        </div>
        </>)
}

export default Posts