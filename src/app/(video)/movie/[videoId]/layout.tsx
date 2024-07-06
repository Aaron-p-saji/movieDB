import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";
import { Movie } from "./page";

type Props = {
  children: React.ReactNode;
};

interface LayoutProps {
  params: { videoId: string };
}

let data: Movie;

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { videoId } = params;

  let title = `TV: ${videoId}`;
  let openGraph = {
    title: `Not Found`,
    description: "No Description",
    images: "",
    type: "",
  };
  let twitter = {
    title: `Not Found`,
    description: "No Description",
    images: "",
    card: "app",
  };
  if (videoId) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${params.videoId}?language=en-US`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmJkYTQwYzdmYjdiNWExNDlmOWNjMGEwNWMxNGYwOCIsIm5iZiI6MTcxOTkwNTYyNC44MTc5OTksInN1YiI6IjY2ODNhY2RkY2VjNjczZjkyYzFlNjVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxfrFR7jiBx0FhH0KwRqJZpJiQFOJn9PfDBmsoaUABM`,
          },
        }
      );

      if (response.ok) {
        data = await response.json();
        title = `Watch ${data?.title}`;
        (openGraph = {
          title: `Watch ${data?.title}`,
          description: data.overview ? data.overview : "",
          images: data.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
            : data?.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : "",
          type: "video.movie",
        }),
          (twitter = {
            title: `Watch ${data?.title}`,
            description: data.overview ? data.overview : "",
            images: data.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
              : data?.poster_path
              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
              : "",
            card: "summary_large_image",
          });
      } else {
        title = "Your Request Could not be completed";
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  return {
    title,
    openGraph,
    twitter,
  };
}

const Layout = ({ children }: Props) => {
  return <div className="w-full h-full">{children}</div>;
};

export default Layout;
