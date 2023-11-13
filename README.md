![Coding](https://unsplash.com/photos/WpUmKx1nqG0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fGRyaW5raW5nJTIwY29mZmV8ZW58MHx8fHwxNjk5OTEyNDM4fDA&force=true&w=1920)

# Project Overview

This README provides an overview of the project's functionality, structure, and how requests are processed.

## How a Request Works

The request handling process involves routing, controllers, and services. Here's a breakdown:

1. **Route Handling:**
   - Routes are defined in the [src/routes](src/routes) folder.
   - When a request hits a route, it triggers further processing.

2. **Controller and Service Layers:**
   - Controllers, responsible for handling requests, are located in the [src/controllers](src/controllers) folder.
   - Correspondingly, services, containing the business logic, can be found in the [src/services](src/services) folder.
   - The route invokes a controller, which, in turn, calls a service to perform the necessary actions.

3. **Passport Configuration:**
   - Passport, a powerful authentication middleware, is configured in the [passport](passport) folder.

   - **Google Authentication Strategies:**
     - Two Google authentication strategies are implemented:
       1. **Student Authentication:**
          - Strategy: `'google-student'`
          - Callback URL: `/auth/google/student/callback`
          - Configuration:
            ```javascript
            const GoogleStrategy = Strategy;
            
            passport.use('google-student', new GoogleStrategy({
                clientID: YOUR_GOOGLE_CLIENT_ID,
                clientSecret: YOUR_GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/student/callback"
            }, (accessToken, refreshToken, profile, done) => {
                // Implementation for student authentication...
            }));
            ```

       2. **School Authentication:**
          - Strategy: `'google-school'`
          - Callback URL: `/schools/sign-in/google/callback`
          - Configuration:
            ```typescript
            passport.use('google-school', new GoogleStrategy({
                clientID: YOUR_GOOGLE_CLIENT_ID,
                clientSecret: YOUR_GOOGLE_CLIENT_SECRET,
                scope: ['profile', 'email'],
                callbackURL: "/schools/sign-in/google/callback",
            }, async (accessToken, refreshToken, profile, done) => {
                // Implementation for school authentication...
            }));
            ```

4. **Data Models:**
   - Data models are implemented using Typegoose, with validations embedded in their types using `class-validator` and `class-sanitizer` packages.

5. **Configurations:**
   - Configuration settings for the project are managed in the [src/config](src/config) files.

6. **Utilities and Middlewares:**
   - Functional utilities are stored in the [src/utils](src/utils) folder.
   - Middlewares used in the [src/routes](src/routes) are stored in the [src/middleware](src/middleware) folder.

7. **Background Processing:**
   - The [bull](bull) file is responsible for spawning threaded processes to run intensive tasks.

8. **Environment Configuration:**
   - Configuration examples are provided in the [.env.example](.env.example) file. Developers can use this file as a template for their own `.env` file, ensuring all necessary configurations are present.

9. **DTOs (Data Transfer Objects):**
   - Validation for requests is segregated into DTOs, located in the [src/dtos](src/dtos) folder. Each DTO file corresponds to a specific service.

   - Example: [courses.dto.ts](src/dtos/courses.dto.ts) corresponds to [courses.service.ts](src/services/courses.service.ts).

Feel free to explore the respective folders to gain a deeper understanding of the project's structure.




# How to improve the project?
- The one way I believe the project can drastically improve is porting it to Nest.js 
- The current project contains a lot of boilerplate code like the code below
    ```javascript
    SendSucessResponseOrError() 
    ```
    Which is used quite repetitively in the whole codebase but it was an improvement over the previous implementation
