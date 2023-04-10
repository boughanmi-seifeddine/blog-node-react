import React, {useEffect, useReducer} from "react";
import postReducer from "./Reducer";
import PostContext from "./postContext"
import axios from 'axios';
import {ADD_POST, DELETE_POST, SET_CURRENT, CLEAR_CURRENT, UPDATE_POST, FILTER_POST, CLEAR_FILTER} from "../types"


const INITIAL_STATE = {
    posts:  [],
    post:{}
};
export const PostContextProvider = props => {
    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(state.posts));
    }, [state.posts]);
    // get posts
    async function getPosts() {
        try {
            const res = await axios.get('/api/v1/blogs');
            dispatch({
                type: 'GET_POSTS',
                payload: res.data.data.blogs
            });
        } catch (err) {
            dispatch({
                type: 'POST_ERROR',
                payload: err.response.data.error
            });
        }
    }
    // add post
    async function addPost(post) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmI0NDk4ZTFiM2IzNWU1MGEwMjNiYiIsImlhdCI6MTY4MDgyMzk1MSwiZXhwIjoxNjgwODI0NTUxfQ.i44yf-YlWRV70Ijk8jDVvOpIQV_-IX9PykQ5kTu4zAI'
            }
        }
        try {
            const res = await axios.post('/api/v1/blogs', post, config);
            dispatch({
                type: 'ADD_POST',
                payload: res.data.data.data
            });

        } catch (err) {
            dispatch({
                type: 'POST_ERROR',
                payload: err.response.data.error
            });
        }
    }

    // getPost post
    async function getPost(postId) {
        try {
            const res = await axios.get(`/api/v1/blogs/${postId}`);
            dispatch({
                type: 'GET_POST',
                payload: res.data.data.blog
            });
        } catch (err) {
            dispatch({
                type: 'POST_ERROR',
                payload: err.response.data.error
            });
        }
    }
    // delete post

    // update post
    return (
        <PostContext.Provider
            value={{
                posts: state.posts,
                post: state.post,
                getPost,
                getPosts,
                addPost
            }}
        >
            {props.children}
        </PostContext.Provider>
    );

};