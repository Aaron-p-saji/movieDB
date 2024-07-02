import RetroGrid from "@/components/ui/retro-grid";
import Image from "next/image";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="bg-[#000] w-screen h-screen text-white flex flex-col items-center">
      <div className="w-[80%] h-full flex flex-col items-center mt-20">
        <div className="w-80 h-80">
          <Image
            src={"/no-connection-animate.svg"}
            width={1000}
            height={1000}
            alt="noInternet"
          />
        </div>
        <div className="flex flex-col space-y-2 items-center">
          <h1 className="text-8xl font-bold">404</h1>
          <span>Please check your internnet connection</span>
        </div>
      </div>
      <RetroGrid />
    </div>
  );
};

export default Page;
