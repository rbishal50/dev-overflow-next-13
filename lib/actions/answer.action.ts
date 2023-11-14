"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateAnswerParams,
  GetAnswersParams,
  GetAnswersParams,
} from "./shared.types";
import Answer from "@/database/answer.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { content, author, question, path } = params;
    const newAnswer = new Answer({ content, author, question });
    await newAnswer.save();
    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO ADD INTERACTION - UPVOTES DOWNVOTES...

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
