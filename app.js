const express = require('express')
require("./db/conn")
const cors = require('cors');
const router = require('./routers/men');
const cookieSession = require("cookie-session");
const dbConfig = require("./db/conn");
const db = require("./Auth/models");
const { verifyToken } = require('./Auth/middlewares/authJwt');
const app = express()
const port = process.env.PORT|| 30001

app.use(cors());
app.use(express.json());
app.use(router);


const Role = db.role;

// Middleware setup
// app.use(cors()); // Enable CORS
// app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Configure cookie session
app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: [process.env.COOKIE_SECRET || "default-secret"],
    httpOnly: true
  })
);

// Routes setup
require('./Auth/routes/auth.routes')(app);
require('./Auth/routes/user.routes')(app);



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


app.get("/api/test/user/wel", verifyToken, (req, res) => {
  // If the middleware execution reaches here, it means the token is valid
  // You can now send the response or perform any other actions
  res.send('<h1>Welcome User!</h1>'); // Send a simple HTML response
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})




