"use client";
import React from "react";

type Props = {};

const Page = ({ params }: { params: { videoId: string } }) => {
  return (
    <div className="w-screen h-screen">
      <iframe
        src={`https://vidsrc.xyz/embed/tv/${params.videoId}`}
        width="100%"
        height="100%"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Page;
