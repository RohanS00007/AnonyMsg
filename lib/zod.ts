import * as z from 'zod';


// Accept MessageSchema validation
export const AcceptMessageSchema = z.object({
  acceptMessages: z.boolean(),
});

// // SignInSchema Validation
// export const signInSchema = z.object({
//   identifier: z.string(),
//   password: z.string(),
// });


// // signupSchema Validation
// export const usernameValidation = z
//   .string()
//   .min(2, 'Username must be at least 2 characters')
//   .max(20, 'Username must be no more than 20 characters')
//   .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

// export const signUpSchema = z.object({
//   username: usernameValidation,

//   email: z.email({ message: 'Invalid email address' }),
//   password: z
//     .string()
//     .min(6, { message: 'Password must be at least 6 characters' }),
// });

// // MessageSchema Validation
// export const messageSchema = z.object({
//   content: z
//     .string()
//     .min(10, { message: 'Content must be at least 10 characters.' })
//     .max(300, { message: 'Content must not be longer than 300 characters.' }),
// });
