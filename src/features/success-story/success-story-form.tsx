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
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import {
  useCreateSuccessStory,
  useUpdateSuccessStory
} from '@/hook-api/success-story/success-story.hook';
import { useRouter } from 'next/navigation';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  videoLink: z.string().url({ message: 'Please enter a valid URL' }),
  thumbnail: z
    .any()
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
    )
});

interface SuccessStoryFormProps {
  initialData?: {
    _id?: string;
    title?: string;
    description?: string;
    videoLink?: string;
    thumbnail?: string;
  } | null;
  pageTitle: string;
}

export default function SuccessStoryForm({
  initialData,
  pageTitle
}: SuccessStoryFormProps) {
  const defaultValues = {
    title: initialData?.title || '',
    description: initialData?.description || '',
    videoLink: initialData?.videoLink || '',
    thumbnail: undefined
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const resetForm = () => {
    form.reset({
      ...defaultValues,
      thumbnail: undefined
    });
    router.push('/dashboard/success-story');
  };

  const { mutate: createMutate, isPending: createPending } =
    useCreateSuccessStory(resetForm);

  const { mutate: updateMutate, isPending: updatePending } =
    useUpdateSuccessStory(initialData?._id, resetForm);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    // Handle thumbnail if it exists
    if (
      values.thumbnail &&
      Array.isArray(values.thumbnail) &&
      values.thumbnail.length > 0
    ) {
      const thumbnailFile = values.thumbnail[0];
      formData.append('thumbnail', thumbnailFile);
    }

    // Add other fields
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('videoLink', values.videoLink);

    if (!initialData?._id) {
      createMutate(formData);
    } else {
      updateMutate(formData);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit(values);
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
              name='thumbnail'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Story Thumbnail</FormLabel>
                    <FormControl>
                      <div className='space-y-4'>
                        {initialData?.thumbnail && (
                          <div className='relative h-48 w-full max-w-md overflow-hidden rounded-lg'>
                            <Image
                              src={initialData.thumbnail}
                              alt='Story thumbnail'
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

            <div className='grid grid-cols-1 gap-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter story title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter story description'
                        className='min-h-24'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='videoLink'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input
                        type='url'
                        placeholder='Enter YouTube or video URL'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' disabled={createPending || updatePending}>
              {createPending || updatePending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                'Save Story'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
