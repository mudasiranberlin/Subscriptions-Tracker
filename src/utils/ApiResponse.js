class ApiResponse {

    // Constructor runs when we create a new API response
    constructor(
        statusCode, // HTTP status code (example: 200 = success, 404 = not found)
        data,       // Data we want to send back to the user
        message = "Success" // Message describing the response
    ) {

        this.statusCode = statusCode;
        // Store the HTTP status code

        this.data = data;
        // Store the actual response data
        // Example: user information, products, posts, etc.

        this.message = message;
        // Store the response message
        // Example: "User created successfully"

        this.success = statusCode < 400;
        // Check if the request was successful
        // Status codes below 400 = success (true)
        // Status codes 400 and above = error (false)
    }
}

export {ApiResponse}