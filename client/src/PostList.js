import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = ({ refresh }) => {
  const [posts, setPosts] = useState({});
  const [error, setError] = useState(null);

  const [refreshComments, setRefreshComments] = useState(0); // for comments

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/posts");
      setPosts(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
    // re-fetch whenever parent says to refresh (after a successful PostCreate)
  }, [refresh]); // <-- was []

  const renderedPosts = Object.values(posts).map((post) => (
      <div className="card" style={{ width: "30%", marginBottom: "20px" }} key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.id} refresh={refreshComments} />
          <CommentCreate
              postId={post.id}
              onSuccess={() => setRefreshComments((n) => n + 1)} // refresh comments only on success
          />
        </div>
      </div>
  ));

  return (
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {error ? <div className="alert alert-danger">{error}</div> : renderedPosts}
      </div>
  );
};

export default PostList;
