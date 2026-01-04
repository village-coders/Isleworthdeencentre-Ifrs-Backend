const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/user');
const Claim = require('../models/claim');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to database for migration\n');
    
    // Clear existing admin users to avoid duplicates
    await User.deleteMany({ 
      $or: [
        { email: 'admin@hfa-uk.com' },
        { employee_id: 'admin' }
      ] 
    });
    
    // Create admin user with email
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    
    // Create primary admin with email
    const adminEmail = new User({
      employee_id: 'HFA-ADMIN-001',
      name: 'Administrator',
      email: 'admin@hfa-uk.com',
      password: adminPassword,
      role: 'admin',
      department: 'Administration',
      phone: '07123 456789',
      status: 'active'
    });
    
    await adminEmail.save();
    console.log('✅ Admin user (email) created:');
    console.log('   Email: admin@hfa-uk.com');
    console.log('   Password: Admin@123');
    
    // Create secondary admin with username 'admin'
    const adminUsername = new User({
      employee_id: 'admin',  // This allows login with username 'admin'
      name: 'Administrator',
      email: 'admin.username@hfa-uk.com',  // Different email
      password: adminPassword,
      role: 'admin',
      department: 'Administration',
      phone: '07123 456789',
      status: 'active'
    });
    
    await adminUsername.save();
    console.log('\n✅ Admin user (username) created:');
    console.log('   Username: admin');
    console.log('   Password: Admin@123');
    
    // Rest of your migration code for workers and claims...
    console.log('\n🎉 Migration completed!');
    console.log('\n📋 Login options:');
    console.log('   1. Username: "admin", Password: "Admin@123"');
    console.log('   2. Email: "admin@hfa-uk.com", Password: "Admin@123"');
    
    mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  migrate();
}

module.exports = migrate;