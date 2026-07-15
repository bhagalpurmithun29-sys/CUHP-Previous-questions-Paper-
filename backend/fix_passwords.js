const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const uri = "mongodb+srv://mithundatabase:mithun1122@cluster0.celqzhs.mongodb.net/?appName=Cluster0";

async function run() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  // We need to set it to plain text, but we should do it through the Mongoose model to trigger the hook,
  // OR we can just hash it once here and use updateOne.
  
  const hash = await bcrypt.hash('Password@123', 12);
  
  await db.collection('users').updateOne(
    { email: 'admin@cuhp.ac.in' },
    { $set: { password: hash } }
  );
  
  await db.collection('users').updateOne(
    { email: 'moderator@cuhp.ac.in' },
    { $set: { password: hash } }
  );
  
  console.log("Passwords fixed!");
  process.exit(0);
}
run();
