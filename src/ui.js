// UI Rendering & Handlers
// Now displays category in post card and handles category in form
import { getPosts, deletePost } from './blogData.js';

export function renderPosts(posts) {
  if (!posts.length) {
    return `<div class="alert alert-info">No blog posts yet. Create one!</div>`;
  }
  window.allPosts = posts;
  return posts.map(post => `<div class='col-12 col-md-6 col-lg-4 d-flex'>${renderPostCard(post)}</div>`).join('');
}

export function renderPostCard(post) {
  const images = post.postImages && post.postImages.length
    ? renderImageCarousel(post)
    : '';
  // Truncate description to 100 characters
  const truncated = post.postContent.length > 100 ? post.postContent.slice(0, 100) : post.postContent;
  const needsReadMore = post.postContent.length > 100;
  return `
    <article class="card mb-4 post-card" data-id="${post.id}">
      <div class="card-body">
        <div class="d-flex align-items-center mb-2">
          <h3 class="card-title mb-0 me-2">${post.blogTitle}</h3>
          <span class="badge badge-category-${post.category ? post.category.replace(/\s+/g, '') : 'All'}">${post.category || 'All'}</span>
        </div>
        ${images}
        <p class="card-text mb-2">${truncated}${needsReadMore ? '... <button class=\'read-more-btn d-inline-flex align-items-center\' data-id=\'' + post.id + '\'>Read more <i class=\'bi bi-arrow-right-short ms-1\'></i></button>' : ''}</p>
        <div class="d-flex align-items-center mb-2 mt-1">
          <img src="${post.profilePic}" alt="Profile" class="rounded-circle me-2 post-card__profile" width="40" height="40">
          <div>
            <span class="fw-bold">${post.authorName}</span>
            <span class="text-muted small ms-2">${post.postDate}</span>
          </div>
        </div>
        <div class="mt-2 d-flex justify-content-end gap-2">
          <button class="btn btn-sm btn-outline-primary post-card__edit d-flex align-items-center"><i class="bi bi-pencil-square me-1"></i>Edit</button>
          <button class="btn btn-sm btn-outline-danger post-card__delete d-flex align-items-center"><i class="bi bi-trash me-1"></i>Delete</button>
        </div>
      </div>
    </article>
  `;
}

// Add modal for Read More popup
if (!document.getElementById('readMoreModal')) {
  const modalHtml = `
    <div class="modal fade" id="readMoreModal" tabindex="-1" aria-labelledby="readMoreModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title h5" id="readMoreModalLabel">Full Blog</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="readMoreModalBody"></div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Event delegation for Read More button
if (!window._readMoreHandlerAttached) {
  document.body.addEventListener('click', function(e) {
    const btn = e.target.closest('.read-more-btn');
    if (btn) {
      const postId = btn.getAttribute('data-id');
      const posts = window.allPosts || (window.getPosts && window.getPosts()) || [];
      const post = posts.find(p => String(p.id) === String(postId));
      if (post) {
        const images = post.postImages && post.postImages.length
          ? renderImageCarousel(post)
          : '';
        document.getElementById('readMoreModalLabel').innerText = post.blogTitle;
        document.getElementById('readMoreModalBody').innerHTML = `
          <div class='mb-2 d-flex align-items-center'>
            <h3 class='mb-0 me-2'>${post.blogTitle}</h3>
            <span class='badge bg-primary'>${post.category || ''}</span>
          </div>
          ${images}
          <p class='mt-3'>${post.postContent}</p>
          <div class='d-flex align-items-center mt-4'>
            <img src='${post.profilePic}' alt='Profile' class='rounded-circle me-2' width='40' height='40'>
            <div>
              <span class='fw-bold'>${post.authorName}</span>
              <span class='text-muted small ms-2'>${post.postDate}</span>
            </div>
          </div>
        `;
        const modal = new bootstrap.Modal(document.getElementById('readMoreModal'));
        modal.show();
      }
    }
  });
  window._readMoreHandlerAttached = true;
}


function renderImageCarousel(post) {
  if (!post.postImages || !post.postImages.length) return '';
  const carouselId = `carousel-${post.id}`;
  const indicators = post.postImages.map((img, idx) =>
    `<button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${idx}" class="${idx===0?'active':''}" aria-current="${idx===0?'true':'false'}" aria-label="Slide ${idx+1}"></button>`
  ).join('');
  const items = post.postImages.map((img, idx) =>
    `<div class="carousel-item${idx===0?' active':''}">
      <img src="${img}" class="d-block w-100 rounded post-card__image" alt="Post image">
    </div>`
  ).join('');
  return `
    <div id="${carouselId}" class="carousel slide mb-2" data-bs-ride="carousel">
      <div class="carousel-indicators">${indicators}</div>
      <div class="carousel-inner">${items}</div>
      <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
}

export async function updatePostsUI() {
  try {
    const posts = await getPosts();
    document.getElementById('postsContainer').innerHTML = await renderPosts(posts);
  } catch (err) {
    document.getElementById('postsContainer').innerHTML = `<div class="alert alert-danger">Failed to load posts: ${err.message}</div>`;
  }
}

export async function showEditForm(post) {
  // Populate the sidebar form with post data for editing
  document.getElementById('blogTitle').value = post.blogTitle;
  document.getElementById('authorName').value = post.authorName;
  document.getElementById('email').value = post.email;
  document.getElementById('category').value = post.category || '';
  document.getElementById('postDate').value = post.postDate;
  document.getElementById('postContent').value = post.postContent;
  // Profile pic and images can't be set for security; show a note or preview instead
  document.getElementById('createPostForm').setAttribute('data-edit-id', post.id);
  document.querySelector('.sidebar__submit').textContent = 'Update Post';
}

export function resetForm() {
  document.getElementById('createPostForm').reset();
  document.getElementById('createPostForm').removeAttribute('data-edit-id');
  document.querySelector('.sidebar__submit').textContent = 'Create Post';
  document.getElementById('category').value = '';
}
