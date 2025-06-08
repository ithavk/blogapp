// Navbar Partial (BEM Naming)
export function renderNavbar() {
  return `
    <nav class="navbar navbar-expand-lg navbar-light bg-light blog-navbar">
      <div class="container-fluid">
        <a class="navbar__brand navbar-brand fw-bold d-flex align-items-center" href="#"><img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4dd.svg" class="navbar__logo" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.12));" alt="Inspiration Logo"> BlogApp</a>
        <form class="navbar__search d-flex ms-auto me-2" id="searchForm">
          <input class="form-control me-2 navbar__search-input" type="search" placeholder="Search by title..." aria-label="Search" id="searchInput">
          <button class="btn btn-outline-primary navbar__search-btn" type="submit">Search</button>
        </form>
        <button class="btn btn-primary navbar__add-post" type="button" data-bs-toggle="modal" data-bs-target="#createPostModal">
          <i class="bi bi-plus-lg"></i> Add Post
        </button>

      </div>
    </nav>
    <div id="category-nav" class="container-fluid py-2">
      <div class="category-block-nav d-flex flex-wrap justify-content-center gap-2" id="categoryNavPills">
        <button class="btn btn-outline-dark active d-flex align-items-center" data-category="All"><i class="bi bi-grid me-1"></i>All</button>
        <button class="btn btn-outline-primary d-flex align-items-center" data-category="Technology"><i class="bi bi-cpu me-1"></i>Technology</button>
        <button class="btn btn-outline-success d-flex align-items-center" data-category="Design"><i class="bi bi-palette me-1"></i>Design</button>
        <button class="btn btn-outline-warning d-flex align-items-center" data-category="Lifestyle"><i class="bi bi-heart me-1"></i>Lifestyle</button>
        <button class="btn btn-outline-info d-flex align-items-center" data-category="Education"><i class="bi bi-mortarboard me-1"></i>Education</button>
        <button class="btn btn-outline-danger d-flex align-items-center" data-category="Travel"><i class="bi bi-geo-alt me-1"></i>Travel</button>
      </div>
    </div>
  `;
}
