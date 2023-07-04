import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrievePosts,
} from "../actions/posts";
import { Link } from "react-router-dom";

const PostsList = () => {
  
  const [currentPost, setCurrentPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
 
  const posts = useSelector(state => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrievePosts());
  }, [dispatch]);

  const setActivePost = (post, index) => {
    setCurrentPost(post);
    setCurrentIndex(index);
  };


  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Posts List</h4>

        <ul className="list-group">
          {posts &&
            posts.map((post, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePost(post, index)}
                key={index}
              >
                {post.title}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentPost ? (
          <div>
            <h4>Post</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentPost.title}
            </div>
            <div>
              <label>
                <strong>Content:</strong>
              </label>{" "}
              {currentPost.body}
            </div>
            <div className="mt-2">
              <Link
                to={"/posts/"+currentPost.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Post...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
