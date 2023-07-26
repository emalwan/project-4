const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [2, 'Name must be 2 or more characters'],
    maxlength: [60, 'Name cannot be more than 60 characters']
  },
  lastName: {
    type: String,
    required: true,
    minlength: [2, 'Name must be 2 or more characters'],
    maxlength: [60, 'Name cannot be more than 60 characters']
  },
  emailAddress: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.methods.verifyPassword = function(password) {
  console.log('Verifying Password: ', password);
  return bcrypt.compareSync(password, this.password);
};

userSchema.statics.createSuperuser = async function(superuserData) {
  try {
    const superuser = await this.create(superuserData);
    console.log('Superuser created:', superuser);
    return superuser;
  } catch (error) {
    console.error('Error creating superuser:', error);
    throw error;
  }
};


const User = mongoose.model('User', userSchema);

module.exports = User;
