import { useForm } from 'react-hook-form';
import { useGetAllUsers } from '../../hook-api/user/user.hook';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FileUploader } from '@/components/file-uploader';
import { Loader2 } from 'lucide-react';
import {
  useDeleteHomePage,
  useUpdateHomePage
} from '@/hook-api/home-page/home-page.hook';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

interface User {
  _id: string;
  name: string;
  phoneNumber: string;
}

interface ScholarshipFormData {
  scholarship: {
    title: string;
    description: string;
    url: string;
    bannerImage: undefined;
  };
  scholarshipWinner: {
    user: { _id: string; name: string };
  };
}

interface HomePageFormProps {
  initialData?: Partial<ScholarshipFormData>;
}

export default function HomePageForm({ initialData }: HomePageFormProps) {
  const [searchQuery, setSearchQuery] = useState(
    initialData?.scholarshipWinner?.user?.name || ''
  );

  const { data: users } = useGetAllUsers({ name: searchQuery });
  const defaultValues = {
    scholarship: {
      title: initialData?.scholarship?.title || '',
      description: initialData?.scholarship?.description || '',
      url: initialData?.scholarship?.url || '',
      bannerImage: undefined
    },
    scholarshipWinner: {
      user: {
        _id: initialData?.scholarshipWinner?.user?._id || '',
        name: initialData?.scholarshipWinner?.user?.name || ''
      }
    }
  };

  const form = useForm<ScholarshipFormData>({
    values: defaultValues
  });

  const resetForm = () => {
    form.reset({
      ...defaultValues
    });
  };

  const { mutate, isPending } = useUpdateHomePage(resetForm);

  const { mutate: deleteHomePage, isPending: isDeletePending } =
    useDeleteHomePage();

  const onSubmit = async (data: ScholarshipFormData) => {
    const formData = new FormData();

    if (
      data?.scholarship?.bannerImage &&
      Array.isArray(data?.scholarship?.bannerImage)
    ) {
      const bannerImageFile = data?.scholarship?.bannerImage[0];
      formData.append('bannerImage', bannerImageFile);
    }

    if (data?.scholarship?.title) {
      formData.append('scholarship.title', data?.scholarship?.title);
    }

    if (data?.scholarship?.description) {
      formData.append(
        'scholarship.description',
        data?.scholarship?.description
      );
    }

    if (data?.scholarship?.url) {
      formData.append('scholarship.url', data?.scholarship?.url);
    }

    if (data?.scholarshipWinner?.user?._id) {
      formData.append(
        'scholarshipWinner.userId',
        data?.scholarshipWinner?.user?._id
      );
    }

    mutate(formData);
  };

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='scholarship.bannerImage'
          render={({ field }) => (
            <div className='space-y-6'>
              <FormItem className='w-full'>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className='space-y-4'>
                    {initialData?.scholarship?.bannerImage && (
                      <div className='relative h-32 w-32 overflow-hidden rounded-lg'>
                        <Image
                          src={initialData?.scholarship?.bannerImage}
                          alt={
                            initialData?.scholarship.title || 'home page title'
                          }
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
        <FormField
          control={form.control}
          name='scholarship.title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='scholarship.description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='scholarship.url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='space-y-2'>
          <FormLabel>Search User</FormLabel>
          <Input
            placeholder='Search users by name...'
            defaultValue={initialData?.scholarshipWinner?.user?.name}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <div className='mt-2'>
            {searchQuery !== '' &&
              users?.data?.map((user: User) => (
                <Button
                  key={user._id}
                  type='button'
                  variant={
                    form.getValues('scholarshipWinner.user._id') === user._id
                      ? 'default'
                      : 'outline'
                  }
                  className='mr-2 mb-2'
                  onClick={() => {
                    form.setValue('scholarshipWinner.user._id', user._id);
                    setSearchQuery(user.name);
                  }}
                >
                  {user.name + ' ' + user.phoneNumber}
                </Button>
              ))}
          </div>
        </div>
        <Button type='submit' disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Saving...
            </>
          ) : (
            'Save Home Page'
          )}
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type='button'
              disabled={isDeletePending}
              className='ml-2'
              variant='destructive'
            >
              Delete Home Page
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                home page data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteHomePage()}
                disabled={isDeletePending}
              >
                {isDeletePending ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Deleting...
                  </>
                ) : (
                  'Delete Home Page'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}
