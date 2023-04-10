import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";
import React, {useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import PostContext from "../../context/post/postContext";

export default function Single() {
    const {getPost, post} = useContext(PostContext);
    const {id : postId} = useParams()
    useEffect(()=>{
        getPost(postId)
    },[postId])
  return (
    <div className="single">
      <SinglePost post = {post} />
      <Sidebar />
    </div>
  );
}
