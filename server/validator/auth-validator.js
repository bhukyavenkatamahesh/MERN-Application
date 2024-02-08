const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^\d{10}$/, { message: "Invalid phone number format" }),
});

const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z.string({ required_error: "Password is required" }),
});

module.exports = { signupSchema, signInSchema };
