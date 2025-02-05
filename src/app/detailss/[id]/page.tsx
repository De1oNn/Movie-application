"use client";

import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
};

export default Page;
