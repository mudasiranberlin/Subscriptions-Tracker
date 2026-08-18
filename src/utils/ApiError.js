class ApiError extends Error { 
    // Creating a custom error class called ApiError
    // "extends Error" means it gets all the built-in error features from JavaScript

    constructor(
        statusCode, // HTTP error status code (example: 400, 404, 500)
        message = "Something Went Wrong", // Error message shown to the user
        errors = [], // Store extra error details if available
        stack = "" // Store error location details for debugging
    ) {

        super(message); 
        // Calling the parent Error class
        // This sets the normal error message

        this.statusCode = statusCode;
        // Saving the HTTP status code
        // Example: 404 means "Not Found"

        this.data = null;
        // No data is sent when an error happens

        this.success = false;
        // Error means the API request was not successful

        this.errors = errors;
        // Store additional error information


        if (stack) {
            this.stack = stack;
            // If stack information already exists, use it
        } else {
            Error.captureStackTrace(this, this.constructor);
            // Automatically creates a stack trace
            // It helps developers find where the error happened
        }
    }
}

// // apiError.js
// class ApiError extends Error {
//   constructor(
//     statusCode, 
//     message, 
//     errors = [], 
//     stack = ""
// ) {
//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     this.success = false;
//     this.errors = errors;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// module.exports = ApiError;

export {ApiError}


// class ApiError extends Error {
//   constructor(

//     message="Something went wrong",
//     stack = "",
//     errors = [],
//     statusCode,
//   )
//   super(message){
//     this.message = message,
//     this.statusCode =this.statusCode,
//     this.data = null,
//     this.stack =this.stack,
//     this.errors = errors

//     if(stack){
//       this.stack=this.stack
//     }
//     else {
//       Error.captureStackTrace(this,this.constructor)
//     }
//   }

// }