"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { RiCloseLargeLine, RiMenu3Line } from "@remixicon/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ShineBorder from "@/components/ui/shiny-border";
import RetroGrid from "@/components/ui/retro-grid";
import Link from "next/link";
import SparklesText from "@/components/ui/sparkle-text";

export default function Home() {
  return (
    <div className="bg-[#000] w-screen h-screen text-white flex flex-col items-center">
      <div className="w-[80%] h-full flex flex-col items-center space-y-10 justify-center">
        <SparklesText text="Supa Movie" className="select-none" />
        <TextGenerateEffect
          className="!text-white"
          words="Where You can watch Movie and TV Shows for Free"
        />
        <Link href="/home">
          <ShineBorder
            className="text-center !text-white text-2xl !bg-transparent font-bold capitalize cursor-pointer"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            Watch
          </ShineBorder>
        </Link>
      </div>
      <RetroGrid />
    </div>
  );
}
