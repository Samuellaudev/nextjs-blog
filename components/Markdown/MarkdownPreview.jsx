import styles from './markdown.module.css';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { railscasts } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const MarkdownPreview = ({
  post,
  isEdit,
  input,
  setInput,
  handleInputChange,
}) => {
  const renderCodeBlock = ({ className, ...rest }) => {
    const match = /language-(\w+)/.exec(className || '');

    if (match) {
      return (
        <SyntaxHighlighter
          {...rest}
          PreTag="p"
          language={match[1]}
          style={railscasts}
        />
      );
    }

    return (
      <code {...rest} className={className}>
        {rest.children}
      </code>
    );
  };

  return (
    <div
      className={`${isEdit ? 'md:space-x-5' : ''} 
      container flex flex-col md:flex-row`}
    >
      <textarea
        className={`${isEdit ? styles.light_theme_form : 'hidden'}
        dark:text-white dark:bg-[#18191E] dark:border-[#33353F]`}
        value={input}
        onChange={handleInputChange}
        cols="50"
        rows="10"
        placeholder="Enter markdown text here"
        required
      />
      <Markdown
        className={`${
          isEdit ? 'mt-2 md:mt-0 md:w-6/12 md:p-2 border' : `w-full`
        } 
        h-auto`}
        components={{ code: renderCodeBlock }}
      >
        {isEdit ? input : post}
      </Markdown>
    </div>
  );
};

export default MarkdownPreview;
