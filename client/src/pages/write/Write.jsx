import "./write.css";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../context/Context";
import PostContext from "../../context/post/postContext";
import {useParams} from "react-router-dom";

export default function Write() {

  const {id: postId} = useParams()
  const {posts, addPost} = useContext(PostContext)
  const post = posts.filter((p) => p._id === postId)?.shift()
  const [title, setTitle] = useState(post ? post.title : "")
  const [content, setContent] = useState(post ? post.content : "")

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
