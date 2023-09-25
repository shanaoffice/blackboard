import { useState } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Handle post request
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/students', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        userId: Math.floor(Math.random() * 100) + 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        setPosts((posts) => [post, ...posts]);
        setTitle('');
        setBody('');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Body:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        <br />
        <button type="submit">Create Post</button>
      </form>

      {/* Render posts here */}
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
