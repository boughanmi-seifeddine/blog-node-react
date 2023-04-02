import { Link } from "react-router-dom";
import "./singlePost.css";

export default function SinglePost({post}) {
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.imageCover &&  <img
            className="singlePostImg"
            src={post.imageCover}
            alt=""
        />}
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
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
