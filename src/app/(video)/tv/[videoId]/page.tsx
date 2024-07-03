"use client";
import Video from "@/components/videoPlayer/video";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./style.css";
import RetroGrid from "@/components/ui/retro-grid";
import Link from "next/link";
import Image from "next/image";
import { ApiResponse, SearchResult } from "@/app/home/page";
import { RiStarFill } from "@remixicon/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {};
type Creator = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
};

type Genre = {
  id: number;
  name: string;
};

type Network = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type LastEpisode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
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

type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type Show = {
  adult: boolean;
  backdrop_path: string;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisode;
  name: string;
  next_episode_to_air: null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};
const Page = ({ params }: { params: { videoId: string } }) => {
  const [show, setShow] = useState<Show | null>(null);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);

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
        const response = await axios.get<Show | null>(
          `https://api.themoviedb.org/3/tv/${params.videoId}?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmJkYTQwYzdmYjdiNWExNDlmOWNjMGEwNWMxNGYwOCIsIm5iZiI6MTcxOTkwNTYyNC44MTc5OTksInN1YiI6IjY2ODNhY2RkY2VjNjczZjkyYzFlNjVlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bxfrFR7jiBx0FhH0KwRqJZpJiQFOJn9PfDBmsoaUABM",
            },
          }
        );
        if (response.status === 200) {
          setShow(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get<Show | null>(
          `https://api.themoviedb.org/3/tv/${params.videoId}?language=en-US`,
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
          setShow(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get<Show | null>(
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
          setShow(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      setResults([]);
    }
  }, [search, handleSearch]);

  if (!show) {
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
                      <Link href={`/${item.media_type}/${item.id}`} key={index}>
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
          {/* <iframe
            src={`https://vidsrc.xyz/embed/tv/${params.videoId}`}
            width="100%"
            height="100%"
            allowFullScreen
            referrerPolicy="origin"
            className="rounded-xl"
          ></iframe> */}
        </div>
        <div>
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <RetroGrid />
    </div>
  );
};

export default Page;
