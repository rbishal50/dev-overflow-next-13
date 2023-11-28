"use client";

import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const router = useRouter();

  const handleFilterClick = (item: string) => {
    if (active === item) {
      setActive("");

      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keys: ["filter"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map(({ name, value }) => (
        <Button
          key={value}
          onClick={() => handleFilterClick(value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500 "
          } `}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
