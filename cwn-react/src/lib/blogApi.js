const API_BASE = import.meta.env.VITE_BLOG_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.error || "Request failed";
    throw new Error(message);
  }
  return data;
}

export async function fetchPosts({ search = "", category = "", page = 1, limit = 9 } = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  const query = params.toString() ? `?${params.toString()}` : "";
  return request(`/posts${query}`);
}

export async function fetchPostBySlug(slug) {
  return request(`/posts/${slug}`);
}

export async function fetchCategories() {
  return request("/categories");
}

export async function loginAdmin(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function fetchCurrentAdmin(token) {
  return request("/auth/me", { token });
}

export async function createPost(body, token) {
  return request("/posts", { method: "POST", body: JSON.stringify(body), token });
}

export async function updatePost(id, body, token) {
  return request(`/posts/${id}`, { method: "PATCH", body: JSON.stringify(body), token });
}

export async function deletePost(id, token) {
  return request(`/posts/${id}`, { method: "DELETE", token });
}
