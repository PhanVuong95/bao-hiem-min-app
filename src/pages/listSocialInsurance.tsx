import React from "react";
import CardProduct from "../components/cardProduct";
import SelectCategory from "../components/selectCategory";

const ListSocialInsurance: React.FunctionComponent = (props) => {
  return (
    <div className="flex flex-col gap-[16px] px-4 py-[24px]">
      <SelectCategory />
      <div className="flex flex-col gap-8">
        <CardProduct w={""} h={""} url={"/register-BHXH"} />
      </div>
    </div>
  );
};

export default ListSocialInsurance;
