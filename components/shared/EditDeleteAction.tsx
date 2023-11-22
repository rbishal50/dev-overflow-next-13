"use client";

import React from "react";
import Image from "next/image";
import { deleteAnswer, deleteQuestion } from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";

interface Props {
  type: "Question" | "Answer";
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();

  const handleEdit = () => {};

  const handleDelete = async () => {
    if (type === "Question") {
      return await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
    }
    return await deleteAnswer({ answerId: JSON.parse(itemId), path: pathname });
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
