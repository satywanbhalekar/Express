

// const cookieSession = require("cookie-session");
// const dbConfig = require("./config/db.config");
// const db = require("./models");


// const Role = db.role;

// // Middleware setup
// // app.use(cors()); // Enable CORS
// // app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// // Configure cookie session
// app.use(
//   cookieSession({
//     name: "bezkoder-session",
//     keys: [process.env.COOKIE_SECRET || "default-secret"],
//     httpOnly: true
//   })
// );

// // Routes setup
// require('./routes/auth.routes')(app);
// require('./routes/user.routes')(app);

// // MongoDB connection
// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Successfully connected to MongoDB.");
//     initial();
//   })
//   .catch(err => {
//     console.error("Connection error:", err);
//     process.exit(1); // Exit with non-zero status code on connection error
//   });

// // Initialize roles
// async function initial() {
//   try {
//     const count = await Role.estimatedDocumentCount();
//     if (count === 0) {
//       await Promise.all([
//         new Role({ name: "user" }).save(),
//         new Role({ name: "moderator" }).save(),
//         new Role({ name: "admin" }).save()
//       ]);
//       console.log("Roles initialized successfully.");
//     }
//   } catch (error) {
//     console.error("Error initializing roles:", error);
//     process.exit(1); // Exit with non-zero status code on error
//   }
// }

// // Simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });
