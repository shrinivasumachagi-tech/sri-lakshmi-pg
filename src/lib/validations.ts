import { z } from 'zod';

const indianPhoneRegex = /^[6-9][0-9]{9}$/;

export const admissionSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .regex(/^[A-Za-z\s]+$/, 'Name must contain only alphabets and spaces'),
  phone: z
    .string()
    .regex(indianPhoneRegex, 'Please enter a valid 10 digit mobile number'),
  whatsapp: z
    .string()
    .regex(indianPhoneRegex, 'Please enter a valid 10 digit mobile number'),
  email: z.string().email('Please enter a valid email address'),
  dob: z.string().min(1, 'Date of birth is required'),
  parentName: z.string().min(2, 'This field is mandatory'),
  parentPhone: z
    .string()
    .regex(indianPhoneRegex, 'Please enter a valid 10 digit mobile number'),
  address: z.string().min(5, 'This field is mandatory'),
  collegeName: z.string().min(2, 'This field is mandatory'),
  courseName: z.string().min(2, 'This field is mandatory'),
  roomType: z.string().min(1, 'This field is mandatory'),
  stayDuration: z.string().min(1, 'This field is mandatory'),
  idProof: z.any().optional(),
  photo: z.any().optional(),
  terms: z.literal(true, {
    message: 'You must agree to terms',
  }),
});

export type AdmissionFormData = z.infer<typeof admissionSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
