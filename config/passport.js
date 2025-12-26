const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Serialize/Deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "/api/user/auth/google/callback",
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await prisma.user.findUnique({
        where: { providerId: profile.id },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: "google",
            providerId: profile.id,
          },
        });
      }

      return done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

// Similar setup for GitHub, Facebook, Twitter...
