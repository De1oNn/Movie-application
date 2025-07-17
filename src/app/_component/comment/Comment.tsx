"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 

export const Comment = () => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState<string[]>([]);
  const maxLength = 200; 

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setCommentsList(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(commentsList));
  }, [commentsList]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setComment(value);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      setCommentsList((prev) => [...prev, comment]);
      setComment("");
    }
  };
  const handleClearComments = () => {
    setCommentsList([]);
    localStorage.removeItem("comments");
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Comments Hub</h2>

        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Textarea
              className="w-full h-20 border-2 border-blue-300 rounded-lg p-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
              placeholder="Share your thoughts..."
              value={comment}
              onChange={handleCommentChange}
            />
            <span className="absolute bottom-2 right-2 text-xs text-gray-500">
              {comment.length}/{maxLength}
            </span>
          </div>
          <button
            onClick={handleCommentSubmit}
            disabled={!comment.trim() || comment.length > maxLength}
            className="h-12 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 disabled:bg-gray-400 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-blue-600">
              Recent Comments ({commentsList.length})
            </h3>
            {commentsList.length > 0 && (
              <button
                onClick={handleClearComments}
                className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors duration-300"
              >
                <Trash2 className="h-4 w-4" />
                <span className="text-sm">Clear All</span>
              </button>
            )}
          </div>

          <AnimatePresence>
            {commentsList.length === 0 ? (
              <p className="text-gray-500 text-center">
                No comments yet. Be the first!
              </p>
            ) : (
              <ul className="space-y-3 max-h-96 overflow-y-auto">
                {commentsList.map((comment, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {comment}
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
