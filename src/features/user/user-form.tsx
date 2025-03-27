'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateUserById } from '@/hook-api/user/user.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  avatar: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) =>
        !files ||
        files?.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10, {
    message: 'Phone number must be at least 10 digits.'
  })
});

interface UserFormProps {
  initialData: {
    _id?: string;
    name?: string;
    email?: string;
    phoneNumber: string;
    avatar?: string;
  } | null;
  pageTitle: string;
}

export default function UserForm({ initialData, pageTitle }: UserFormProps) {
  const defaultValues = {
    name: initialData?.name || '',
    email: initialData?.email || '',
    phoneNumber: initialData?.phoneNumber || '',
    avatar: undefined
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const resetForm = () => {
    form.reset({
      ...defaultValues,
      avatar: undefined
    });
  };

  const { mutate, isPending } = useUpdateUserById(initialData?._id, resetForm);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    // Handle avatar if it exists
    if (
      values.avatar &&
      Array.isArray(values.avatar) &&
      values.avatar.length > 0
    ) {
      const avatarFile = values.avatar[0];
      formData.append('avatar', avatarFile);
    }

    // Add other fields
    if (values.name) formData.append('name', values.name);
    if (values.email) formData.append('email', values.email);
    if (values.phoneNumber) formData.append('phoneNumber', values.phoneNumber);

    // Call the mutation with the form data
    mutate(formData);
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='avatar'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <div className='space-y-4'>
                        {initialData?.avatar && (
                          <div className='relative h-32 w-32 overflow-hidden rounded-lg'>
                            <Image
                              src={initialData.avatar}
                              alt={initialData.name || 'User avatar'}
                              fill
                              className='object-cover'
                            />
                          </div>
                        )}
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFiles={1}
                          maxSize={5 * 1024 * 1024}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Enter email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!!initialData?.phoneNumber}
                        type='tel'
                        placeholder='Enter phone number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                'Save User'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
