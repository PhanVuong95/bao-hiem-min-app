import axios from "axios";
import React, { useEffect, useState } from "react";
import CardProductBHYT from "../components/cardProductBHYT";
import HeaderBase from "../components/headerBase";
import SelectCategory from "../components/selectCategory";

export let registerInfoBHYT = {
  "id": 0,
  "insuranceId": 0,
  "accountId": 0,
  "citizenId": 0,
  "photoCitizenFront": "",
  "photoCitizenBack": "",
  "phone": "",
  "fullName": "",
  "email": "",
  "provinceId": 0,
  "districtId": 0,
  "wardId": 0,
  "finalPrice": 0,
  "addressDetail": "",
  "listInsuredPerson": [
    {
      "id": 0,
      "insuranceProvinceId": 0,
      "medicalProvinceId": 0,
      "socialInsuranceNumber": "",
      "citizenId": "",
      "photoCitizenFront": "",
      "photoCitizenBack": "",
      "fullName": "",
      "doB": "",
      "gender": "",
      "supportBudget": 0,
      "wage": 0,
      "monthInsured": 0,
      "ethnic": "",
      "oldCardStartDate": "",
      "oldCardEndDate": "",
      "newCardEndDate": "",
      "newCardStartDate": ""
    }
  ]
}

const ListHealthInsurance: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    registerInfoBHYT = {
      "id": 0,
      "insuranceId": 0,
      "accountId": 0,
      "citizenId": 1063,
      "photoCitizenFront": "",
      "photoCitizenBack": "",
      "phone": "",
      "fullName": "",
      "email": "",
      "provinceId": 0,
      "districtId": 0,
      "wardId": 0,
      "finalPrice": 0,
      "addressDetail": "",
      "listInsuredPerson": [
        {
          "id": 0,
          "insuranceProvinceId": 0,
          "medicalProvinceId": 0,
          "socialInsuranceNumber": "",
          "citizenId": "",
          "photoCitizenFront": "",
          "photoCitizenBack": "",
          "fullName": "",
          "doB": "",
          "gender": "",
          "supportBudget": 0,
          "wage": 0,
          "monthInsured": 0,
          "ethnic": "",
          "oldCardStartDate": "",
          "oldCardEndDate": "",
          "newCardEndDate": "",
          "newCardStartDate": ""
        }
      ]
    }
  });

  useEffect(() => {
    axios
      .get(
        "https://baohiem.dion.vn/insurance/api/list-paging-viewmodel?pageIndex=1&pageSize=100&insuranceTypeId=1002"
      )
      .then((response) => {
        setListProduct(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="pt-20">
      <HeaderBase isHome={false} title={"BHYT tự nguyện"} />
      <div className="flex flex-col gap-[16px] px-4 py-[15px]">
        <SelectCategory />
        <div className="flex flex-col gap-8">
          {/* Danh sách bảo hiểm y tế tự nguyện */}
          {isLoading
            ? "Loading"
            : listProduct.map((item: any) => {
              return (
                <CardProductBHYT
                  key={`${item?.id}_card_product_bhyt`}
                  url={"/register-BHYT"}
                  data={item}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ListHealthInsurance;
