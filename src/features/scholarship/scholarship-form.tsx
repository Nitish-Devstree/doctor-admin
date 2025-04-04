'use client';

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
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import {
  useCreateScholarship,
  useUpdateScholarship
} from '@/hook-api/scholarship/scholarship.hook';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  websiteUrl: z.string().url({ message: 'Please enter a valid URL' })
});

interface ScholarshipFormProps {
  initialData?: {
    _id?: string;
    title?: string;
    description?: string;
    websiteUrl?: string;
  } | null;
  pageTitle: string;
}

export default function ScholarshipForm({
  initialData,
  pageTitle
}: ScholarshipFormProps) {
  const defaultValues = {
    title: initialData?.title || '',
    description: initialData?.description || '',
    websiteUrl: initialData?.websiteUrl || ''
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const resetForm = () => {
    form.reset(defaultValues);
    router.push('/dashboard/scholarships');
  };

  const { mutate: createMutate, isPending: createPending } =
    useCreateScholarship(resetForm);

  const { mutate: updateMutate, isPending: updatePending } =
    useUpdateScholarship(initialData?._id, resetForm);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    // Add fields
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('websiteUrl', values.websiteUrl);

    if (!initialData?._id) {
      createMutate(values);
    } else {
      updateMutate(values);
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
            <div className='grid grid-cols-1 gap-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter scholarship title' {...field} />
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
                        placeholder='Enter scholarship description'
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
                name='websiteUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input
                        type='url'
                        placeholder='Enter scholarship website URL'
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
                'Save Scholarship'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
