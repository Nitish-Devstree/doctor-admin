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
import { Textarea } from '@/components/ui/textarea'; // Add this import
// import { useUpdateUniversityById } from '@/hook-api/university/university.hook';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown, Loader2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import countryJson from '../../json/country.json';
import {
  useCreateUniversity,
  useDeleteUniversity,
  useUpdateUniversity
} from '@/hook-api/university/university.hook';
import { SerializedEditorState } from 'lexical';
import { RichTextEditor } from '@/components/rich-text-editor';
import { useRouter } from 'next/navigation';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length > 0, 'Image is required')
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
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(), // Add this field
  establishedYear: z.string().min(4, { message: 'Year is required' }),
  location: z.object({
    address: z.string().min(1, { message: 'Address is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    pincode: z.string().min(6, { message: 'Pincode must be 6 digits' })
  }),
  contactDetails: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 digits' }),
    website: z.string().url({ message: 'Invalid website URL' })
  }),
  courses: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Course name is required' }),
        duration: z.string().min(1, { message: 'Duration is required' }),
        degree: z.string().min(1, { message: 'Degree is required' }),
        description: z.string().min(1, { message: 'Description is required' }),
        fees: z.string().min(1, { message: 'Fees is required' })
      })
    )
    .optional(),
  facilities: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  ranking: z.string().optional(),
  numberOfStudents: z.string().optional()
});

interface UniversityFormProps {
  initialData: {
    _id?: string;
    name?: string;
    description?: string; // Add this field
    image?: string;
    establishedYear?: number;
    location?: {
      address?: string;
      city?: string;
      state?: string;
      country?: {
        name?: string;
      };
      pincode?: string;
    };
    contactDetails?: {
      email?: string;
      phone?: string;
      website?: string;
    };
    courses?: Array<{
      name: string;
      duration: string;
      degree: string;
      description: string;
      fees: number;
      _id?: string;
    }>;
    facilities?: string[];
    languages?: string[];
    ranking?: string;
    numberOfStudents?: string;
  } | null;
  pageTitle: string;
}

