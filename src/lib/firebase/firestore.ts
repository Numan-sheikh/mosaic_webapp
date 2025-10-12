import { doc, onSnapshot, setDoc, getDoc, serverTimestamp, collection, addDoc, deleteDoc, updateDoc, query, orderBy, where } from "firebase/firestore";
import { db, storage } from "./config";
import { User } from "firebase/auth";
import { UserRole } from "@/context/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// --- USER SERVICES ---

/**
 * Listens for real-time changes to a user's role.
 * @param uid The user's ID.
 * @param callback The function to call with the new role.
 * @returns An unsubscribe function for the listener.
 */
export const onUserRoleChange = (uid: string, callback: (role: UserRole) => void) => {
  const userDocRef = doc(db, 'users', uid);
  return onSnapshot(userDocRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data().role as UserRole);
    } else {
      callback('user'); // Default to 'user' if no document exists
    }
  });
};

/**
 * Creates a new user document in Firestore if one doesn't already exist.
 * @param user The Firebase Auth user object.
 */
export const createUserDocument = async (user: User) => {
  const userDocRef = doc(db, 'users', user.uid);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      role: 'user' // Assign 'user' role by default
    });
  }
};


// --- POST SERVICES ---

interface NewPostData {
  title: string;
  content: string;
  category: 'Poem' | 'Photo' | 'Reflection';
  imageFile: File;
  user: User;
}

/**
 * Creates a new post by uploading an image and saving the post data to Firestore.
 * @param postData The data for the new post.
 */
export const createNewPost = async (postData: NewPostData) => {
  const { title, content, category, imageFile, user } = postData;
  
  // 1. Upload the image to Firebase Storage
  const imageRef = ref(storage, `posts/${user.uid}/${Date.now()}_${imageFile.name}`);
  const snapshot = await uploadBytes(imageRef, imageFile);
  const imageUrl = await getDownloadURL(snapshot.ref);

  // 2. Save the post document to Firestore
  await addDoc(collection(db, "posts"), {
    title,
    content,
    category,
    imageUrl,
    authorId: user.uid,
    authorName: user.displayName || 'Anonymous',
    createdAt: serverTimestamp(),
  });
};

// ... You can add functions like deletePost, updatePost, etc., here later
