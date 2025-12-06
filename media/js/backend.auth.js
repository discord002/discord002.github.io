// backend.auth.js
import admin from "firebase-admin";

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}"); // store JSON in env variable
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

// ---------------------- AUTH FUNCTIONS ----------------------

// Sign up user with email and password
export async function signUp(email, password) {
  try {
    const userRecord = await auth.createUser({ email, password });
    return { uid: userRecord.uid, email: userRecord.email };
  } catch (error) {
    throw new Error(error.message);
  }
}

// Generate password reset link
export async function resetPassword(email) {
  try {
    const resetLink = await auth.generatePasswordResetLink(email);
    return resetLink;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Verify Firebase ID token
export async function verifyToken(idToken) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return { uid: decodedToken.uid, email: decodedToken.email };
  } catch (error) {
    throw new Error("Invalid or expired token.");
  }
}