export default function UniversityForm({
  initialData,
  pageTitle
}: UniversityFormProps) {
  // console.log(initialData, 'initialData?._id');
  const router = useRouter();
  const defaultValues = {
    name: initialData?.name || '',
    description: initialData?.description || '', // Add this field
    image: undefined,
    establishedYear: initialData?.establishedYear?.toString() || '',
    location: {
      address: initialData?.location?.address || '',
      city: initialData?.location?.city || '',
      state: initialData?.location?.state || '',
      country: initialData?.location?.country?.name || '',
      pincode: initialData?.location?.pincode || ''
    },
    contactDetails: {
      email: initialData?.contactDetails?.email || '',
      phone: initialData?.contactDetails?.phone || '',
      website: initialData?.contactDetails?.website || ''
    },
    courses:
      initialData?.courses?.map((course) => ({
        ...course,
        fees: course.fees.toString()
      })) || [],

    facilities: initialData?.facilities || [],
    languages: initialData?.languages || [],
    ranking: String(initialData?.ranking) || '',
    numberOfStudents: String(initialData?.numberOfStudents) || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const resetForm = () => {
    form.reset({
      ...defaultValues,
      image: undefined
    });
  };

  const [value, setValue] = useState(initialData?.description ?? '');

  // Function to remove a course at a specific index
  const removeCourse = (index: number) => {
    const currentCourses = form.getValues('courses') || [];
    const updatedCourses = [...currentCourses];
    updatedCourses.splice(index, 1);
    form.setValue('courses', updatedCourses);
  };

  // Function to remove a facility at a specific index
  const removeFacility = (index: number) => {
    const currentFacilities = form.getValues('facilities') || [];
    const updatedFacilities = [...currentFacilities];
    updatedFacilities.splice(index, 1);
    form.setValue('facilities', updatedFacilities);
  };

  const removeLanguage = (index: number) => {
    const currentLanguages = form.getValues('languages') || [];
    const updatedLanguages = [...currentLanguages];
    updatedLanguages.splice(index, 1);
    form.setValue('languages', updatedLanguages);
  };

  //   const { mutate, isPending } = useUpdateUniversityById(
  //     initialData?._id,
  //     resetForm
  //   );
  const redirectForm = () => {
    form.reset();
    router.push('/dashboard/university');
  };
  const [open, setOpen] = useState(false);
  const { mutate: createMutate, isPending: createPending } =
    useCreateUniversity(redirectForm);

  const { mutate: updateMutate, isPaused: updatePending } = useUpdateUniversity(
    initialData?._id,
    redirectForm
  );
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    // console.log(values, 'values');
    // Handle image if it exists
    if (
      values.image &&
      Array.isArray(values.image) &&
      values.image.length > 0
    ) {
      const imageFile = values.image[0];
      formData.append('image', imageFile);
    }

    // Add basic fields
    formData.append('name', values.name);
    if (values.description) {
      formData.append('description', values.description);
    }
    formData.append('establishedYear', values.establishedYear);

    // Add location fields
    formData.append('location.address', values.location.address);
    formData.append('location.city', values.location.city);
    formData.append('location.state', values.location.state);
    formData.append('location.country', values.location.country);
    formData.append('location.pincode', values.location.pincode);

    // Add contact details
    formData.append('contactDetails.email', values.contactDetails.email);
    formData.append('contactDetails.phone', values.contactDetails.phone);
    formData.append('contactDetails.website', values.contactDetails.website);

    // Add courses
    if (values.courses && values.courses.length > 0) {
      values.courses.forEach((course, index) => {
        formData.append(`courses[${index}].name`, course.name);
        formData.append(`courses[${index}].duration`, course.duration);
        formData.append(`courses[${index}].degree`, course.degree);
        formData.append(`courses[${index}].description`, course.description);
        formData.append(`courses[${index}].fees`, course.fees);
      });
    }

    // Add facilities
    if (values.facilities && values.facilities.length > 0) {
      values.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility);
      });
    }

    if (values.languages && values.languages.length > 0) {
      values.languages.forEach((language, index) => {
        formData.append(`languages[${index}]`, language);
      });
    }

    if (values.ranking) {
      formData.append('ranking', values.ranking.toString());
    }

    if (values.numberOfStudents) {
      formData.append('numberOfStudents', values.numberOfStudents.toString());
    }

    if (!initialData?._id) {
      createMutate(formData);
    } else {
      updateMutate(formData);
    }

    // mutate(formData);
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
              name='image'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>University Image</FormLabel>
                    <FormControl>
                      <div className='space-y-4'>
                        {initialData?.image && (
                          <div className='relative h-32 w-32 overflow-hidden rounded-lg'>
                            <Image
                              src={initialData.image}
                              alt={initialData.name || 'University image'}
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
                    <FormLabel>University Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter university name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='establishedYear'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Established Year</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter established year'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Add the Description Field */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University Description</FormLabel>
                  <FormControl>
                    {/* <Textarea
                      placeholder='Enter a detailed description about the university...'
                      className='min-h-32'
                  
                    /> */}
                    <RichTextEditor
                      placeholder='University description goes here'
                      value={value}
                      onChange={(value) => {
                        field.onChange(value === field.value ? '' : value);
                        setValue(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Location Details</h3>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='location.address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter address' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='location.city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter city' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='location.state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter state' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='location.country'
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col'>
                      <FormLabel>Country</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            role='combobox'
                            aria-expanded={open}
                            className='w-full justify-between'
                          >
                            {field.value ? (
                              <div className='flex items-center gap-2'>
                                {countryJson?.find(
                                  (country) => country.name === field.value
                                ) && (
                                  <div className='relative h-4 w-6 overflow-hidden rounded'>
                                    <Image
                                      src={
                                        countryJson.find(
                                          (country) =>
                                            country.name === field.value
                                        )?.image || ''
                                      }
                                      alt={field.value}
                                      fill
                                      className='object-cover'
                                    />
                                  </div>
                                )}
                                <span>{field.value}</span>
                              </div>
                            ) : (
                              'Select country'
                            )}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className='w-full p-0'
                          style={{ width: '100%' }}
                        >
                          <Command className='w-full'>
                            <CommandInput
                              placeholder='Search country...'
                              className='w-full'
                            />
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup className='max-h-64 w-full overflow-auto'>
                              {countryJson?.map((country) => (
                                <CommandItem
                                  key={country.name}
                                  value={country.name}
                                  className='w-full'
                                  onSelect={(value) => {
                                    field.onChange(
                                      value === field.value ? '' : value
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <div className='flex w-full items-center gap-2'>
                                    <div className='relative h-4 w-6 overflow-hidden rounded'>
                                      <Image
                                        src={country.image}
                                        alt={country.name}
                                        fill
                                        className='object-cover'
                                      />
                                    </div>
                                    <span>{country.name}</span>
                                    <Check
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        field.value === country.name
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='location.pincode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pincode</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter pincode' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Contact Details</h3>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='contactDetails.email'
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
                  name='contactDetails.phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type='tel'
                          placeholder='Enter phone number'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='contactDetails.website'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          type='url'
                          placeholder='Enter website URL'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Ranking Details</h3>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='ranking'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ranking</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Enter ranking of university'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='numberOfStudents'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Students</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Enter number of students'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Courses</h3>
              {form.watch('courses')?.map((_, index) => (
                <div
                  key={index}
                  className='relative grid grid-cols-1 gap-6 rounded-lg border border-gray-200 p-4 md:grid-cols-2'
                >
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute top-2 right-2'
                    onClick={() => removeCourse(index)}
                  >
                    <Trash2 className='h-5 w-5 text-red-500' />
                  </Button>

                  <FormField
                    control={form.control}
                    name={`courses.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter course name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`courses.${index}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder='e.g., 4 years' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`courses.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder='e.g., B.Tech' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`courses.${index}.fees`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fees</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='Enter fees'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`courses.${index}.description`}
                    render={({ field }) => (
                      <FormItem className='md:col-span-2'>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter course description'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  const currentCourses = form.getValues('courses') || [];
                  form.setValue('courses', [
                    ...currentCourses,
                    {
                      name: '',
                      duration: '',
                      degree: '',
                      description: '',
                      fees: ''
                    }
                  ]);
                }}
              >
                Add Course
              </Button>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Facilities</h3>
              {form.watch('facilities')?.map((_, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <FormField
                    control={form.control}
                    name={`facilities.${index}`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel>Facility {index + 1}</FormLabel>
                        <div className='flex items-center gap-2'>
                          <FormControl>
                            <Input
                              placeholder='Enter facility name'
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() => removeFacility(index)}
                          >
                            <Trash2 className='h-5 w-5 text-red-500' />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  const currentFacilities = form.getValues('facilities') || [];
                  form.setValue('facilities', [...currentFacilities, '']);
                }}
              >
                Add Facility
              </Button>
            </div>

            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Languages</h3>
              {form.watch('languages')?.map((_, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <FormField
                    control={form.control}
                    name={`languages.${index}`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormLabel>Languages {index + 1}</FormLabel>
                        <div className='flex items-center gap-2'>
                          <FormControl>
                            <Input
                              placeholder='Enter languages name'
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() => removeLanguage(index)}
                          >
                            <Trash2 className='h-5 w-5 text-red-500' />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  const currentLanguages = form.getValues('languages') || [];
                  form.setValue('languages', [...currentLanguages, '']);
                }}
              >
                Add Language
              </Button>
            </div>
            <Button type='submit' disabled={createPending || updatePending}>
              {createPending || updatePending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving...
                </>
              ) : (
                'Save University'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
