"use client";
import Video from "@/components/videoPlayer/video";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./style.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import RetroGrid from "@/components/ui/retro-grid";
import { RiStarFill } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";
import { ApiResponse, SearchResult } from "@/app/home/page";
import { TVShowResults } from "../../tv/[videoId]/page";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BorderBeam } from "@/components/ui/border-beam";

type Props = {};

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const Page = ({ params }: { params: { videoId: string } }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recommended, setRecommended] = useState<TVShowResults>();

  // Debounce function
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmJkYTQwYzdmYjdiNWExNDlmOWNjMGEwNWMxNGYwOCIsIm5iZiI6MTcxOTkwNTYyNC44MTc5OTksInN1YiI6IjY2ODNhY2RkY2VjNjczZjkyYzFlNjVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxfrFR7jiBx0FhH0KwRqJZpJiQFOJn9PfDBmsoaUABM",
            },
          }
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Movie | null>(
          `https://api.themoviedb.org/3/movie/${params.videoId}?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmJkYTQwYzdmYjdiNWExNDlmOWNjMGEwNWMxNGYwOCIsIm5iZiI6MTcxOTkwNTYyNC44MTc5OTksInN1YiI6IjY2ODNhY2RkY2VjNjczZjkyYzFlNjVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxfrFR7jiBx0FhH0KwRqJZpJiQFOJn9PfDBmsoaUABM",
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setMovie(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get<TVShowResults>(
          `https://api.themoviedb.org/3/tv/${params.videoId}/recommendations?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmJkYTQwYzdmYjdiNWExNDlmOWNjMGEwNWMxNGYwOCIsIm5iZiI6MTcxOTkwNTYyNC44MTc5OTksInN1YiI6IjY2ODNhY2RkY2VjNjczZjkyYzFlNjVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxfrFR7jiBx0FhH0KwRqJZpJiQFOJn9PfDBmsoaUABM",
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setRecommended(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
    fetchRecommendations();
  }, []);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      setResults([]);
    }
  }, [search, handleSearch]);

  if (!movie) {
    return (
      <div className="bg-[#000] w-full h-full flex flex-col items-center justify-center">
        <div
          aria-label="Orange and tan hamster running in a metal wheel"
          role="img"
          className="wheel-and-hamster"
        >
          <div className="wheel"></div>
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          <div className="spoke"></div>
        </div>
      </div>
    );
  }
  return (
    <TooltipProvider>
      <div className="w-full h-full flex flex-col bg-[#000] relative items-center">
        <div className="flex flex-col items-center w-full h-full space-y-5 max-w-[calc(100%-50rem)] max-h-[calc(100%-5rem)] z-[9999] overflow-y-auto">
          <div className="flex w-full h-fit text-white py-5 justify-between">
            <div className="flex space-x-2 items-center">
              <Link href="/">
                <div className="px-4 py-2 flex space-x-2 select-none w-fit items-center">
                  <Image
                    src="/icon-512x512.png"
                    className="w-fit"
                    alt="logo"
                    width={25}
                    height={25}
                  />
                  <h1>supaMovie</h1>
                </div>
              </Link>

              <Link
                href="/home"
                className="py-2 px-4 hover:bg-neutral-800 rounded-xl text-muted text-sm"
              >
                <h1>Home</h1>
              </Link>
            </div>
            <div className="flex items-center w-full h-fit max-w-[440px]">
              <form className="relative w-full h-full">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search here"
                    className="w-full py-2 px-4 rounded-full bg-transparent h-full border border-slate-500"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {results.length > 0 && (
                  <div className="absolute top-14 p-4 bg-[#000] border border-slate-500 text-white w-[95%] left-1/2 -translate-x-1/2 rounded-xl overflow-hidden">
                    <div className="w-full flex flex-col space-y-5 max-h-[440px] overflow-y-auto scrollbar scrollbar-h-1 scrollbar-w-1 relative">
                      {results.map((item, index) => (
                        <Link
                          href={`/${item.media_type}/${item.id}`}
                          key={index}
                        >
                          <div className="flex h-14 space-x-2" key={index}>
                            <div className="w-20">
                              <Image
                                src={`https://image.tmdb.org/t/p/w500${
                                  item.poster_path
                                    ? item.poster_path
                                    : item.backdrop_path
                                }`}
                                alt="image"
                                width={100}
                                height={100}
                                className="object-cover w-full h-full object-[100%_15%]"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span>
                                {item.original_name
                                  ? item.original_name
                                  : item.original_title}
                              </span>
                              <div className="flex space-x-2">
                                <span className="text-slate-300 text-sm">
                                  Lang:{" "}
                                  <span className="text-white">
                                    {item.original_language}
                                  </span>
                                </span>
                                <span className="text-slate-300 text-sm">
                                  <span className="text-white flex space-x-2 items-center">
                                    <RiStarFill size={15} />
                                    <span>
                                      {Math.floor(item.vote_average)}/10
                                    </span>
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div></div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="w-full h-full rounded-xl flex flex-col overflow-hidden p-2 border-slate-300 border">
            <iframe
              src={`https://vidsrc.xyz/embed/movie/${params.videoId}`}
              width="100%"
              height="100%"
              allowFullScreen
              referrerPolicy="origin"
              className="rounded-xl"
              sandbox="allow-same-origin allow-scripts allow-pointer-lock"
            ></iframe>
          </div>
          <div>
            <div className="flex flex-wrap space-x-2 space-y-2 w-full gap-2 h-full items-center justify-center">
              {recommended &&
                recommended.results.map((result, index) => (
                  <div key={index} className="relative">
                    <CardContainer className="inter-var" key={result.id}>
                      <Link href={`/${result.media_type}/${result.id}`}>
                        <CardBody className="relative group/card hover:shadow-2xl max-w-sm w-full min-w-[300px] flex flex-col hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] h-auto rounded-xl p-6 border">
                          <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-white"
                          >
                            {result.name}
                          </CardItem>
                          <Tooltip>
                            <TooltipTrigger>
                              <CardItem
                                as="p"
                                translateZ="60"
                                className="text-sm mt-2 text-neutral-300 overflow-hidden overflow-ellipsis h-10 "
                              >
                                {result.overview}
                              </CardItem>
                            </TooltipTrigger>
                            <TooltipContent className="w-80">
                              <p>{result.overview}</p>
                            </TooltipContent>
                          </Tooltip>
                          <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                              loading="lazy"
                              src={
                                result.poster_path || result.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${
                                      result.poster_path
                                        ? result.poster_path
                                        : result.backdrop_path
                                    }`
                                  : `https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg`
                              }
                              height="1000"
                              width="1000"
                              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl object-[50%_30%]"
                              alt="thumbnail"
                            />
                          </CardItem>
                          <div className="flex justify-between items-center mt-20">
                            <CardItem
                              translateZ={20}
                              as="button"
                              className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold"
                            >
                              Watch
                            </CardItem>
                          </div>
                          <BorderBeam size={500} duration={12} delay={9} />
                        </CardBody>
                      </Link>
                    </CardContainer>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <RetroGrid />
      </div>
    </TooltipProvider>
  );
};

export default Page;
