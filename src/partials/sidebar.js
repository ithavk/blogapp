// Sidebar Partial (Create Post Form) - BEM Naming
export function renderSidebar() {
  return `
    <!-- Create Post Modal -->
    <div class="modal fade" id="createPostModal" tabindex="-1" aria-labelledby="createPostModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title h5" id="createPostModalLabel">Create Post</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="createPostForm" class="sidebar__form" enctype="multipart/form-data" autocomplete="off">
              <div class="mb-2">
          <label for="blogTitle" class="form-label sidebar__label">Blog Title *</label>
          <input type="text" class="form-control sidebar__input" id="blogTitle" name="blogTitle" required>
        </div>
        <div class="mb-2">
          <label for="authorName" class="form-label sidebar__label">Author Name *</label>
          <input type="text" class="form-control sidebar__input" id="authorName" name="authorName" required>
        </div>
        <div class="mb-2">
          <label for="email" class="form-label sidebar__label">Email *</label>
          <input type="email" class="form-control sidebar__input" id="email" name="email" required>
        </div>
        <div class="mb-2">
          <label for="category" class="form-label sidebar__label">Category *</label>
          <select class="form-select sidebar__input" id="category" name="category" required>
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
          </select>
          <div class="mt-1">
            <span class="sidebar__label me-2">Preview:</span>
            <span id="categoryBadgePreview" class="badge bg-secondary">None</span>
          </div>
        </div>
        <div class="mb-2">
          <label for="postDate" class="form-label sidebar__label">Post Date *</label>
          <input type="date" class="form-control sidebar__input" id="postDate" name="postDate" required>
        </div>
        <div class="mb-2">
          <label for="profilePic" class="form-label sidebar__label">Profile Picture *</label>
          <input type="file" class="form-control sidebar__input" id="profilePic" name="profilePic" accept="image/*" required>
        </div>
        <div class="mb-2">
          <label for="postContent" class="form-label sidebar__label">Post Content *</label>
          <textarea class="form-control sidebar__input" id="postContent" name="postContent" rows="3" required></textarea>
        </div>
        <div class="mb-2">
          <label for="postImages" class="form-label sidebar__label">Post Images</label>
          <input type="file" class="form-control sidebar__input" id="postImages" name="postImages" accept="image/*" multiple>
        </div>
        <button type="submit" class="btn btn-primary sidebar__submit w-100">Create Post</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
