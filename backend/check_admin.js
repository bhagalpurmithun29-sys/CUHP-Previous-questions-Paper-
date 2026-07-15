const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const uri = "mongodb+srv://mithundatabase:mithun1122@cluster0.celqzhs.mongodb.net/?appName=Cluster0";

async function run() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const user = await db.collection('users').findOne({ email: 'admin@cuhp.ac.in' });
  if (!user) {
    console.log("Admin user not found in DB.");
  } else {
    console.log("Admin user found:", user.email);
    const match = await bcrypt.compare('Password@123', user.password);
    console.log("Password@123 matches hash:", match);
    console.log("Account Status:", user.accountStatus);
    console.log("Is Locked:", user.lockedUntil && user.lockedUntil > new Date() ? 'Yes' : 'No');
  }
  process.exit(0);
}
run();
