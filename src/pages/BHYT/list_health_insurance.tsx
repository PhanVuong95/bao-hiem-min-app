import axios from "axios";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import CardProductBHYT from "../../components/cardProductBHYT";
import HeaderBase from "../../components/headerBase";


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
      "insuranceProvinceId": null,
      "medicalProvinceId": 0,
      "medicalDistrictId": 0,
      "socialInsuranceNumber": "",
      "healthInsuranceNumber": "",
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
      "newCardStartDate": "",
      "price": 0,
      "hospitalId": 0
    }
  ]
}

// Test
// export let registerInfoBHYT = {
//   "id": 1091,
//   "insuranceId": 1002,
//   "accountId": 0,
//   "citizenId": 0,
//   "photoCitizenFront": "",
//   "photoCitizenBack": "",
//   "phone": "0828782000",
//   "fullName": "Vũ Văn Tuấn",
//   "email": "tuanlbs78@gmail.com",
//   "provinceId": 1062,
//   "districtId": 1695,
//   "wardId": 11489,
//   "finalPrice": 1263000,
//   "addressDetail": "Địa chỉ A",
//   "listInsuredPerson": [
//     {
//       "id": 0,
//       "insuranceProvinceId": 1047,
//       "medicalProvinceId": 1001,
//       "socialInsuranceNumber": "1232132132",
//       "citizenId": "",
//       "photoCitizenFront": "",
//       "photoCitizenBack": "",
//       "fullName": "Vũ Văn Thành",
//       "doB": "02/08/2024",
//       "gender": "Nam",
//       "supportBudget": 0,
//       "wage": 0,
//       "monthInsured": 12,
//       "ethnic": "Kinh",
//       "oldCardStartDate": "01/08/2024",
//       "oldCardEndDate": "02/08/2024",
//       "newCardEndDate": "13/08/2024",
//       "newCardStartDate": "12/08/2024"
//     }
//   ]
// }

const ListHealthInsurance: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    registerInfoBHYT = {
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
          "insuranceProvinceId": null,
          "medicalProvinceId": 0,
          "medicalDistrictId": 0,
          "socialInsuranceNumber": "",
          "healthInsuranceNumber": "",
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
          "newCardStartDate": "",
          "price": 0,
          "hospitalId": 0
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

  if (isLoading) {
    return (
      <>
        <HeaderBase
          isHome={false}
          title={"BHYT tự nguyện"}
        />
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }

  return (
    <div className="pt-20">
      <HeaderBase isHome={false} title={"BHYT tự nguyện"} />
      <div className="flex flex-col gap-[16px] px-4 py-[15px]">
        {/* <SelectCategory /> */}
        <div className="flex flex-col gap-8 pt-1">
          {/* Danh sách bảo hiểm y tế tự nguyện */}
          {listProduct.map((item: any) => {
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
