import { z } from 'zod';

// haven`t tested it yet, in case if its not working - use validator
// const phoneRegex = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);
const phoneRegex = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;
const MAX_IMAGE_SIZE = 500000;
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const createUserSchema = z.object({
  name: z.string().min(3, 'should be atlest 3 characters long'),
  email: z.string().email('this is not a valid email'),
  phone: z.string().regex(phoneRegex, 'invalid phone number'),
  position_id: z
    .string({
      invalid_type_error: 'this field is required',
    })
    .transform((value) => +value),
  photo: z
    .any()
    .refine((files: FileList) => files?.length, 'image is required.')
    .refine(
      (files: FileList) => files?.[0]?.size <= MAX_IMAGE_SIZE,
      `max image size is 5MB.`
    )
    .refine(
      (files: FileList) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

export type CreateUserFormType = z.infer<typeof createUserSchema>;
