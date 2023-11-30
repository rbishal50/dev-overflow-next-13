import React from "react";
import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "./cards/AnswerCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const AnswersTab = async ({ userId, clerkId, searchParams }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams?.page ? +searchParams.page : 1,
  });

  const pageNumber = searchParams?.page ? +searchParams.page : 1;

  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          _id={answer._id}
          clerkId={clerkId}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}
      <div className="mt-10">
        <Pagination pageNumber={pageNumber} isNext={result.isNext} />
      </div>
    </>
  );
};

export default AnswersTab;
