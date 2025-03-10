import React from "react";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";

interface MarkdownPreviewProps {
  markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true, // Allows soft line breaks
        });
  const rawHtml = md.render(markdown);
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default MarkdownPreview;
