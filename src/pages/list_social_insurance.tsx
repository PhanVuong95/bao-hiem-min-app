import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderBase from "../components/header_base";
import { SpecificContext } from "../components/specific_context";
import logo from "../../assets-src/logo1.png";

const ListSocialInsurance = () => {
  const specificContext = useContext<any>(SpecificContext);
  const [insurance, setInsurance] = useState<any>();
  const { insuranceOrder, setInsuranceOrder } = specificContext;

  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/insurance/api/detail-viewmodel?id=1001")
      .then((response) => {
        setInsurance(response.data.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      provinceId: 0,
      districtId: 0,
      wardId: 0,
      finalPrice: 0,
      addressDetail: "",
      listInsuredPerson: [
        {
          id: 0,
          insuranceProvinceId: 0,
          socialInsuranceNumber: "",
          citizenId: "",
          photoCitizenFront: "",
          photoCitizenBack: "",
          fullName: "",
          doB: "",
          gender: "",
          supportBudget: 0.0,
          wage: 0,
          monthInsured: 0,
          provinceId: 0,
          districtId: 0,
          wardId: 0,
          addressDetail: "",
          ksXaPhuongMa: 0,
          ksQuanHuyenMa: 0,
          ksTinhThanhMa: 0,
          ksDiaChi: "",
          ethnicId: 0,
          medicalProvinceId: 0,
          medicalDistrictId: 0,
          hospitalId: 0,
          vungLuongToiThieuId: 0,
          benefitLevel: "",
        },
      ],
      houseHold: {
        id: 0,
        chuHoTen: "",
        ksProvinceId: 0,
        ksDistrictId: 0,
        ksWardId: 0,
        ksAddressDetail: "",
        hkAddressDetail: "",
        soGiayToCaNhan: "",
        ttProvinceId: 0,
        ttDistrictId: 0,
        ttWardId: 0,
        houseHoldPeoples: [
          {
            id: 0,
            name: "",
            doB: "",
            gender: "",
            ethnicId: 0,
            relationShipId: "",
            citizenId: "",
            ksProvinceId: 0,
            ksDistrictId: 0,
            ksWardId: 0,
            ksAddressDetail: ""
          }
        ]
      },
    }));
  }, []);

  // useEffect(() => {
  //   setInsuranceOrder(() => ({
  //     "id": 1252,
  //     "insuranceId": 1001,
  //     "accountId": 1019,
  //     "citizenId": "0",
  //     "photoCitizenFront": "/files/upload/account/1019/f54ac0c5-e125-4f40-bada-586fd4aeaa1a.jpg",
  //     "photoCitizenBack": "/files/upload/account/1019/36a98a86-c57a-4e27-92dc-284bfbb3744c.jpg",
  //     "phone": "0828782000",
  //     "fullName": "Vũ Văn D",
  //     "email": "tuanlbs78@gmail.com",
  //     "provinceId": 1398,
  //     "districtId": 2415,
  //     "wardId": 9673,
  //     "addressDetail": "Địa chỉ C",
  //     "price": 0,
  //     "discountPrice": 0,
  //     "finalPrice": 17688000,
  //     "fileUploadUrl": null,
  //     "houseHold": {
  //       "id": 1014,
  //       "chuHoTen": "Vũ Văn A",
  //       "ksProvinceId": 1398,
  //       "ksDistrictId": 1777,
  //       "ksWardId": 8589,
  //       "ksAddressDetail": "Địa chỉ C",
  //       "hkAddressDetail": "Địa Chỉ A",
  //       "insuredPersonId": 1105,
  //       "houseHoldPeoples": [
  //         {
  //           "id": 1043,
  //           "name": "Vũ Văn D",
  //           "doB": "20/08/2024",
  //           "gender": "Nam",
  //           "ethnicId": 1001,
  //           "relationShipId": "Bố ruột",
  //           "citizenId": "030200008767",
  //           "houseHoldId": 1014,
  //           "ksProvinceId": 0,
  //           "ksDistrictId": 0,
  //           "ksWardId": 0,
  //           "ksAddressDetail": ""
  //         }
  //       ]
  //     },
  //     "listInsuredPerson": [
  //       {
  //         "id": 1105,
  //         "insuranceProvinceId": 1398,
  //         "socialInsuranceNumber": "1234567890",
  //         "healthInsuranceNumber": null,
  //         "citizenId": "030200008757",
  //         "photoCitizenFront": "/files/upload/account/1019/f54ac0c5-e125-4f40-bada-586fd4aeaa1a.jpg",
  //         "photoCitizenBack": "/files/upload/account/1019/36a98a86-c57a-4e27-92dc-284bfbb3744c.jpg",
  //         "fullName": "Vũ Văn A",
  //         "doB": "01/08/2024",
  //         "gender": "Nam",
  //         "ethnic": null,
  //         "provinceId": 1411,
  //         "districtId": 1775,
  //         "wardId": 8564,
  //         "addressDetail": "Địa chỉ TT",
  //         "ksXaPhuongMa": 9728,
  //         "ksTinhThanhMa": 1398,
  //         "ksQuanHuyenMa": 2345,
  //         "ksDiaChi": "Địa chỉ Ks",
  //         "ethnicId": 1001,
  //         "vungLuongToiThieuId": 1004,
  //         "benefitLevel": "3000000",
  //         "oldCardStartDate": null,
  //         "oldCardEndDate": null,
  //         "newCardStartDate": null,
  //         "newCardEndDate": null,
  //         "medicalProvinceId": 1398,
  //         "hospitalId": 4466,
  //         "supportBudget": 792000,
  //         "wage": 7000000,
  //         "monthInsured": 12,
  //         "price": null,
  //         "medicalDistrictId": 0
  //       }
  //     ]
  //   }));
  // }, []);


  return (
    <div className="">
      <HeaderBase isHome={false} title={"BHXH tự nguyện"} />
      <div className="px-4 mt-8 pt-[68px] gap-[16px] py-[24px] flex flex-col ">

        <div className="flex flex-col gap-8">
          <div className="p-4 bg-white w-full rounded-xl flex flex-col gap-4">
            <div className="flex gap-[10px]">
              <img src={logo} className="w-20 h-20" />

              <div className="title-product flex flex-col">
                <h3 className="text-[#0076B7] text-lg font-medium">
                  {insurance?.name}
                </h3>
                <p className="text-[#646464] text-sm font-normal">Theo tháng</p>
                <span className="text-[#0076B7] text-lg font-bold">
                  {insurance?.discount}
                  <samp className="text-[#646464] text-sm font-normal"> %</samp>
                </span>
              </div>
            </div>

            <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between w-full">
                <div>
                  <p className="text-[#646464] text-sm font-normal">Dành cho</p>
                </div>
                <div>
                  <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                    {insurance?.towards}
                  </p>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div>
                  <p className="text-[#646464] text-sm font-normal">
                    Hỗ trợ mức đóng
                  </p>
                </div>
                <div>
                  <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                    {insurance?.supportDiscount}
                  </p>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div>
                  <p className="text-[#646464] text-sm font-normal">
                    Giới hạn tuổi
                  </p>
                </div>
                <div>
                  <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                    Trên {insurance?.ageLimit} tuổi
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[#646464] text-sm font-normal">
                  Quyền lợi nổi trội
                </p>
              </div>
              {insurance?.insuranceBenefits.map((item, index) => {
                return (
                  <div className="flex flex-row w-full gap-4">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.5038 1.31775C15.5771 1.31775 19.6914 5.43207 19.6914 10.5053C19.6914 15.5786 15.5771 19.6929 10.5038 19.6929C5.43051 19.6929 1.31619 15.5786 1.31619 10.5053C1.31619 5.43207 5.43051 1.31775 10.5038 1.31775ZM8.59587 13.4895L6.34652 11.2383C5.96331 10.8549 5.96323 10.2296 6.34652 9.84626C6.72989 9.46297 7.35795 9.46537 7.73853 9.84626L9.32431 11.4333L13.2692 7.4884C13.6526 7.10503 14.2779 7.10503 14.6612 7.4884C15.0446 7.87169 15.044 8.49758 14.6612 8.88041L10.0192 13.5224C9.63637 13.9052 9.01047 13.9058 8.62718 13.5224C8.61641 13.5116 8.60602 13.5007 8.59587 13.4895Z"
                          fill="#00BA00"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[#2E2E2E] text-sm font-normal ">
                        {item.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-row justify-between items-center gap-[10px] my-4 ">
              <div>
                <Link
                  to={"/product-detail/" + 1001}
                  className="px-[38px] py-3 rounded-full bg-[#DEE7FE] text-[15px] font-medium text-[#0076B7]"
                >
                  Xem chi tiết
                </Link>
              </div>
              <div>
                <Link
                  to={"/register-BHXH"}
                  className="px-[38px] py-3 rounded-full bg-[#0076B7] text-[15px] font-medium text-[#fff]"
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSocialInsurance;
