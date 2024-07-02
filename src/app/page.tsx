"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { RiCloseLargeLine, RiMenu3Line } from "@remixicon/react";
import { queryObjects } from "v8";
import { useGSAP } from "@gsap/react";

export default function Home() {
  let cursor = document.querySelector("#cursor");
  const tl = gsap.timeline();

  useGSAP(() => {
    tl.to("#full", {
      right: "0",
      duration: 0.8,
      ease: "power1.inOut",
    });
    tl.from("#full h4", {
      x: 150,
      duration: 0.6,
      opacity: 0,
      stagger: 0.2,
    });
    tl.from("#full #close", {
      opacity: 0,
      rotate: 360,
      duration: 0.5,
      scale: 2,
    });

    tl.pause();
  });
  return (
    <div
      id="main"
      className="h-full w-full text-white bg-[#111]"
      onMouseMove={(events) => {
        gsap.to("#cursor", {
          x: events.pageX,
          y: events.pageY,
          duration: 0.2,
        });
      }}
    >
      <div
        className="h-5 w-5 bg-white rounded-full fixed z-50 text-black flex items-center justify-center"
        id="cursor"
      ></div>
      <div id="nav" className="flex justify-between items-center px-10 py-12">
        <h2 className="text-3xl">bot4Aaron</h2>

        <RiMenu3Line size={30} fontWeight={800} onClick={() => tl.play()} />
      </div>
      <div
        id="full"
        className="w-[40%] h-full absolute flex flex-col justify-center bg-white/5 top-0 -right-[40%] backdrop-blur-sm ml-5 items-center text-5xl  py-14 text-white font-bold"
      >
        <div className="space-y-5 w-full px-10">
          <h4>Work</h4>
          <h4>About Me</h4>
          <h4>Services</h4>
          <h4>Courses</h4>
          <h4>Contact Us</h4>
        </div>

        <RiCloseLargeLine
          id="close"
          className="absolute top-10 right-10 bg-white rounded-full border-0 text-black p-2 font-bold"
          size={30}
          onClick={() => {
            tl.reverse();
          }}
        />
      </div>
    </div>
  );
}
