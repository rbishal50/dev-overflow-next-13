import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "./cards/QuestionCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionsTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  const pageNumber = searchParams?.page ? +searchParams.page : 1;

  return (
    <>
      {result.questions.map((question) => (
        <div key={question._id} className="mb-2">
          <QuestionCard
            _id={question._id}
            clerkId={clerkId}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes.length}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        </div>
      ))}
      <div className="mt-10">
        <Pagination pageNumber={pageNumber} isNext={result.isNext} />
      </div>
    </>
  );
};

export default QuestionsTab;
