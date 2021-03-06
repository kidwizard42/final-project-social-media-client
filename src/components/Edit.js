import React, { useEffect, useRef, useState } from "react"

const Edit = (props) => {
    const [editPost, setEditPost] = useState({...props.edit})
    const [hideEdit, setHideEdit] = useState(true)
    const handleChangeEditPost = (e) => {
        setEditPost({...editPost, [e.target.name]: e.target.value})
        
        }
    const submit =  (e) => {
        e.preventDefault()
        props.submitEditPost(editPost)
        setHideEdit(true)
    }
    const editToggle = () => {
        setHideEdit(!hideEdit)
    }
    return(
        <div >
            <span className="editable" onClick={editToggle}>EDIT</span>
        {hideEdit ? "" :<form onSubmit={submit}>
        User: <input onChange={handleChangeEditPost} name="poster"/>
        Post: <input onChange={handleChangeEditPost} name="post" />   
        <input type="submit"/>  
        </form> }
        
        </div>
    )
}
export default Edit