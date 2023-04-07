import "./write.css";
import { useLocation } from "react-router";
import {PostContext} from "../../context/post/postContextState"
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../context/Context";
import {Navigate, Route, Routes, useParams} from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Homepage from "../homepage/Homepage";
import Register from "../register/Register";
import Login from "../login/Login";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState({});
  const {getPosts, addPost} = useContext(PostContext);
  let {user} = useContext(Context);
  const {pathname} = useLocation()
  const {id: postId} = useParams()
  const getPostsHandler = async ()=>{
    try {
      return await getPosts()
    }catch (e){
      console.log(e)
    }

  }
  /*useEffect(() => {
    setgetPostsHandler()
    debugger
    getPosts().then((posts)=>{
      debugger
        setPost(posts.filter((p)=> p._id === postId))
        setTitle(post.title)
        setContent(post.content)
      debugger
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])*/


  const onSubmit = e => {
    e.preventDefault();
    const newPost = {
      author : 'wiem',
      title,
      content
    }
    addPost(newPost);
  }

    return (
        <div className="write">
          {!postId && <img
              className="writeImg"
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
          />}
          {postId && post && <img
              className="writeImg"
              src={post.imageCover}
              alt=""
          />}

          <form className="writeForm" onSubmit={onSubmit}>
            <div className="writeFormGroup">
              <label htmlFor="fileInput">
                <i className="writeIcon fas fa-plus"></i>
              </label>
              <input id="fileInput" type="file" style={{ display: "none" }} />
              <input
                  className="writeInput"
                  placeholder={postId && post ? post.title : "Title"}
                  type="text"
                  value={title}
                  autoFocus={true}
                  onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="writeFormGroup">
          <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              type="text"
              value={content}
              autoFocus={true}
              onChange={(e) => setContent(e.target.value)}
          />
            </div>
            <button className="writeSubmit" type="submit">
              Publish
            </button>
          </form>
        </div>
    );
}
