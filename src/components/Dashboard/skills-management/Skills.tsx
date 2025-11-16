import React from "react";
import SkillsStats from "./SkillsStats";
import AllCategoriesTable from "./AllCategoriesTable";
import AllSubCategoriesTable from "./AllSubCategoriesTable";
import AllSkillsTable from "./AllSkillsTable";

function Skills() {
  return (
    <div className="p-2">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Skills Management</h1>

      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row gap-5 m-5">
        {/* Stats (left) */}
        <div className="w-full lg:w-[20%]">
          <SkillsStats />
        </div>

        {/* Categories (right) */}
        <div className="w-full lg:w-[80%]">
          <AllCategoriesTable />
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-col lg:flex-row gap-5 m-5">
        {/* Subcategories */}
        <div className="w-full lg:w-1/2">
          <AllSubCategoriesTable />
        </div>

        {/* Skills */}
        <div className="w-full lg:w-1/2">
          <AllSkillsTable />
        </div>
      </div>
    </div>
  );
}

export default Skills;
