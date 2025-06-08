// Entry point for Blog App
// Import and render partials, initialize app
import { renderNavbar } from './partials/navbar.js';
import { renderSidebar } from './partials/sidebar.js';
import { renderFooter } from './partials/footer.js';
import { renderMain } from './partials/main.js';

document.getElementById('navbar-partial').innerHTML = renderNavbar();
// Render modal in a dedicated container
const modalContainer = document.createElement('div');
modalContainer.innerHTML = renderSidebar();
document.body.appendChild(modalContainer);
document.getElementById('footer-partial').innerHTML = renderFooter();
document.getElementById('main-partial').innerHTML = renderMain();

import { getPosts, addPost, updatePost, deletePost, getPostById } from './blogData.js';
import { validatePostForm } from './validation.js';
import { renderPosts, updatePostsUI, showEditForm, resetForm } from './ui.js';
import { enableAuthorPopover, animateCardEntry } from './ui-enhancements.js';

// Initial render
updatePostsUI();
applyEnhancements();

// Category navigation logic
const categoryNav = document.getElementById('categoryNavPills');
if (categoryNav) {
  categoryNav.addEventListener('click', function(e) {
    if (!e.target.matches('.btn')) return;
    // Set active
    categoryNav.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    // Filter posts
    const cat = e.target.getAttribute('data-category');
    document.getElementById('searchInput').value = '';
    if (cat === 'All') {
      updatePostsUI();
    } else {
      const posts = await getPosts();
      const filtered = posts.filter(post => post.category === cat);
      document.getElementById('postsContainer').innerHTML = renderPosts(filtered);
      applyEnhancements();
    }
  });
}

// Re-initialize Bootstrap modal for dynamically rendered HTML
let createPostModal;
function ensureModalReady() {
  const modalEl = document.getElementById('createPostModal');
  if (window.bootstrap && modalEl) {
    createPostModal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
  }
}
ensureModalReady();

// Category badge preview logic
const categorySelect = document.getElementById('category');
const badgePreview = document.getElementById('categoryBadgePreview');
const categoryColors = {
  Technology: 'primary',
  Design: 'success',
  Lifestyle: 'warning',
  Education: 'info',
  Travel: 'danger',
};
function updateCategoryBadge() {
  const val = categorySelect.value;
  if (categoryColors[val]) {
    badgePreview.className = `badge bg-${categoryColors[val]}`;
    badgePreview.textContent = val;
  } else {
    badgePreview.className = 'badge bg-secondary';
    badgePreview.textContent = 'None';
  }
}
categorySelect.addEventListener('change', updateCategoryBadge);
updateCategoryBadge();

// Ensure modal works after reload/navigation
window.addEventListener('DOMContentLoaded', ensureModalReady);


// Ensure form is reset and data-edit-id is cleared when opening for new post
const createPostForm = document.getElementById('createPostForm');
const createPostModalEl = document.getElementById('createPostModal');
if (createPostModalEl) {
  createPostModalEl.addEventListener('show.bs.modal', function() {
    // Only reset if not editing
    if (!createPostForm.hasAttribute('data-edit-id')) {
      resetForm();
    }
  });
}

createPostForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(createPostForm);
  const post = {
    id: createPostForm.getAttribute('data-edit-id') || Date.now().toString(),
    blogTitle: formData.get('blogTitle').trim(),
    authorName: formData.get('authorName').trim(),
    email: formData.get('email').trim(),
    category: formData.get('category'),
    postDate: formData.get('postDate'),
    postContent: formData.get('postContent').trim(),
    profilePic: '',
    postImages: [],
  };
  // Handle profile pic
  const profilePicFile = formData.get('profilePic');
  if (profilePicFile && profilePicFile.size) {
    post.profilePic = await fileToBase64(profilePicFile);
  } else if (createPostForm.getAttribute('data-edit-id')) {
    // For edit, keep old pic if not changed
    const oldPost = await getPostById(post.id);
    post.profilePic = oldPost?.profilePic || '';
  }
  // Handle post images
  const postImagesFiles = formData.getAll('postImages');
  if (postImagesFiles && postImagesFiles.length && postImagesFiles[0].size) {
    post.postImages = await Promise.all(postImagesFiles.map(fileToBase64));
  } else if (createPostForm.getAttribute('data-edit-id')) {
    const oldPostImg = await getPostById(post.id);
    post.postImages = oldPostImg?.postImages || [];
  }
  // Validation
  const errors = validatePostForm(post);
  if (Object.keys(errors).length) {
    alert(Object.values(errors).join('\n'));
    return;
  }
  if (createPostForm.getAttribute('data-edit-id')) {
    await updatePost(post);
  } else {
    await addPost(post);
  }
  resetForm();
  updatePostsUI();
  // Close modal after submit
  if (createPostModal) createPostModal.hide();
});

// Handle Edit/Delete on posts
const postsContainer = document.getElementById('postsContainer');
if (postsContainer) {
  postsContainer.addEventListener('click', function(e) {
    const card = e.target.closest('.post-card');
    if (!card) return;
    const postId = card.getAttribute('data-id');
    if (e.target.classList.contains('post-card__edit')) {
      const post = await getPostById(postId);
      showEditForm(post);
      if (window.bootstrap && document.getElementById('createPostModal')) {
        window.bootstrap.Modal.getOrCreateInstance(document.getElementById('createPostModal')).show();
      }
    }
    if (e.target.classList.contains('post-card__delete')) {
      if (confirm('Delete this post?')) {
        await deletePost(postId);
        await updatePostsUI();
        resetForm();
      }
    }
  });
}

// Handle Search
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  filterPosts(searchInput.value.trim());
});
searchInput.addEventListener('input', function() {
  filterPosts(searchInput.value.trim());
});

async function filterPosts(query) {
  try {
    const posts = await getPosts();
    const filtered = posts.filter(post =>
      post.blogTitle.toLowerCase().includes(query.toLowerCase()) ||
      (post.category && post.category.toLowerCase().includes(query.toLowerCase()))
    );
    document.getElementById('postsContainer').innerHTML = renderPosts(filtered);
    applyEnhancements();
  } catch (err) {
    document.getElementById('postsContainer').innerHTML = `<div class="alert alert-danger">Failed to load posts: ${err.message}</div>`;
  }
}

async function updatePostsUI() {
  try {
    const posts = await getPosts();
    document.getElementById('postsContainer').innerHTML = renderPosts(posts);
    applyEnhancements();
  } catch (err) {
    document.getElementById('postsContainer').innerHTML = `<div class="alert alert-danger">Failed to load posts: ${err.message}</div>`;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = e => reject(e);
    reader.readAsDataURL(file);
  });
}

function applyEnhancements() {
  enableAuthorPopover();
  animateCardEntry();
}
