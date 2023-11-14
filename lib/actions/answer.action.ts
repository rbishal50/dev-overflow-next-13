"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import Answer from "@/database/answer.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { content, author, question, path } = params;
    const newAnswer = new Answer({ content, author, question });

    // Add the answer to the question's answers array
    Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO ADD INTERACTION - UPVOTES DOWNVOTES...

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
