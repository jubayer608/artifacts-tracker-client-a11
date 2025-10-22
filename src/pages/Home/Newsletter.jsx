import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setEmail("");
    } catch (_) {
      setStatus("idle");
    }
  };

  return (
    <section className="bg-base-200 py-16 px-6 md:px-20 font-serif">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-3">Stay in the loop</h2>
        <p className="opacity-80 mb-6">Subscribe to our newsletter for featured artifacts, events, and curator notes.</p>
        <form onSubmit={handleSubmit} className="join w-full max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered join-item w-full"
            required
          />
          <button type="submit" className={`btn btn-primary join-item ${status === "loading" ? "btn-disabled" : ""}`}>
            {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
