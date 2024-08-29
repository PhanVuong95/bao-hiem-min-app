import axios from "axios";
import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import CardProductBHYT from "../../components/card_product_bhyt";
import HeaderBase from "../../components/header_base";


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
  "fileUploadUrl": "",
  "houseHold": {
    "id": 0,
    "chuHoTen": "",
    "ksProvinceId": 0,
    "ksDistrictId": 0,
    "ksWardId": 0,
    "ksAddressDetail": "",
    "hkAddressDetail": "",
    "ttProvinceId": 0,
    "ttDistrictId": 0,
    "ttWardId": 0,
    "soGiayToCaNhan": "",
    "houseHoldPeoples": [
      {
        "id": 0,
        "name": "",
        "doB": "",
        "gender": "",
        "ethnicId": 0,
        "relationShipId": "",
        "citizenId": ""
      }
    ]
  },
  "listInsuredPerson": [
    {
      "id": 0,
      "insuranceProvinceId": 0,
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
      "oldCardStartDate": "",
      "oldCardEndDate": "",
      "newCardEndDate": "",
      "newCardStartDate": "",
      price: 0,
      "hospitalId": 0,
      "provinceId": 0,
      "districtId": 0,
      "wardId": 0,
      "addressDetail": "",
      "ksXaPhuongMa": 0,
      "ksQuanHuyenMa": 0,
      "ksTinhThanhMa": 0,
      "ksDiaChi": "",
      "ethnicId": 0,
      "vungLuongToiThieuId": 0,
    }
  ]
}

const ListHealthInsurance: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listProduct, setListProduct] = useState([]);

  // useEffect(() => {
  //   registerInfoBHYT = {
  //     "id": 0,
  //     "insuranceId": 0,
  //     "accountId": 0,
  //     "citizenId": 0,
  //     "photoCitizenFront": "",
  //     "photoCitizenBack": "",
  //     "phone": "",
  //     "fullName": "",
  //     "email": "",
  //     "provinceId": 0,
  //     "districtId": 0,
  //     "wardId": 0,
  //     "finalPrice": 0,
  //     "addressDetail": "",
  //     "fileUploadUrl": "",
  //     "houseHold": {
  //       "id": 0,
  //       "chuHoTen": "",
  //       "ksProvinceId": 0,
  //       "ksDistrictId": 0,
  //       "ksWardId": 0,
  //       "ksAddressDetail": "",
  //       "hkAddressDetail": "",
  //       "ttProvinceId": 0,
  //       "ttDistrictId": 0,
  //       "ttWardId": 0,
  //       "soGiayToCaNhan": "",
  //       "houseHoldPeoples": [
  //         {
  //           "id": 0,
  //           "name": "",
  //           "doB": "",
  //           "gender": "",
  //           "ethnicId": 0,
  //           "relationShipId": "",
  //           "citizenId": ""
  //         }
  //       ]
  //     },
  //     "listInsuredPerson": [
  //       {
  //         "id": 0,
  //         "insuranceProvinceId": 0,
  //         "medicalProvinceId": 0,
  //         "medicalDistrictId": 0,
  //         "socialInsuranceNumber": "",
  //         "healthInsuranceNumber": "",
  //         "citizenId": "",
  //         "photoCitizenFront": "",
  //         "photoCitizenBack": "",
  //         "fullName": "",
  //         "doB": "",
  //         "gender": "",
  //         "supportBudget": 0,
  //         "wage": 0,
  //         "monthInsured": 0,
  //         "oldCardStartDate": "",
  //         "oldCardEndDate": "",
  //         "newCardEndDate": "",
  //         "newCardStartDate": "",
  //         price: 0,
  //         "hospitalId": 0,
  //         "provinceId": 0,
  //         "districtId": 0,
  //         "wardId": 0,
  //         "addressDetail": "",
  //         "ksXaPhuongMa": 0,
  //         "ksQuanHuyenMa": 0,
  //         "ksTinhThanhMa": 0,
  //         "ksDiaChi": "",
  //         "ethnicId": 0,
  //         "vungLuongToiThieuId": 0,
  //       }
  //     ]
  //   }
  // }, []);

  useEffect(() => {
    registerInfoBHYT = {
      "id": 0,
      "insuranceId": 1002,
      "accountId": 0,
      "citizenId": 0,
      "photoCitizenFront": "",
      "photoCitizenBack": "",
      "phone": "0828782000",
      "fullName": "Người mua",
      "email": "tuanlbs78@gmail.com",
      "provinceId": 1398,
      "districtId": 2349,
      "wardId": 10569,
      "finalPrice": 1263000,
      "addressDetail": "Địa chỉ A",
      "fileUploadUrl": "",
      "houseHold": {
        "id": 0,
        "chuHoTen": "Chủ hộ",
        "ksProvinceId": 1398,
        "ksDistrictId": 1779,
        "ksWardId": 8614,
        "ksAddressDetail": "Địa chỉ KS",
        "hkAddressDetail": "Địa chỉ hk",
        "ttProvinceId": 1398,
        "ttDistrictId": 2349,
        "ttWardId": 10569,
        "soGiayToCaNhan": "030200008757",
        "houseHoldPeoples": [
          {
            "id": 0,
            "name": "Vũ Văn Tuấn",
            "doB": "01/08/2024",
            "gender": "Nam",
            "ethnicId": 1001,
            "relationShipId": "Bố ruột",
            "citizenId": "030200008754"
          },
          {
            "id": 0,
            "name": "Vũ Văn C",
            "doB": "01/08/2024",
            "gender": "Nam",
            "ethnicId": 1001,
            "relationShipId": "Mẹ ruột",
            "citizenId": "030200008757"
          }
        ]
      },
      "listInsuredPerson": [
        {
          "id": 0,
          "insuranceProvinceId": 1398,
          "medicalProvinceId": 1398,
          "medicalDistrictId": 0,
          "socialInsuranceNumber": "",
          "healthInsuranceNumber": "1234567879",
          "citizenId": "030200007656",
          "photoCitizenFront": "/files/upload/account/1019/efac83ea-2333-428a-abb1-1df04a08a881.jpg",
          "photoCitizenBack": "/files/upload/account/1019/ca65268c-366c-4388-b083-8e86bbcc229d.jpg",
          "fullName": "Vũ Văn Tuấn",
          "doB": "01/08/2024",
          "gender": "Nam",
          "supportBudget": 0,
          "wage": 0,
          "monthInsured": 12,
          "oldCardStartDate": "",
          "oldCardEndDate": "",
          "newCardEndDate": "",
          "newCardStartDate": "31/08/2024",
          "price": 1263000,
          "hospitalId": 4469,
          "provinceId": 1398,
          "districtId": 2347,
          "wardId": 9757,
          "addressDetail": "Địa chỉ TT",
          "ksXaPhuongMa": 8627,
          "ksQuanHuyenMa": 1780,
          "ksTinhThanhMa": 1398,
          "ksDiaChi": "Địa chỉ A",
          "ethnicId": 1001,
          "vungLuongToiThieuId": 1004
        }
      ]
    }
  }, [])

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
