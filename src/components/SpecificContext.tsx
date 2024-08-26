import React, { createContext, useState, ReactNode } from "react";

interface Member {
  id?: 0,
  name?: "",
  doB?: "",
  gender?: "",
  ethnicId?: number,
  relationShipId?: "",
  citizenId?: ""
}

interface InsuredPerson {
  id: number,
  insuranceProvinceId: number;
  socialInsuranceNumber?: string;
  citizenId: string;
  photoCitizenFront?: string;
  photoCitizenBack?: string;
  fullName: string;
  doB: string;
  gender: string;
  supportBudget?: number;
  wage?: number;
  monthInsured?: number;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
  addressDetail?: "";
  ksXaPhuongMa?: number;
  ksQuanHuyenMa?: number;
  ksTinhThanhMa?: number;
  ksDiaChi?: "";
  ethnicId?: number;
  medicalProvinceId?: number,
  medicalDistrictId?: number,
  hospitalId?: number,
  vungLuongToiThieuId?: number,
  benefitLevel?: "",
  houseHold?: {
    id?: number,
    chuHoTen?: "",
    ksProvinceId?: number,
    ksDistrictId?: number,
    ksWardId?: number,
    ksAddressDetail?: "",
    hkAddressDetail?: "",
    houseHoldPeoples?: Member[]
  }
}

interface InsuranceOrder {
  id: number;
  insuranceId: number;
  accountId: number;
  citizenId: number;
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
  insuranceOrder: InsuranceOrder;
  setInsuranceOrder: (order: InsuranceOrder) => void;
}
export const SpecificContext = createContext<SpecificContextType | undefined>(
  undefined
);

export const SpecificProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
        supportBudget: 0.0,
        wage: 0,
        monthInsured: 0,
        provinceId: 0,
        districtId: 0,
        wardId: 0,
        addressDetail: "",
        ethnicId: 0,
        ksXaPhuongMa: 0,
        ksQuanHuyenMa: 0,
        ksTinhThanhMa: 0,
        ksDiaChi: "",
      },
    ],
  });
  return (
    <SpecificContext.Provider
      value={{
        insuranceOrder,
        setInsuranceOrder,
      }}
    >
      {children}
    </SpecificContext.Provider>
  );
};
