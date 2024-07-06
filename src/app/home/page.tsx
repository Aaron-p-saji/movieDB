"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RetroGrid from "@/components/ui/retro-grid";
import { BorderBeam } from "@/components/ui/border-beam";

type Props = {};

// Define types for the response structure
export type SearchResult = {
  backdrop_path: string | null;
  id: number;
  name?: string;
  original_name?: string;
  title?: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date?: string;
  release_date?: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
};

export type ApiResponse = {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
};

const poppins = Poppins({
  weight: ["100", "500", "800", "700", "600", "900"],
  subsets: ["latin"],
});

const Page = (props: Props) => {
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
    if (search) {
      handleSearch(search);
    } else {
      setResults([]);
    }
  }, [search, handleSearch]);

  return (
    <TooltipProvider>
      <div className="flex fc bg-[#000] h-[100vh] w-full overflow-y-auto overflow-x-hidden scrollbar scrollbar-w-2 scrollbar-thumb-[#696969b1] scrollbar-thumb-rounded-full scrollbar-h-2 ">
        <div className="w-full mx-10 py-5">
          <div className="flex flex-col items-center space-y-20">
            <div className="w-80 space-y-5 flex flex-col items-center">
              <h1
                className={`${poppins.className} text-4xl font-bold text-white`}
              >
                Search
              </h1>
              <Input
                type="text"
                placeholder="Search"
                className="text-white"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col">
              <div className="w-full flex flex-col items-center space-y-10">
                <h1
                  className={`${poppins.className} text-4xl font-bold text-white`}
                >
                  List
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {results.map((result, index) => (
                    <Link
                      href={`/${result.media_type}/${result.id}`}
                      key={index}
                    >
                      <div className="relative">
                        <CardContainer className="inter-var" key={result.id}>
                          <CardBody className="relative group/card hover:shadow-2xl max-w-sm w-full min-w-[300px] flex flex-col hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] h-auto rounded-xl p-6 border">
                            <CardItem
                              translateZ="50"
                              className="text-xl font-bold text-white"
                            >
                              {result.name || result.title}
                            </CardItem>
                            <Tooltip>
                              <TooltipTrigger>
                                <CardItem
                                  as="p"
                                  translateZ="60"
                                  className="text-sm mt-2 text-neutral-300 overflow-hidden overflow-ellipsis h-10 text-start"
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
                                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
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
                        </CardContainer>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <RetroGrid />
      </div>
    </TooltipProvider>
  );
};

export default Page;
