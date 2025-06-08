// Form Validation Logic
// Now also validates category
export function validatePostForm(formData) {
  const errors = {};
  if (!formData.blogTitle.trim()) errors.blogTitle = 'Title is required';
  if (!formData.authorName.trim()) errors.authorName = 'Author is required';
  if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errors.email = 'Valid email required';
  if (!formData.postDate) errors.postDate = 'Date is required';
  if (!formData.profilePic) errors.profilePic = 'Profile picture required';
  if (!formData.postContent.trim()) errors.postContent = 'Content required';
  if (!formData.category || formData.category === '') errors.category = 'Category is required';
  // Post images are optional
  return errors;
}
