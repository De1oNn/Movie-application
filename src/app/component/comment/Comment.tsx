"use client"

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export const Comment = () => {
  // State to hold the current input value and the list of comments
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState<string[]>([]);

  // Handle change in the textarea
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // Handle the comment submission
  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      setCommentsList([...commentsList, comment]); // Add comment to the list
      setComment(""); // Clear input field
    }
  };

  return (
    <div className="min-h-[150px] w-[100%] p-[20px] flex justify-center items-center">
      <div className="h-[100%] w-[100%] lg:w-[1280px] rounded-[20px] border-[3px] p-[10px]">
        <div>
          <p className="text-[#064ba4] font-semibold">Comment</p>
        </div>
        <div className="flex justify-between mt-[10px]">
          <Textarea
            className="w-[85%] h-[60px] border-[2px] rounded-[10px] p-[10px]"
            placeholder="Comment"
            value={comment}
            onChange={handleCommentChange}
          />
          <div className="flex justify-center items-center h-[80px] w-[40px]">
            <button
              className="h-[50%] w-[100%] border-[4px] rounded-[10px] bg-[#0480c7] border-[#064ba4] text-[white] flex justify-center items-center"
              onClick={handleCommentSubmit}
            >
              <Plus />
            </button>
          </div>
        </div>

        {/* Displaying the list of comments */}
        <div className="mt-[20px]">
          <p className="text-[#064ba4] font-semibold">Comments</p>
          <ul className="mt-[10px]">
            {commentsList.map((comment, index) => (
              <li key={index} className="border-b-[1px] border-[#ddd] p-[5px]">
                {comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
