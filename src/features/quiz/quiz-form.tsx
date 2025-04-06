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
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useCreateQuiz, useUpdateQuiz } from '@/hook-api/quiz/quiz.hook';
import { useRouter } from 'next/navigation';

const questionSchema = z.object({
  _id: z.string().optional(),
  question: z.string().min(1, { message: 'Question is required' }),
  options: z
    .array(z.string())
    .min(2, { message: 'At least 2 options are required' }),
  answer: z.number().min(0).max(3),
  isDelete: z.boolean().optional()
});

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  timeLimit: z
    .number()
    .min(1, { message: 'Time limit must be at least 1 minute' }),
  questions: z
    .array(questionSchema)
    .min(1, { message: 'At least one question is required' })
});

interface QuizFormProps {
  initialData?: {
    _id?: string;
    title: string;
    description: string;
    timeLimit: number;
    questions: Array<{
      _id?: string;
      question: string;
      options: string[];
      answer: number;
      isDelete?: boolean;
    }>;
  } | null;
  pageTitle: string;
}

export default function QuizForm({ initialData, pageTitle }: QuizFormProps) {
  const defaultValues = {
    title: initialData?.title || '',
    description: initialData?.description || '',
    timeLimit: initialData?.timeLimit || 30,
    questions: initialData?.questions || [
      {
        question: '',
        options: ['', '', '', ''],
        answer: 0
      }
    ]
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions'
  });

  const resetForm = () => {
    form.reset();
    router.push('/dashboard/quiz');
  };

  const { mutate: createQuiz, isPending: createLoading } =
    useCreateQuiz(resetForm);
  const { mutate: updateQuiz, isPending: updateLoading } = useUpdateQuiz(
    initialData?._id,
    resetForm
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (initialData?._id) {
      // Find removed questions that have IDs and mark them for deletion
      const originalQuestions = initialData.questions || [];
      const currentQuestionIds = new Set(
        values.questions.map((q) => q._id).filter(Boolean)
      );

      const deletedQuestions = originalQuestions
        .filter((q) => q._id && !currentQuestionIds.has(q._id))
        .map((q) => ({ ...q, isDelete: true }));

      // Combine current questions with deleted ones
      const updatedValues = {
        ...values,
        questions: [...values.questions, ...deletedQuestions]
      };
      //   console.log(updatedValues,'updatedValues')
      updateQuiz(updatedValues);
    } else {
      createQuiz(values);
    }
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-8'
          >
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter quiz title' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='timeLimit'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Limit (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter time limit'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter quiz description'
                      className='min-h-[100px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-medium'>Questions</h3>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className='p-4'>
                  <div className='mb-4 flex justify-between'>
                    <h4 className='text-md font-medium'>
                      Question {index + 1}
                    </h4>
                    {fields.length > 1 && (
                      <Button
                        type='button'
                        variant='destructive'
                        size='sm'
                        onClick={() => remove(index)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    )}
                  </div>

                  <div className='space-y-4'>
                    <FormField
                      control={form.control}
                      name={`questions.${index}.question`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question Text</FormLabel>
                          <FormControl>
                            <Input placeholder='Enter question' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                      {[0, 1, 2, 3].map((optionIndex) => (
                        <FormField
                          key={optionIndex}
                          control={form.control}
                          name={`questions.${index}.options.${optionIndex}`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Option {optionIndex + 1}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={`Enter option ${optionIndex + 1}`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>

                    <FormField
                      control={form.control}
                      name={`questions.${index}.answer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correct Answer</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select correct answer' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[0, 1, 2, 3].map((optionIndex) => (
                                <SelectItem
                                  key={optionIndex}
                                  value={optionIndex.toString()}
                                >
                                  Option {optionIndex + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
              ))}
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() =>
                  append({
                    question: '',
                    options: ['', '', '', ''],
                    answer: 0
                  })
                }
              >
                <Plus className='mr-2 h-4 w-4' />
                Add Question
              </Button>
            </div>

            <Button type='submit' disabled={createLoading || updateLoading}>
              {createLoading ||
                (updateLoading && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ))}
              {initialData ? 'Update Quiz' : 'Create Quiz'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
