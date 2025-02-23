import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// Start server
const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    const server = app.listen(PORT, async () => {
      console.log(`Server Open & Connected To Database 🤟`);
      console.log(`Server running on port ${PORT}`);
      
      // Wait a bit for server to fully initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err);
    process.exit(1);
  });