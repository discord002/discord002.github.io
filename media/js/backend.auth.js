import express from "express";
import admin from "firebase-admin";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config(); // Load .env

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT is not set");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const app = express();
app.use(bodyParser.json());

// Sign up
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await auth.createUser({ email, password });
    res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Password reset
app.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const link = await auth.generatePasswordResetLink(email);
    res.status(200).json({ resetLink: link });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Verify token
app.post("/verify-token", async (req, res) => {
  const { idToken } = req.body;
  try {
    const decoded = await auth.verifyIdToken(idToken);
    res.status(200).json({ uid: decoded.uid, email: decoded.email });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`));
