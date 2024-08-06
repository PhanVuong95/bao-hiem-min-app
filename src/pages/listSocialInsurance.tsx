import React, { useContext, useEffect, useRef, useState } from "react";
import CardProduct from "../components/cardProduct";
import HeaderBase from "../components/headerBase";
import SelectCategory from "../components/selectCategory";
import { SpecificContext } from "../components/SpecificContext";

const ListSocialInsurance: React.FunctionComponent = (props) => {
  const specificContext = useContext(SpecificContext);
  const { insuranceOrder, setInsuranceOrder } = specificContext;
  useEffect(() => {
    setInsuranceOrder(() => ({
      id: 0,
      insuranceId: 0,
      accountId: 0,
      citizenId: 0,
      photoCitizenFront: "",
      photoCitizenBack: "",
      phone: "",
      fullName: "",
      email: "",
      provinceId: 1063,
      districtId: 1705,
      wardId: 11598,
      finalPrice: 0,
      addressDetail: "",
      listInsuredPerson: [
        {
          id: 0,
          insuranceProvinceId: 1063,
          socialInsuranceNumber: "",
          citizenId: "",
          photoCitizenFront: "",
          photoCitizenBack: "",
          fullName: "",
          doB: "",
          gender: "",
          //ethnic: "",
          //provinceId: 0,
          //districtId: 0,
          //wardId: 0,
          //addressDetail: "",
          //oldCardStartDate: "",
          //oldCardEndDate: "",
          //newCardStartDate: "",
          //newCardEndDate: "",
          //medicalProvinceId: 0,
          //hospitalId: 0,
          supportBudget: 0.0,
          wage: 0,
          monthInsured: 0,
        },
      ],
    }));
  }, []);

  return (
    <div className="">
      <HeaderBase isHome={false} title={"BHYT tự nguyện"} />
      <div className="px-4 mt-8 pt-[60px] gap-[16px] py-[24px] flex flex-col ">
        <SelectCategory />
        <div className="flex flex-col gap-8">
          <CardProduct w={""} h={""} url={"/register-BHXH"} />
        </div>
      </div>
    </div>
  );
};

export default ListSocialInsurance;
