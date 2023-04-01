import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { useLocation } from "react-router";

export default function Single() {
    const [post, setPost] = useState([])
    const {pathname} = useLocation()
    const postId = pathname.split('/')[2]

    useEffect(()=>{
      const getPost = async ()=>{
          const res = await axios.get(`/api/v1/blogs/${postId}`)
          setPost(res.data.data.blog)
      }
        getPost()
    },[postId])

  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}
