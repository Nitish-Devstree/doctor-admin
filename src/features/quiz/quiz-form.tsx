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
import { FileInput } from '@/components/ui/file-input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { AlertCircle, Loader2, Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useCreateQuiz, useUpdateQuiz } from '@/hook-api/quiz/quiz.hook';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from 'react';

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
  questionsPerAttempt: z
    .number()
    .min(1, { message: 'Questions per attempt must be at least 1' })
    .max(180, { message: 'Questions per attempt cannot exceed 180' }),
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
    questionsPerAttempt: number;
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
  const [csvError, setCsvError] = useState<string | null>(null);

  const defaultValues = {
    title: initialData?.title || '',
    description: initialData?.description || '',
    timeLimit: initialData?.timeLimit || 30,
    questionsPerAttempt: initialData?.questionsPerAttempt || 10,
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

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'questions'
  });

  const resetForm = () => {
    form.reset();
    router.push('/dashboard/quiz');
  };

  const { mutate: createQuiz, isPending: createLoading } = useCreateQuiz(resetForm);
  const { mutate: updateQuiz, isPending: updateLoading } = useUpdateQuiz(
    initialData?._id,
    resetForm
  );

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setCsvError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      
      // Check headers
      const headers = lines[0].toLowerCase().trim().split(',');
      const expectedHeaders = ['question', 'option1', 'option2', 'option3', 'option4', 'answer'];
      const isHeadersValid = expectedHeaders.every(header => headers.includes(header));
      
      if (!isHeadersValid) {
        setCsvError('Invalid CSV format. Required headers: question, option1, option2, option3, option4, answer');
        return;
      }

      // Parse questions
      const questions = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',').map(val => val.trim());
        if (values.length !== 6) {
          setCsvError(`Invalid data in row ${i}. Each row must have 6 columns.`);
          return;
        }

        const [question, opt1, opt2, opt3, opt4, answer] = values;
        if (!question || !opt1 || !opt2 || !opt3 || !opt4 || !answer) {
          setCsvError(`Missing data in row ${i}. All fields are required.`);
          return;
        }

        const answerNum = parseInt(answer);
        if (isNaN(answerNum) || answerNum < 1 || answerNum > 4) {
          setCsvError(`Invalid answer in row ${i}. Answer must be a number between 1 and 4.`);
          return;
        }

        questions.push({
          question,
          options: [opt1, opt2, opt3, opt4],
          answer: answerNum - 1 // Convert 1-based to 0-based index
        });
      }

      if (questions.length === 0) {
        setCsvError('No valid questions found in the CSV file.');
        return;
      }

      replace(questions);
    };

    reader.readAsText(file);
  };

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
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
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
              <FormField
                control={form.control}
                name='questionsPerAttempt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Questions Per Attempt</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Enter questions per attempt'
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
                <div className='flex gap-2'>
                  <FormItem className="max-w-[300px]">
                    <FormLabel>Import Questions (CSV)</FormLabel>
                    <FormControl>
                      <FileInput
                        accept=".csv"
                        onChange={handleCSVUpload}
                      />
                    </FormControl>
                  </FormItem>
                 
                </div>
              </div>

              {csvError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{csvError}</AlertDescription>
                </Alert>
              )}

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
                    onClick={() => append({
                      question: '',
                      options: ['', '', '', ''],
                      answer: 0
                    })}
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
