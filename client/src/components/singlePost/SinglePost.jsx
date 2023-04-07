import { Link, useParams } from "react-router-dom";
import "./singlePost.css";
import {Context} from "../../context/Context";
import {useContext} from "react";
export default function SinglePost({post}) {
  let { user} = useContext(Context);
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.imageCover &&  <img
            className="singlePostImg"
            src={post.imageCover}
            alt=""
        />}
        {/*user && user.name == post.author*/}
        <h1 className="singlePostTitle">
          {post.title}
          { true &&  <div className="singlePostEdit">
            <Link className="link" to={`/posts/${post._id}/write`} >
              <i className="singlePostIcon far fa-edit"></i>
            </Link>
            {/* <Link className="link" to={`/posts/write/${post._id}`}>
              <i className="singlePostIcon far fa-trash-alt"></i>
            </Link>*/}
          </div> }

        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to="/posts?username=Safak">
                {post.author}
              </Link>
            </b>
          </span>
          <span>1{new Date(post.created_at).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.content}
          <br />
          <br />
          {post.content}
        </p>
      </div>
    </div>
  );
}
