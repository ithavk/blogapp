// Blog Data Model & Storage (LocalStorage)
export const BLOG_STORAGE_KEY = 'blogAppPosts';

export function getPosts() {
  const posts = localStorage.getItem(BLOG_STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
}

export function savePosts(posts) {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}

export function addPost(post) {
  const posts = getPosts();
  posts.unshift(post); // Add newest first
  savePosts(posts);
}

export function updatePost(updatedPost) {
  let posts = getPosts();
  posts = posts.map(post => {
    if (post.id === updatedPost.id) {
      // Preserve profilePic and postImages if not present in updatedPost
      return {
        ...post,
        ...updatedPost,
        profilePic: updatedPost.profilePic || post.profilePic,
        postImages: (updatedPost.postImages && updatedPost.postImages.length > 0) ? updatedPost.postImages : post.postImages
      };
    }
    return post;
  });
  savePosts(posts);
}

export function deletePost(id) {
  let posts = getPosts();
  posts = posts.filter(post => post.id !== id);
  savePosts(posts);
}

export function getPostById(id) {
  return getPosts().find(post => post.id === id);
}
