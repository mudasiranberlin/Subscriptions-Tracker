import mongoose, { Schema } from "mongoose"; // Import Mongoose to work with MongoDB
import bcrypt from "bcrypt"; // Used to encrypt (hash) passwords
import jwt from "jsonwebtoken"; // Used to create login tokens

// Create the User schema (blueprint for a user)
const Userschema = new Schema({
    username: {
        type: String,          // Username must be text
        lowercase: true,       // Convert to lowercase
        trim: true,            // Remove extra spaces
        index: true,           // Make searching faster
        required: true,        // Username is required
        unique: true           // No duplicate usernames
    },

    email: {
        type: String,          // Email must be text
        lowercase: true,       // Convert to lowercase
        trim: true,            // Remove extra spaces
        index: true,           // Make searching faster
        required: true,        // Email is required
        unique: true,           // No duplicate emails
        // match: [/^a-zA-Z0-9._%+-+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Please eneter Valid email']
    },

    fullname: {
        type: String,          // Full name must be text
        trim: true,            // Remove extra spaces
        index: true,           // Make searching faster
        required: true         // Full name is required
    },
    password: {
        type: String,          // Store password
        required: [true, "Password is required"]
    },

    refreshToken: {
        type: String           // Store refresh token
    }

}, { timestamps: true }); // Automatically create createdAt and updatedAt



// Run this before saving the user
Userschema.pre("save", async function () {

    // If password was NOT changed, skip hashing
    if (!this.isModified("password")) return // next(); next is showing error and also mention no need to send the next in new version of express

    // Convert password into a secure hash
    this.password = await bcrypt.hash(this.password, 10);

    // Continue saving
    // next();
    
});



// Check if entered password is correct
Userschema.methods.isPasswordCorrect = async function (password) {

    // Compare entered password with saved password
    return await bcrypt.compare(password, this.password);
};



// Create Access Token
Userschema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            _id: this._id,           // User ID
            email: this.email,       // User email
            username: this.username, // Username
            fullname: this.fullname  // Full name
        },

        process.env.ACCESS_TOKEN_SECRET, // Secret key

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Token expiry time
        }
    );
};



// Create Refresh Token
Userschema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id: this._id // Only store User ID
        },

        process.env.REFRESH_TOKEN_SECRET, // Secret key

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Token expiry time
        }
    );
};





// Create the User model
export const User = mongoose.model("User", Userschema);