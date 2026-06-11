import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const CommentList = ({ postId, refresh }) => {
  const [comments, setComments] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }, [postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refresh]); // <-- add refresh so list updates after new comment

  return (
      <ul>
        {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
  );
};

export default CommentList;
