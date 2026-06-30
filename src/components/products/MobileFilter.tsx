"use client";

import Button from "@/components/ui/button";
import { ICategory } from "@/interface";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterAside from "./FilterAside";


interface FilterAsideProps {
  categories: string[];
  brands: string[];
  ratings: number[];
  price: number;
  setPrice: (value: number) => void;
  toggleCategory: (category: ICategory) => void;
  toggleBrand: (brand: ICategory) => void;
  toggleRating: (rating: number) => void;
  setOpen?: (val: boolean) => void;
}


const MobileFilter = ({
  categories,
  brands,
  ratings,
  price,
  setPrice,
  toggleCategory,
  toggleBrand,
  toggleRating,
  setOpen
}: FilterAsideProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button className="xl:hidden" onClick={() => setIsOpen(true)}>
        <FaFilter />
        <span className="ml-2">Filter</span>
      </Button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 xl:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-gray-100 w-80 z-50 xl:hidden transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <FilterAside
          categories={categories}
          ratings={ratings}
          price={price}
          setPrice={setPrice}
          toggleCategory={toggleCategory}
          toggleRating={toggleRating}
          setOpen={setOpen}
          brands={brands}
          toggleBrand={toggleBrand}
        />
      </div>
    </>
  );
};

export default MobileFilter;