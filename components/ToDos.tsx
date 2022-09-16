import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type ToDosProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const ToDos: React.FC<{ ToDos: ToDosProps }> = ({ ToDos }) => {
  const authorName = ToDos.author ? ToDos.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${ToDos.id}`)}>
      <h2>{ToDos.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={ToDos.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default ToDos;
