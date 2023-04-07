import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from 'axios'
import React, {useContext, useEffect, useState} from "react";


export default function Homepage() {
  const getCookie = (name)=>{
      return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
  }
  const location = useLocation();
    const [posts, setPosts] = useState([]);


    useEffect( () => {
        const jwtToken = getCookie('jwt')
        const getPosts = async () => {
            try {
                const res = await axios.get('/api/v1/blogs', {
                    headers: {
                        'authorization': `Bearer ${jwtToken}`
                    }
                })
                setPosts(res.data.data.blogs)
            } catch (err) {
                if (err) {
                    if (err.response.data.message === 'jwt expired') {
                        const res = await axios.post('/api/v1/users/refresh', {refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmI0M2FhZTFiM2IzNWU1MGEwMjNiMSIsImlhdCI6MTY4MDU2NTI5MywiZXhwIjoxNjg4MzQxMjkzfQ._jkNYhajvQGxEy8LPoWtMelqlIUymY_SUSCnR5nlwPY"}, {
                            headers: {
                                'authorization': `Bearer ${jwtToken}`
                            }
                        })
                    }
                }
            }

        };
        getPosts().then()
    }, []);
  return (
    <>
      <Header />
      <div className="home">
              <Posts  />
          <Sidebar/>
      </div>
    </>
  );
}
