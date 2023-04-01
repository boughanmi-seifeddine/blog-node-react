import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from 'axios'
import React, {useEffect, useState} from "react";
export default function Homepage() {
  const location = useLocation();
    const [posts, setPosts] = useState([]);
  console.log(location);


    useEffect( () => {
        const getPosts = async () => {
            const res = await axios.get('/api/v1/blogs')
            setPosts(res.data.data.blogs)

        };
        getPosts()
    }, []);
    console.log(posts)
  return (
    <>
      <Header />
      <div className="home">
              <Posts posts={posts}/>
          <Sidebar/>
      </div>
    </>
  );
}
