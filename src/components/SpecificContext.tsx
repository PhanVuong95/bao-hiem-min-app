// src/context/SpecificContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface InsuredPerson {
  insuranceProvinceId: number;
  socialInsuranceNumber?: string;
  citizenId: string;
  photoCitizenFront?: string;
  photoCitizenBack?: string;
  fullName: string;
  doB: string;
  gender: string;
  ethnic: string;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
  addressDetail?: string;
  oldCardStartDate: string;
  oldCardEndDate: string;
  newCardStartDate: string;
  newCardEndDate: string;
  medicalProvinceId?: number;
  hospitalId?: number;
  supportBudget?: number;
  wage?: number;
  monthInsured?: number;
}

interface InsuranceOrder {
  id: number;
  insuranceId: number;
  accountId: number;
  photoCitizenFront?: string;
  photoCitizenBack?: string;
  phone: string;
  fullName: string;
  email?: string;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
  finalPrice: number;
  addressDetail?: string;
  listInsuredPerson: InsuredPerson[];
}
interface SpecificContextType {
  // frontCitizenidPhoto: string;
  // backCitizenidPhoto: string;
  // insuranceOrderId: number;
  insuranceOrder: InsuranceOrder;
  // setFrontCitizenidPhoto: (value: string) => void;
  // setBackCitizenidPhoto: (value: string) => void;
  // setInsuranceOrderId: (value: number) => void;
  setInsuranceOrder: (order: InsuranceOrder) => void;
}
export const SpecificContext = createContext<SpecificContextType | undefined>(
  undefined
);

export const SpecificProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [frontCitizenidPhoto, setFrontCitizenidPhoto] = useState<string>("");
  // const [backCitizenidPhoto, setBackCitizenidPhoto] = useState<string>("");
  // const [insuranceOrderId, setInsuranceOrderId] = useState<number>(0);
  const [insuranceOrder, setInsuranceOrder] = useState<InsuranceOrder>({
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
  });
  // const [insuranceOrder, setInsuranceOrder] = useState<InsuranceOrder>({
  //   id: 0,
  //   insuranceId: 1001,
  //   accountId: 0,
  //   citizenId: 1063,
  //   photoCitizenFront:
  //     "/files/upload/account/1019/8332efeb-3a3b-4902-98c7-6b36d850cb47.jpg",
  //   photoCitizenBack:
  //     "/files/upload/account/1019/54dbc8b7-e12d-40e0-8204-04e53c7507c3.jpg",
  //   phone: "0889123912",
  //   fullName: "Hà",
  //   email: "ha@gmail.com",
  //   provinceId: 1055,
  //   districtId: 1620,
  //   wardId: 10679,
  //   finalPrice: 18084000,
  //   addressDetail: "số 12",
  //   listInsuredPerson: [
  //     {
  //       id: 0,
  //       insuranceProvinceId: 1047,
  //       socialInsuranceNumber: "12312312321",
  //       citizenId: "123123123",
  //       photoCitizenFront:
  //         "/files/upload/account/1019/8332efeb-3a3b-4902-98c7-6b36d850cb47.jpg",
  //       photoCitizenBack:
  //         "/files/upload/account/1019/54dbc8b7-e12d-40e0-8204-04e53c7507c3.jpg",
  //       fullName: "Nguyễn Thanh Hà",
  //       doB: "28/08/2024",
  //       gender: "male",
  //       supportBudget: 396000,
  //       wage: 7000000,
  //       monthInsured: 12,
  //     },
  //   ],
  // });
  return (
    <SpecificContext.Provider
      value={{
        // frontCitizenidPhoto,
        // backCitizenidPhoto,
        // insuranceOrderId,
        insuranceOrder,
        // setFrontCitizenidPhoto,
        // setBackCitizenidPhoto,
        // setInsuranceOrderId,
        setInsuranceOrder,
      }}
    >
      {children}
    </SpecificContext.Provider>
  );
};
