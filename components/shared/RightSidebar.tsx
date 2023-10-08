"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "./RenderTag";

const RightSidebar = () => {
  // Todo later => data from a recommendation system
  const topQuestions = [
    {
      _id: "1",
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    {
      _id: "2",
      title: "Redux Toolkit Not Updating State as Expected",
    },
    {
      _id: "3",
      title: "Async/Await Function Not Handling Errors Properly",
    },
    {
      _id: "4",
      title: "How do I use express as a custom server in NextJS?",
    },
    {
      _id: "5",
      title: "Next.js Redirect from / to another page",
    },
  ];

  const popularTags = [
    {
      _id: "1",
      name: "typescript",
      totalQuestions: 15,
    },
    {
      _id: "2",
      name: "react",
      totalQuestions: 12,
    },
    {
      _id: "3",
      name: "nextjs",
      totalQuestions: 22,
    },
    {
      _id: "4",
      name: "javascript",
      totalQuestions: 5,
    },
    {
      _id: "5",
      name: "ionic",
      totalQuestions: 4,
    },
  ];

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={`/questions/${_id}`}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="chevron-right"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <h3 className="h3-bold text-dark200_light900 mt-16">Popular Tags</h3>
      <div className="mt-7 flex flex-col gap-4">
        {popularTags.map(({ _id, name, totalQuestions }) => (
          <RenderTag
            key={_id}
            _id={_id}
            name={name}
            totalQuestions={totalQuestions}
            showCount
          />
        ))}
      </div>
    </section>
  );
};

export default RightSidebar;
