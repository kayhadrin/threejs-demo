import { useMemo } from 'react';
import './MarkdownPreview.css';
import { Remarkable } from 'remarkable';

const md = new Remarkable({ breaks: true });

export default function MarkdownPreview({ markdown }: { markdown: string }) {
  const html = useMemo(() => md.render(markdown), [markdown]);
  return (
    <div
      className="markdownPreviewContent"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
