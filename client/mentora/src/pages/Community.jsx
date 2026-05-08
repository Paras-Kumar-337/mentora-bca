import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Community() {
  const [activeTab, setActiveTab] = useState("All");
  const [userData, setUserData] = useState(null);

  const [posts, setPosts] = useState([]);

  const [newPost, setNewPost] = useState("");

  async function fetchPosts() {
    try {
      const { data } = await API.get("/community");

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    fetchPosts();
  }, []);

  const categories = ["All", "Career", "Exams", "General"];

  const filteredPosts =
    activeTab.toLowerCase() === "all"
      ? posts
      : posts.filter(
          (p) =>
            p.category?.toLowerCase() ===
            activeTab.toLowerCase()
        );

  async function addPost() {
    if (!newPost.trim()) return;

    try {
      await API.post("/community", {
        content: newPost,
        category:
          activeTab.toLowerCase() === "all"
            ? "General"
            : activeTab,
      });

      setNewPost("");

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }

  async function addReply(postId, replyText) {
    if (!replyText.trim()) return;

    try {
      await API.post(
        `/community/${postId}/reply`,
        {
          text: replyText,
          content: replyText,
          reply: replyText,
        }
      );

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-screen-xl mx-auto p-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-textMain">
            Community
          </h1>
        </div>

        {/* Categories */}
        <div className="flex gap-3 mt-6 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-sm border ${
                activeTab === cat
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 text-textMuted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Add Post */}
        <div className="mt-6 bg-white rounded-2xl shadow p-6">
          <textarea
            placeholder="Write something..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full border rounded-2xl px-4 py-2"
          />

          <div className="mt-3 flex justify-end">
            <button
              onClick={addPost}
              className="bg-primary text-white px-4 py-2 rounded-full"
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="mt-6 space-y-6">
          {filteredPosts.length === 0 && (
            <div className="bg-white rounded-2xl shadow p-8 text-center text-textMuted">
              No discussions yet. Start one.
            </div>
          )}
          {filteredPosts.map((post) => (
            <PostCard
              key={post._id || post.id}
              post={post}
              addReply={addReply}
            />
          ))}
        </div>

      </main>
    </div>
  );
}

function PostCard({ post, addReply }) {
  const [replyText, setReplyText] = useState("");

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg
  viewBox="0 0 24 24"
  width="26"
  height="26"
  xmlns="http://www.w3.org/2000/svg"
  className="block"
>
  <path
    opacity="0.4"
    d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z"
    fill="#0061ff"
  />
  <path
    d="M17.0809 14.1499C14.2909 12.2899 9.74094 12.2899 6.93094 14.1499C5.66094 14.9999 4.96094 16.1499 4.96094 17.3799C4.96094 18.6099 5.66094 19.7499 6.92094 20.5899C8.32094 21.5299 10.1609 21.9999 12.0009 21.9999C13.8409 21.9999 15.6809 21.5299 17.0809 20.5899C18.3409 19.7399 19.0409 18.5999 19.0409 17.3599C19.0309 16.1299 18.3409 14.9899 17.0809 14.1499Z"
    fill="#0061ff"
  />
</svg>

          <div>
            <div className="font-semibold text-textMain">
              {post.name || post.user?.name || "NCU Student"}
            </div>
            <div className="text-sm text-textMuted flex items-center gap-2">
              <span>
                {post.roll || post.user?.rollNo || "NCU"}
              </span>
              <span>•</span>
              <span>
                {post.timestamp || "Recently"}
              </span>
            </div>
          </div>
        </div>

        <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <p className="mt-4 text-textMain">{post.content}</p>

  {/* Replies */}
  <div className="mt-4 space-y-2">
    {(post.replies || []).map((reply, index) => (
      <div
        key={index}
        className="flex items-start gap-2 text-sm text-textMuted bg-blue-50 px-4 py-3 rounded-2xl"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-0.5 fill-primary"
        >
          <path d="M9 16h7.2l-2.6 2.6L15 20l5-5-5-5-1.4 1.4 2.6 2.6H9c-2.2 0-4-1.8-4-4s1.8-4 4-4h2V4H9c-3.3 0-6 2.7-6 6s2.7 6 6 6z"></path>
        </svg>
        <span>
          {typeof reply === "string"
            ? reply
            : reply?.text ||
              reply?.content ||
              reply?.reply ||
              "No reply text"
          }
        </span>
      </div>
    ))}
  </div>

      {/* Add Reply */}
      <div className="mt-4 flex gap-2">
        <input
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
          className="flex-1 border rounded-full px-4 py-2"
        />

        <button
          onClick={() => {
            addReply(post._id || post.id, replyText);
            setReplyText("");
          }}
          className="bg-primary text-white px-4 py-2 rounded-full"
        >
          Reply
        </button>
      </div>

    </div>
  );
}