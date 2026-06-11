import React, { useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
    const [refreshPosts, setRefreshPosts] = useState(0);

    return (
        <div className="container">
            <header>
                <h1>Create Post</h1>
            </header>

            <PostCreate onSuccess={() => setRefreshPosts((n) => n + 1)} />

            <hr />

            <section>
                <h1>Posts</h1>
                <PostList refresh={refreshPosts} />
            </section>
        </div>
    );
};

export default App;
