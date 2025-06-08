// Blog Data CRUD using Firebase Firestore
import { db } from './firebase.js';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

const MAX_FIELD_SIZE = 1048487; // Firestore field/document size limit in bytes
function getSizeInBytes(obj) {
  return new TextEncoder().encode(JSON.stringify(obj)).length;
}

const POSTS_COLLECTION = 'posts';

export async function getPosts() {
  const snapshot = await getDocs(collection(db, POSTS_COLLECTION));
  const posts = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
  // Sort by date descending (if postDate exists)
  return posts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
}

export async function addPost(post) {
  if (getSizeInBytes(post) > MAX_FIELD_SIZE) {
    throw new Error("Post is too large to save to Firestore (over 1MB). Please reduce its size or content.");
  }
  // Remove id if present (Firestore auto-generates)
  const { id, ...data } = post;
  await addDoc(collection(db, POSTS_COLLECTION), data);
}

export async function updatePost(updatedPost) {
  if (getSizeInBytes(updatedPost) > MAX_FIELD_SIZE) {
    throw new Error("Post is too large to save to Firestore (over 1MB). Please reduce its size or content.");
  }
  if (!updatedPost.id) throw new Error('Post must have an id to update');
  const { id, ...data } = updatedPost;
  await updateDoc(doc(db, POSTS_COLLECTION, id), data);
}

export async function deletePost(id) {
  await deleteDoc(doc(db, POSTS_COLLECTION, id));
}

export async function getPostById(id) {
  const docSnap = await getDoc(doc(db, POSTS_COLLECTION, id));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}
