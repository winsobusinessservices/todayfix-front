import React from "react";
import AdvancedSearch from "../components/AdvancedSearch";
import ServicesCards from "../components/ServiceCards";

const Services = () => {
  return (
    <div className="w-full max-w-6xl mx-auto relative flex flex-col gap-4">
      <AdvancedSearch />
      <div className="">
        <ServicesCards />
      </div>
    </div>
  );
};

export default Services;
