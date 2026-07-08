/**
 * Portfolio Analytics System
 * Privacy-friendly, asynchronous, lightweight visitor and event tracking using Firebase Realtime Database.
 */

let firebasePromise = null;
let db = null;
let runTransactionFunc = null;
let dbRefFunc = null;

/**
 * Asynchronously imports Firebase SDK libraries dynamically inside a try-catch block.
 * Operating this way guarantees that the host website is unaffected if Firebase is blocked or offline.
 */
async function getFirebaseDB() {
  if (firebasePromise) return firebasePromise;

  firebasePromise = (async () => {
    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
      const { getDatabase, ref, runTransaction } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js");

      const firebaseConfig = {
        databaseURL: YOUR_FIREBASE_RTDB_URL
      };

      const app = initializeApp(firebaseConfig);
      db = getDatabase(app);
      runTransactionFunc = runTransaction;
      dbRefFunc = ref;
      return db;
    } catch (error) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.warn("[Analytics] Firebase failed to load. Operating in silent fallback mode.", error);
      }
      return null;
    }
  })();

  return firebasePromise;
}

/**
 * Atomically increments a key counter in Firebase Realtime Database using transactions.
 * @param {string} path - Database node path to increment
 */
export async function incrementCounter(path) {
  try {
    const database = await getFirebaseDB();
    if (!database || !runTransactionFunc || !dbRefFunc) return;

    const counterRef = dbRefFunc(database, path);
    await runTransactionFunc(counterRef, (currentValue) => {
      return (currentValue || 0) + 1;
    });

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`[Analytics] Successfully incremented: ${path}`);
    }
  } catch (error) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.error(`[Analytics] Transaction failed for path ${path}:`, error);
    }
  }
}

/**
 * Normalizes page path to database visitors schema key.
 */
function detectCurrentPage() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes("projects.html") || path.endsWith("/projects")) return "projects";
  if (path.includes("certificates.html") || path.endsWith("/certificates") || path.endsWith("/certificate")) return "certificates";
  if (path.includes("hackathons.html") || path.endsWith("/hackathons") || path.endsWith("/hackathon")) return "hackathons";
  if (path.includes("volunteer-work.html") || path.includes("volunteerings") || path.endsWith("/volunteer-work")) return "volunteering";
  if (path.includes("contact.html") || path.includes("socials.html") || path.endsWith("/contact") || path.endsWith("/socials")) return "contact";
  
  // Default to home page tracking
  return "home";
}

/**
 * Tracks page visits once per browser session.
 * @param {string} page - Name of the page key to record
 */
export function trackPageVisit(page) {
  const sessionKey = `tracked_visit_${page}`;
  if (!sessionStorage.getItem(sessionKey)) {
    sessionStorage.setItem(sessionKey, "true");
    incrementCounter(`analytics/visitors/${page}`);
  }
}

/**
 * Tracks button click events directly.
 * @param {string} button - Button action category name
 */
export function trackButtonClick(button) {
  incrementCounter(`analytics/clicks/${button}`);
}

/**
 * Automatically parses document.referrer, normalizes it, and logs once per session.
 */
export function trackReferral() {
  const sessionKey = "tracked_referrer";
  if (sessionStorage.getItem(sessionKey)) return;

  const referrerRaw = document.referrer;
  let normalizedReferrer = "direct";

  if (referrerRaw) {
    try {
      let hostname = new URL(referrerRaw).hostname.toLowerCase();
      // Remove starting www. subdomain
      hostname = hostname.replace(/^www\./, "");

      // Match common known brands
      if (hostname.includes("linkedin")) {
        normalizedReferrer = "linkedin";
      } else if (hostname.includes("instagram")) {
        normalizedReferrer = "instagram";
      } else if (hostname.includes("whatsapp") || hostname.includes("wa.me")) {
        normalizedReferrer = "whatsapp";
      } else if (hostname.includes("openai") || hostname.includes("chat.openai")) {
        normalizedReferrer = "chatgpt";
      } else if (hostname.includes("google")) {
        normalizedReferrer = "google";
      } else if (hostname.includes("reddit")) {
        normalizedReferrer = "reddit";
      } else if (hostname.includes("facebook") || hostname.includes("fb.com")) {
        normalizedReferrer = "facebook";
      } else if (hostname.includes("github")) {
        normalizedReferrer = "github";
      } else {
        // Strip out TLD suffixes and clean special characters
        let cleaned = hostname.replace(/\.(com|org|net|co|in|info|biz|edu|gov|me|io|ly|ai|app|dev|uk|us|ca|au|de|fr|jp|br|ru|ch|it|nl|se|no|es)\b.*/, "");
        cleaned = cleaned.replace(/[^a-z0-9\-]/g, "-");
        normalizedReferrer = cleaned || "other";
      }
    } catch (e) {
      normalizedReferrer = "other";
    }
  }

  sessionStorage.setItem(sessionKey, normalizedReferrer);
  incrementCounter(`analytics/referrals/${normalizedReferrer}`);
}

/**
 * Tracks device category (mobile or desktop) only once per browser session.
 */
export function trackDevice() {
  const sessionKey = "tracked_device";
  if (sessionStorage.getItem(sessionKey)) return;

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768;
  const deviceType = isMobile ? "mobile" : "desktop";

  sessionStorage.setItem(sessionKey, deviceType);
  incrementCounter(`analytics/devices/home/${deviceType}`);
}

/**
 * Scans the DOM and registers click listeners on elements containing a data-track attribute.
 */
function setupClickTracking() {
  const trackedElements = document.querySelectorAll("[data-track]");
  trackedElements.forEach((element) => {
    element.addEventListener("click", () => {
      const buttonCategory = element.getAttribute("data-track");
      if (buttonCategory) {
        trackButtonClick(buttonCategory);
      }
    });
  });
}

/**
 * Self-initializing trigger on page load
 */
function init() {
  const page = detectCurrentPage();
  
  // Run tracking functions asynchronously in the background
  setTimeout(() => {
    trackPageVisit(page);
    trackReferral();
    if (page === "home") {
      trackDevice();
    }
    setupClickTracking();
  }, 0);
}

// Register on load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
