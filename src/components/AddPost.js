import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/posts";

const AddPost = () => {
  const initialPostState = {
    title: "",
    body: "",
  };
  const [post, setPost] = useState(initialPostState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const savePost = () => {

    const { title, body } = post;

    dispatch(createPost(title, body))
      .then(data => {
        setPost({
          title: data.title,
          body: data.body,
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPost = () => {
    setPost(initialPostState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPost}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={post.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Content</label>
            <input
              type="text"
              className="form-control"
              id="body"
              required
              value={post.body}
              onChange={handleInputChange}
              name="body"
            />
          </div>

          <button onClick={savePost} className="btn btn-success mt-3">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPost;
