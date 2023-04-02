import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  return (
    <div className="post">
        {post.imageCover && <img
            className="postImg"
            src={post.imageCover}
            alt=""
        />}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((cat)=>{
            return (<span className="postCat">
            <Link className="link" to="/posts?cat=Music">
             {cat}
            </Link>
          </span>)
          })}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
           {post.title ? post.title : ""}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.created_at).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.content}
      </p>
    </div>
  );
}
