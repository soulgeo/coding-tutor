import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// 1. Load Environment Variables
const envPath = path.resolve(process.cwd(), ".env");
if (!fs.existsSync(envPath)) {
  console.error(".env file not found!");
  process.exit(1);
}

const envConfig = fs.readFileSync(envPath, "utf-8");
envConfig.split("\n").forEach((line) => {
  const [key, ...valParts] = line.split("=");
  if (key && valParts.length) {
    process.env[key.trim()] = valParts.join("=").replace(/"/g, "").trim();
  }
});

// 2. Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3. Frontmatter Parser using js-yaml
function parseMarkdown(content) {
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) return { metadata: {}, content };

  const fmText = fmMatch[1];
  const mdBody = fmMatch[2];
  
  try {
    const metadata = yaml.load(fmText);
    return { metadata, content: mdBody.trim() };
  } catch (e) {
    console.error("Error parsing YAML frontmatter:", e);
    return { metadata: {}, content: mdBody.trim() };
  }
}

// 4. Main Sync Logic
async function sync() {
  const lessonsDir = path.resolve(process.cwd(), "lessons");
  
  // Sync Units
  const unitsPath = path.join(lessonsDir, "units.json");
  if (fs.existsSync(unitsPath)) {
    const units = JSON.parse(fs.readFileSync(unitsPath, "utf-8"));
    console.log(`Syncing ${units.length} units...`);
    for (const unit of units) {
      const { id, ...data } = unit;
      await setDoc(doc(db, "units", id), data, { merge: true });
      console.log(`  - Synced Unit: ${id}`);
    }
  }

  // Sync Lessons
  const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith(".md"));
  console.log(`Syncing ${files.length} lessons...`);

  for (const file of files) {
    const id = path.basename(file, ".md");
    const rawContent = fs.readFileSync(path.join(lessonsDir, file), "utf-8");
    const { metadata, content } = parseMarkdown(rawContent);

    await setDoc(doc(db, "lessons", id), {
      title: metadata.title || id,
      pretypedCode: metadata.pretypedCode || "",
      expectedOutput: String(metadata.expectedOutput ?? ""),
      successMessage: metadata.successMessage || "",
      content: content
    }, { merge: true });

    console.log(`  - Synced Lesson: ${id}`);
  }

  console.log("\nSync complete!");
  process.exit(0);
}

sync().catch(err => {
  console.error("Sync failed:", err);
  process.exit(1);
});
