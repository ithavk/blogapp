// Blog Data CRUD using Firebase Firestore
import { db } from './firebase.js';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js';

const POSTS_COLLECTION = 'posts';

export async function getPosts() {
  const snapshot = await getDocs(collection(db, POSTS_COLLECTION));
  const posts = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
  // Sort by date descending (if postDate exists)
  return posts.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
}

export async function addPost(post) {
  // Remove id if present (Firestore auto-generates)
  const { id, ...data } = post;
  await addDoc(collection(db, POSTS_COLLECTION), data);
}

export async function updatePost(updatedPost) {
  if (!updatedPost.id) throw new Error('Post must have an id to update');
  const { id, ...data } = updatedPost;
  await updateDoc(doc(db, POSTS_COLLECTION, id), data);
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
