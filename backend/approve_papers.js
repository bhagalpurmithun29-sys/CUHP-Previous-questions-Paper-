const mongoose = require('mongoose');

const uri = "mongodb+srv://mithundatabase:mithun1122@cluster0.celqzhs.mongodb.net/?appName=Cluster0";

async function run() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  const result = await db.collection('papers').updateMany(
    { status: 'PENDING_REVIEW' },
    { $set: { status: 'APPROVED' } }
  );
  
  console.log(`Approved ${result.modifiedCount} papers.`);
  process.exit(0);
}
run();
