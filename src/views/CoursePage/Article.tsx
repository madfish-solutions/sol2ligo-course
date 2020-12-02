import React from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";

interface ArticleProps {
  title: string;
  description: string;
  sectionIndex: number;
}

const Article: React.FC<ArticleProps> = ({ title, description, sectionIndex }) => {
  return (
    <article className="flex-1 w-full max-w-full px-6 py-4 overflow-y-auto prose break-normal bg-white lg:prose-md">
      <h1>
        {sectionIndex + 1}. {title}
      </h1>
      <Markdown
        skipHtml
        source={description!}
        plugins={[[gfm, { singleTilde: false }]]}
      />
    </article>
  );
};

export default Article;
