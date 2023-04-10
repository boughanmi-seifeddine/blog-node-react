import Post from "../post/Post";
import PropTypes from "prop-types"
import "./posts.css";
import React, {useContext, useEffect, useState} from "react";
import PostContext from "../../context/post/postContext"

export default function Posts() {
    let {posts, getPosts} = useContext(PostContext);
    useEffect(() => {
        getPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return  (  <div className="posts">{posts.map(post=> <Post key={post._id} post={post}></Post>)}</div>)
}
Posts.propTypes = {
    posts: PropTypes.array
}