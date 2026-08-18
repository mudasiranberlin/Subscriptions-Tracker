import arcjet, {
  detectBot,
  shield,
  tokenBucket,
} from "@arcjet/node";

import { isSpoofedBot } from "@arcjet/inspect";

// Create Arcjet instance
const aj = arcjet({
  key: process.env.ARCJET_KEY,

  rules: [
    // 🛡️ Protect against common attacks
    shield({
      mode: "LIVE",
    }),

    // 🤖 Detect bots
    detectBot({
      mode: "LIVE",

      // Allow search engine bots such as Google and Bing
      allow: [
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),

    // 🚦 Rate limiting
    tokenBucket({
      mode: "LIVE",

      // Add 5 tokens every 10 seconds
      refillRate: 5,
      interval: 10,

      // Maximum number of tokens
      capacity: 10,
    }),
  ],
});


// ===============================
// Arcjet Middleware
// ===============================
const arcjetMiddleware = async (req, res, next) => {
  try {
    // Ask Arcjet if this request is allowed
    const decision = await aj.protect(req, {
      requested: 1,
    });

    console.log("Arcjet decision:", decision);


    // =================================
    // Request was DENIED
    // =================================
    if (decision.isDenied()) {

      // Too many requests
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      }


      // Bot detected
      if (decision.reason.isBot()) {
        return res.status(403).json({
          success: false,
          message: "Bots are not allowed.",
        });
      }


      // Other Arcjet security rule
      return res.status(403).json({
        success: false,
        message: "Request forbidden.",
      });
    }


    // =================================
    // Hosting / Data-center IP
    // =================================
    if (decision.ip.isHosting()) {
      return res.status(403).json({
        success: false,
        message: "Request forbidden.",
      });
    }


    // =================================
    // Spoofed bot detection
    // =================================
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        success: false,
        message: "Suspicious bot detected.",
      });
    }


    // =================================
    // Everything is okay ✅
    // =================================

    next();

  } catch (error) {

    console.error("Arcjet middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Security check failed.",
    });
  }
};


export default arcjetMiddleware;
