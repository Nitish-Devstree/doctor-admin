'use client';

import * as React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Link as LinkIcon,
  Quote,
  List,
  ListOrdered,
  RemoveFormattingIcon,
  Unlink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Code,
  Highlighter,
  Subscript,
  Superscript as SuperscriptIcon,
  Undo,
  Redo
} from 'lucide-react';
import Link from '@tiptap/extension-link';
import { cn } from '@/lib/utils';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import './rich-text-editor.css';
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  MinusIcon
} from '@radix-ui/react-icons';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import type { Level } from '@tiptap/extension-heading';

interface RichTextEditorProps {
  value?: string;
  placeholder?: string;
  onChange?: (content: string) => void;
  className?: string;
}

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = '',
  className
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4]
        }
      }),
      Underline,
      Highlight,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify']
      }),
      Superscript,
      SubScript,
      Placeholder.configure({ placeholder }),
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          'block border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'prose prose-sm sm:prose-base max-w-full'
        )
      }
    }
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipProvider>
        <div className='mb-3 flex flex-wrap items-center gap-2'>
          <ToggleGroup type='multiple' size='sm' variant='outline'>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='bold'
                  aria-label='Toggle bold'
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  data-state={editor.isActive('bold') ? 'on' : 'off'}
                >
                  <FontBoldIcon className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='strike'
                  aria-label='Toggle strikethrough'
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  data-state={editor.isActive('strike') ? 'on' : 'off'}
                >
                  <Strikethrough className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Strikethrough</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='italic'
                  aria-label='Toggle italic'
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  data-state={editor.isActive('italic') ? 'on' : 'off'}
                >
                  <FontItalicIcon className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='underline'
                  aria-label='Toggle underline'
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  disabled={
                    !editor.can().chain().focus().toggleUnderline().run()
                  }
                  data-state={editor.isActive('underline') ? 'on' : 'off'}
                >
                  <UnderlineIcon className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Underline</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='code'
                  aria-label='Toggle code'
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  disabled={!editor.can().chain().focus().toggleCode().run()}
                  data-state={editor.isActive('code') ? 'on' : 'off'}
                >
                  <Code className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Code</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='highlight'
                  aria-label='Toggle highlight'
                  onClick={() => editor.chain().focus().toggleHighlight().run()}
                  disabled={
                    !editor.can().chain().focus().toggleHighlight().run()
                  }
                  data-state={editor.isActive('highlight') ? 'on' : 'off'}
                >
                  <Highlighter className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Highlight</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='clear'
                  aria-label='Clear formatting'
                  onClick={() =>
                    editor.chain().focus().clearNodes().unsetAllMarks().run()
                  }
                  disabled={
                    !editor
                      .can()
                      .chain()
                      .focus()
                      .clearNodes()
                      .unsetAllMarks()
                      .run()
                  }
                  data-state='off'
                >
                  <RemoveFormattingIcon className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Clear Formatting</TooltipContent>
            </Tooltip>
          </ToggleGroup>

          <ToggleGroup type='single' size='sm' variant='outline'>
            {([1, 2, 3, 4] as Level[]).map((level) => {
              const Icon = [Heading1, Heading2, Heading3, Heading4][level - 1];
              return (
                <Tooltip key={level}>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value={`h${level}`}
                      aria-label={`Heading ${level}`}
                      onClick={() =>
                        editor.chain().focus().toggleHeading({ level }).run()
                      }
                      disabled={
                        !editor
                          .can()
                          .chain()
                          .focus()
                          .toggleHeading({ level })
                          .run()
                      }
                      data-state={
                        editor.isActive('heading', { level }) ? 'on' : 'off'
                      }
                    >
                      <Icon className='size-4' />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent>Heading {level}</TooltipContent>
                </Tooltip>
              );
            })}
          </ToggleGroup>

          <ToggleGroup type='multiple' size='sm' variant='outline'>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='blockquote'
                  aria-label='Toggle blockquote'
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  disabled={
                    !editor.can().chain().focus().toggleBlockquote().run()
                  }
                  data-state={editor.isActive('blockquote') ? 'on' : 'off'}
                >
                  <Quote className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Blockquote</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='bulletList'
                  aria-label='Toggle bullet list'
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  disabled={
                    !editor.can().chain().focus().toggleBulletList().run()
                  }
                  data-state={editor.isActive('bulletList') ? 'on' : 'off'}
                >
                  <List className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='orderedList'
                  aria-label='Toggle ordered list'
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  disabled={
                    !editor.can().chain().focus().toggleOrderedList().run()
                  }
                  data-state={editor.isActive('orderedList') ? 'on' : 'off'}
                >
                  <ListOrdered className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Ordered List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='horizontalRule'
                  aria-label='Add horizontal rule'
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                  disabled={
                    !editor.can().chain().focus().setHorizontalRule().run()
                  }
                  data-state='off'
                >
                  <MinusIcon className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Horizontal Rule</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='superscript'
                  aria-label='Toggle superscript'
                  onClick={() =>
                    editor.chain().focus().toggleSuperscript().run()
                  }
                  disabled={
                    !editor.can().chain().focus().toggleSuperscript().run()
                  }
                  data-state={editor.isActive('superscript') ? 'on' : 'off'}
                >
                  <SuperscriptIcon className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Superscript</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='subscript'
                  aria-label='Toggle subscript'
                  onClick={() => editor.chain().focus().toggleSubscript().run()}
                  disabled={
                    !editor.can().chain().focus().toggleSubscript().run()
                  }
                  data-state={editor.isActive('subscript') ? 'on' : 'off'}
                >
                  <Subscript className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Subscript</TooltipContent>
            </Tooltip>
          </ToggleGroup>

          <ToggleGroup type='single' size='sm' variant='outline'>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='link'
                  aria-label='Add link'
                  onClick={() => {
                    const url = window.prompt('Enter URL');
                    if (url) {
                      editor
                        .chain()
                        .focus()
                        .setLink({
                          href: url,
                          target: '_blank',
                          rel: 'noopener noreferrer'
                        })
                        .run();
                    }
                  }}
                  disabled={
                    !editor
                      .can()
                      .chain()
                      .focus()
                      .setLink({ href: 'https://example.com' })
                      .run()
                  }
                  data-state={editor.isActive('link') ? 'on' : 'off'}
                >
                  <LinkIcon className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Add Link</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='unlink'
                  aria-label='Remove link'
                  onClick={() => {
                    editor.chain().focus().unsetLink().run();
                  }}
                  disabled={!editor.can().chain().focus().unsetLink().run()}
                >
                  <Unlink className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Remove Link</TooltipContent>
            </Tooltip>
          </ToggleGroup>

          <ToggleGroup type='single' size='sm' variant='outline'>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='left'
                  aria-label='Align left'
                  onClick={() =>
                    editor.chain().focus().setTextAlign('left').run()
                  }
                  disabled={
                    !editor.can().chain().focus().setTextAlign('left').run()
                  }
                  data-state={
                    editor.isActive({ textAlign: 'left' }) ? 'on' : 'off'
                  }
                >
                  <AlignLeft className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='center'
                  aria-label='Align center'
                  onClick={() =>
                    editor.chain().focus().setTextAlign('center').run()
                  }
                  disabled={
                    !editor.can().chain().focus().setTextAlign('center').run()
                  }
                  data-state={
                    editor.isActive({ textAlign: 'center' }) ? 'on' : 'off'
                  }
                >
                  <AlignCenter className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='right'
                  aria-label='Align right'
                  onClick={() =>
                    editor.chain().focus().setTextAlign('right').run()
                  }
                  disabled={
                    !editor.can().chain().focus().setTextAlign('right').run()
                  }
                  data-state={
                    editor.isActive({ textAlign: 'right' }) ? 'on' : 'off'
                  }
                >
                  <AlignRight className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='justify'
                  aria-label='Align justify'
                  onClick={() =>
                    editor.chain().focus().setTextAlign('justify').run()
                  }
                  disabled={
                    !editor.can().chain().focus().setTextAlign('justify').run()
                  }
                  data-state={
                    editor.isActive({ textAlign: 'justify' }) ? 'on' : 'off'
                  }
                >
                  <AlignJustify className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Justify</TooltipContent>
            </Tooltip>
          </ToggleGroup>

          <ToggleGroup type='single' size='sm' variant='outline'>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='undo'
                  aria-label='Undo'
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                >
                  <Undo className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value='redo'
                  aria-label='Redo'
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().chain().focus().redo().run()}
                >
                  <Redo className='size-4' />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </ToggleGroup>
        </div>
      </TooltipProvider>

      <EditorContent editor={editor} />
    </div>
  );
}
