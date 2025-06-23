import mongoose from 'mongoose';

const { MONGO_URI, NODE_ENV } = process.env;

if (!MONGO_URI) {
  console.error('❌  MONGO_URI not provided in environment');
  process.exit(1);
}

mongoose.set('strictQuery', true);           // opt-in for future Mongoose 7+

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // these options are defaults in Mongoose ≥7 but kept for clarity
      autoIndex: NODE_ENV !== 'production', // disable auto-indexing in prod
    });
    console.log(`✅  Mongo connected (${mongoose.connection.host})`);
  } catch (err) {
    console.error('❌  Mongo connection error:', err);
    process.exit(1);
  }
};

/* --- optional: tidy shutdown hooks --- */
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('📴  Mongo connection closed due to app termination');
  process.exit(0);
});
