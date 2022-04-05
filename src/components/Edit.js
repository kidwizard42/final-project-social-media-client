import React, { useEffect, useRef, useState } from "react"

const Edit = (props) => {
    const [editPost, setEditPost] = useState({...props.edit})
    const [hideEdit, setHideEdit] = useState(true)
    const handleChangeEditPost = (e) => {
        setEditPost({...editPost, [e.target.name]: e.target.value})
        
        }
    const submit = (e) => {
        e.preventDefault()
        props.submitEditPost(editPost)
    }
    const editToggle = () => {
        setHideEdit(!hideEdit)
    }
    return(
        <div >
            <span className="editable" onClick={editToggle}>EDIT</span>
        {hideEdit ? "" :<form onSubmit={submit}>
        User: <input onChange={handleChangeEditPost} name="poster" value={editPost.poster} />
        Post: <input onChange={handleChangeEditPost} name="post" value={editPost.post} />   
        <input type={"submit"}/>  
        </form> }
        
        </div>
    )
}
export default Edit