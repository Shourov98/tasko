import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.config.js';

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();               // blocks until Mongo handshake finishes
  app.listen(PORT, () =>
    console.log(`🚀  API ready on http://localhost:${PORT}`)
  );
})();
