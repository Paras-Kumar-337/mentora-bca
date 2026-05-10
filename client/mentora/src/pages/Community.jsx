import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function formatTimeAgo(dateString) {
  if (!dateString) return "Recently";

  const now = new Date();
  const date = new Date(dateString);

  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString();
}

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

      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-8 animate-fadeIn">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 animate-fadeIn">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-textMain">
              Community
            </h1>

            <p className="text-sm text-textMuted mt-2 max-w-2xl">
              Discuss academics, placements, exams, and campus life with fellow students.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 mt-6 flex-wrap animate-fadeIn">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-sm border transition-all duration-200 font-medium hover:scale-[1.02] ${
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
        <div className="mt-6 bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 animate-fadeIn">
          <textarea
            placeholder="Write something..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200 min-h-[120px]"
          />

          <div className="mt-3 flex justify-end">
            <button
              onClick={addPost}
              className="bg-primary text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-blue-600 hover:scale-[1.02] transition-all duration-200"
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="mt-6 space-y-6">
          {filteredPosts.length === 0 && (
            <div className="bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-300 p-10 text-center text-textMuted border border-gray-100 animate-fadeIn">
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
    <div className="bg-white rounded-3xl shadow hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {post.author?.avatar ? (
            <img
              src={post.author.avatar}
              alt="Profile"
              className="w-11 h-11 rounded-full object-cover border-2 border-primary shadow"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow">
              {(post.name || post.author?.name || "N")
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

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
                {formatTimeAgo(post.createdAt || post.timestamp)}
              </span>
            </div>
          </div>
        </div>

        <span className="text-xs px-3 py-1.5 bg-blue-50 text-primary rounded-full font-medium self-start md:self-auto">
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
        className="flex items-start gap-2 text-sm text-textMuted bg-blue-50 border border-blue-100 px-4 py-3 rounded-2xl shadow-sm"
      >
        {reply?.user?.avatar ? (
          <img
            src={reply.user.avatar}
            alt="Reply User"
            className="w-8 h-8 rounded-full object-cover border border-primary shadow-sm mt-1"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold mt-1">
            {(reply?.user?.name || reply?.name || "N")
              .charAt(0)
              .toUpperCase()}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="text-xs font-semibold text-primary">
              {reply?.user?.name || reply?.name || "NCU Student"}
            </p>

            <span className="text-[11px] text-textMuted">
              • {formatTimeAgo(reply?.createdAt)}
            </span>
          </div>

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
      </div>
    ))}
  </div>

      {/* Add Reply */}
      <div className="mt-4 flex gap-2">
        <input
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
          className="flex-1 border border-gray-200 rounded-full px-4 py-3 shadow-sm focus:border-primary outline-none transition-all duration-200"
        />

        <button
          onClick={() => {
            addReply(post._id || post.id, replyText);
            setReplyText("");
          }}
          className="bg-primary text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-blue-600 hover:scale-[1.02] transition-all duration-200"
        >
          Reply
        </button>
      </div>

    </div>
  );
}