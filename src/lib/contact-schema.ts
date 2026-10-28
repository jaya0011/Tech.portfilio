import { z } from "zod";
import { contactProjectTypes } from "@/data/portfolio";

/** Shared between the contact form (client) and the API route (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  projectType: z.enum(contactProjectTypes, { message: "Please choose a project type" }),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little more — at least 20 characters")
    .max(4000, "Message is too long (max 4000 characters)"),
  // Honeypot: real users never see or fill this field.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function getFieldErrors(error: z.ZodError): ContactErrors {
  const out: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
