import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FadeLoader } from "react-spinners";
import Modal from 'react-modal';
import { SpecificContext } from "./SpecificContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HeaderBase from "./headerBase";
import imageQR from "../../assets-src/icon_qr.png";
import {
  convertListToSelect,
  convertListToSelectVungLuong,
  formatDate2,
  isValidCitizenId,
  isValidEmail,
  isValidEmptyString,
  isValidPhone,
} from "../utils/validateString";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import "../locale/vi";
import customParseFormat from "dayjs/plugin/customParseFormat";
import locale from "antd/es/date-picker/locale/vi_VN";
import iconClose from '../../assets-src/close_1.png'
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import lottieScanQR from "../../assets-src/lottie_scan_qr.json";

dayjs.locale("vi");
dayjs.extend(customParseFormat);

const RegisterBHXH = (props) => {
  const navigate = useNavigate();
  const [personName, setPersonName] = useState<string>("");
  const [citizenId, setCitizenId] = useState<string>("");
  const [socialInsuranceId, setSocialInsuranceId] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [buyerName, setBuyerName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const selectedInsuranceProvinceId = useRef<number>(0);
  const [temp, setTemp] = useState(false);
  const buyerProvinces = useRef([]);
  const buyerDistricts = useRef([]);
  const buyerWards = useRef([]);
  const [selectedBuyerProvince, setSelectedBuyerProvince] = useState<number>(0);
  const [selectedBuyerDistrict, setSelectedBuyerDistrict] = useState<number>(0);
  const [selectedBuyerWard, setSelectedBuyerWard] = useState<number>(0);
  const [buyerAddressDetail, setBuyerAddressDetail] = useState<string>("");
  const ksProvinces = useRef([]);
  const ksDistricts = useRef([]);
  const ksWards = useRef([]);
  const [selectedKSProvince, setSelectedKSProvince] = useState<number>(0);
  const [selectedKSDistrict, setSelectedKSDistrict] = useState<number>(0);
  const [selectedKSWard, setSelectedKSWard] = useState<number>(0);
  const [ksAddressDetail, setKSAddressDetail] = useState<string>("");
  const ttProvinces = useRef([]);
  const ttDistricts = useRef([]);
  const ttWards = useRef([]);
  const [selectedTTProvince, setSelectedTTProvince] = useState<number>(0);
  const [selectedTTDistrict, setSelectedTTDistrict] = useState<number>(0);
  const [selectedTTWard, setSelectedTTWard] = useState<number>(0);
  const [ttAddressDetail, setTTAddressDetail] = useState<string>("");
  const [isUploadingPhotoCitizenFont, setIsUploadingPhotoCitizenFont] =
    useState(false);
  const [isUploadingPhotoCitizenBack, setIsUploadingPhotoCitizenBack] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [supportBudget, setSupportBudget] = useState<number>(0);
  const wage = useRef<number>(0);
  const monthCount = useRef<number>(0);
  const [frontImageUrl, setFrontImageUrl] = useState<string>("");
  const [backImageUrl, setBackImageUrl] = useState<string>("");
  const [dateValue, setDateValue] = useState<any>("");
  const { handleSubmit } = useForm();
  const finalPrice = useRef<number>(0);
  const specificContext = useContext<any>(SpecificContext);
  const [displayValue, setDisplayValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [ethnic, setEthnic] = useState(0);
  const [ethnicLists, setEthnicLists] = useState([]);
  const [isShowModelQR, setIsShowModelQR] = useState<boolean>(false);
  const dateFormat = "DD/MM/YYYY";
  const {
    insuranceOrder,
    setInsuranceOrder,
  } = specificContext;
  const frontImageInputRef = useRef<HTMLInputElement>(null);
  const backImageInputRef = useRef<HTMLInputElement>(null);

  // Hộ gia đình
  const createNewMember = () => (
    {
      id: React.createRef(),
      name: React.createRef(),
      doB: React.createRef(),
      gender: React.createRef(),
      ethnicId: React.createRef(),
      relationShipId: React.createRef(),
      citizenId: React.createRef(),
    }
  )

  const [members, setMembers] = useState<any>(Array.from({ length: insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples.length }, () => createNewMember()));

  const [vungLuongToiThieuList, setVungLuongToiThieuList] = useState([]);
  const [vungLuongToiThieuId, setVungLuongToiThieuId] = useState(0);
  const [benefitLevel, setBenefitLevel] = useState("");
  const infoInsuranceProvinces = useRef([]);
  const infoInsuranceDistricts = useRef([]);
  const infoInsuranceHospital = useRef([]);

  const [selectedMedicalByProvinceParticipant, setSelectedMedicalByProvinceParticipant] = useState(0);
  const [selectedMeicalByDistrictParticipant, setSelectedMeicalByDistrictParticipant] = useState(0);
  const [selectedMedicalByHospitalParticipant, setSelectedMedicalByHospitalParticipant] = useState(0);

  const [fullNamHouseHoldParticipant, setFullNamHouseHoldParticipant] = useState<string>("");

  const householdProvinces = useRef([]);
  const householdDistricts = useRef([]);
  const householdWards = useRef([]);

  const [selectedHouseholdProvince, setSelectedHouseholdProvince] = useState(0);
  const [selectedHouseholdDistrict, setSelectedHouseholdDistrict] = useState(0);
  const [selectedHouseholdWard, setSelectedHouseholdWard] = useState(0);

  const [addressDetailHouseHoldParticipant, setAddressDetailHouseHoldParticipant] = useState<string>("");
  const [addressDetailHKHouseHoldParticipant, setAddressDetailHKHouseHoldParticipant] = useState<string>("");

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [size, setSize] = useState({ width: 200, height: 200 });
  const [opacityQR, setOpacityQR] = useState(1);
  const lottieRef = useRef(null);


  // Ref để scroll
  const participantRefs = {
    uploadCCCD: useRef<any>(null),
    fullNameParticipants: useRef<any>(null),
    provinceParticipate: useRef<any>(null),
    cccdParticipant: useRef<any>(null),
    bhxhParticipant: useRef<any>(null),
    dobParticipant: useRef<any>(null),
    genderParticipant: useRef<any>(null),
    ethnicParticipant: useRef<any>(null),
    salaryParticipant: useRef<any>(null),
    monthcountParticipant: useRef<any>(null),
    ksProvinceParticipant: useRef<any>(null),
    ksDistrictParticipant: useRef<any>(null),
    ksWardParticipant: useRef<any>(null),
    ksAddrestailParticipant: useRef<any>(null),
    ttProvinceParticipant: useRef<any>(null),
    ttDistrictParticipant: useRef<any>(null),
    ttWardParticipant: useRef<any>(null),
    ttAddressDetailParticipant: useRef<any>(null),
    areaSalaryParticipant: useRef<any>(null),
    medicalByProvinceParticipant: useRef<any>(null),
    benefitLevelParticipant: useRef<any>(null),
    hospitalExaminationParticipant: useRef<any>(null),
    fullNamHouseHoldParticipant: useRef<any>(null),
    provinceHouseHoldParticipant: useRef<any>(null),
    districtHouseHoldParticipant: useRef<any>(null),
    wardHouseHoldParticipant: useRef<any>(null),
    addressDetailHouseHoldParticipant: useRef<any>(null),
    addressDetailHKHouseHoldParticipant: useRef<any>(null),
  };

  const buyerRefs = {
    phone: useRef<any>(null),
    buyerName: useRef<any>(null),
    email: useRef<any>(null),
    selectedBuyerProvince: useRef<any>(null),
    selectedBuyerDistrict: useRef<any>(null),
    selectedBuyerWard: useRef<any>(null),
    buyerAddressDetail: useRef<any>(null),
  }

  // Load lại tất cả danh sách tỉnh thành
  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/province/api/list")
      .then((response) => {
        // Load tỉnh thành người mua
        buyerProvinces.current = response.data.data;

        // Load tỉnh thành thường trú người tham gia
        ttProvinces.current = response.data.data

        // Load tỉnh thành khai sinh người tham gia
        ksProvinces.current = response.data.data

        infoInsuranceProvinces.current = response.data.data

        householdProvinces.current = response.data.data

        setTemp(!temp)
      })
      .catch((error) => {
        buyerProvinces.current = []
        ttProvinces.current = []
        ksProvinces.current = []
        console.error(error);
      });
  }, []);

  // Cập nhập danh sách quận huyện người mua
  useEffect(() => {
    fetchBuyerDistricts();
  }, [selectedBuyerProvince]);

  const fetchBuyerDistricts = () => {
    if (selectedBuyerProvince !== 0) {
      axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${selectedBuyerProvince}`)
        .then((response) => {
          buyerDistricts.current = response.data.data;

          buyerWards.current = [];

          setTemp(!temp)
        })
        .catch((error) => {
          buyerDistricts.current = [];
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách phường xã người mua
  useEffect(() => {
    fetchBuyerWards();
  }, [selectedBuyerDistrict]);

  const fetchBuyerWards = () => {
    if (selectedBuyerDistrict !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${selectedBuyerDistrict}`
        )
        .then((response) => {
          buyerWards.current = response.data.data;
          setTemp(!temp)
        })
        .catch((error) => {
          buyerWards.current = []
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách quận huyện địa chỉ khai sinh
  useEffect(() => {
    fetchKSDistricts();
  }, [selectedKSProvince]);

  const fetchKSDistricts = () => {
    if (selectedKSProvince !== 0) {
      axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${selectedKSProvince}`)
        .then((response) => {
          ksDistricts.current = response.data.data;

          ksWards.current = [];

          setTemp(!temp)
        })
        .catch((error) => {
          ksDistricts.current = [];
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách phường xã khai sinh
  useEffect(() => {
    fetchKSWards();
  }, [selectedKSDistrict]);

  const fetchKSWards = () => {
    if (selectedKSDistrict !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${selectedKSDistrict}`
        )
        .then((response) => {
          ksWards.current = response.data.data;
          setTemp(!temp);
        })
        .catch((error) => {
          ksWards.current = []
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách quận huyện địa chỉ thường trú
  useEffect(() => {
    fetchTTDistricts();
  }, [selectedTTProvince]);

  const fetchTTDistricts = () => {
    if (selectedTTProvince !== 0) {
      axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${selectedTTProvince}`)
        .then((response) => {
          ttDistricts.current = response.data.data;
          ttWards.current = [];
          setTemp(!temp);
        })
        .catch((error) => {
          ttDistricts.current = [];
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách phường xã địa chỉ thường trú
  useEffect(() => {
    fetchTTWards();
  }, [selectedTTDistrict]);

  const fetchTTWards = () => {
    if (selectedTTDistrict !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${selectedTTDistrict}`
        )
        .then((response) => {
          ttWards.current = response.data.data;
          setTemp(!temp)
        })
        .catch((error) => {
          ttWards.current = []
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách bệnh viện khám chữa bênh
  useEffect(() => {
    fetchMedicalByProvinceParticipants();
  }, [selectedMedicalByProvinceParticipant]);

  const fetchMedicalByProvinceParticipants = () => {
    if (selectedMedicalByProvinceParticipant !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/hospital/api/list-hospital-by-provinceId?provinceId=${selectedMedicalByProvinceParticipant}`
        ).then((response) => {
          infoInsuranceHospital.current = response.data.data;
          setTemp(!temp);
        })
        .catch((error) => {
          infoInsuranceHospital.current = []
          console.error(error);
        });
    }
  }


  // Cập nhập danh sách bệnh viện khám chữa bênh
  // useEffect(() => {
  //   fetchMedicalByHospitalParticipants();

  // }, [selectedMeicalByDistrictParticipant])

  // const fetchMedicalByHospitalParticipants = () => {
  //   if (selectedMeicalByDistrictParticipant != 0) {
  //     axios
  //       .get(
  //         `https://baohiem.dion.vn/hospital/api/list-hospital-by-provinceId?provinceId=${selectedMeicalByDistrictParticipant}`
  //       ).then((response) => {
  //         infoInsuranceHospital.current = response.data.data;
  //         console.log(infoInsuranceHospital.current);

  //       })
  //       .catch((error) => {
  //         infoInsuranceHospital.current = []
  //         console.error(error);
  //       });
  //   }
  // }



  // Cập nhập danh sách quận huyện hộ gia đình
  useEffect(() => {
    fetchHouseholdProvinces();
  }, [selectedHouseholdProvince]);

  const fetchHouseholdProvinces = () => {
    if (selectedHouseholdProvince !== 0) {
      axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${selectedHouseholdProvince}`)
        .then((response) => {
          householdDistricts.current = response.data.data;
          householdWards.current = [];
          setTemp(!temp);
        })
        .catch((error) => {
          householdDistricts.current = [];
          setTemp(!temp);
          console.error(error);
        });
    }
  }

  // Cập nhập danh sách phường xã hộ gia đình
  useEffect(() => {
    fetchHouseholdWards();
  }, [selectedHouseholdDistrict]);

  const fetchHouseholdWards = () => {
    if (selectedHouseholdDistrict !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${selectedHouseholdDistrict}`
        )
        .then((response) => {
          householdWards.current = response.data.data;
          setTemp(!temp)
        })
        .catch((error) => {
          householdWards.current = []
          setTemp(!temp);
          console.error(error);
        });
    }
  }


  useEffect(() => {
    axios
      .get(
        `https://baohiem.dion.vn/VungLuongToiThieu/api/List`
      )
      .then((response) => {
        setVungLuongToiThieuList(response.data.data)

      })
      .catch((error) => {
        setVungLuongToiThieuList([])
        console.error(error);
      });
  }, [])


  // Update BHXH
  useEffect(() => {
    if (insuranceOrder.id != 0) {
      const id1 = insuranceOrder.provinceId;
      const id2 = insuranceOrder.districtId;
      const id3 = insuranceOrder.listInsuredPerson[0].ksTinhThanhMa;
      const id4 = insuranceOrder.listInsuredPerson[0].ksQuanHuyenMa;
      const id5 = insuranceOrder.listInsuredPerson[0].provinceId;
      const id6 = insuranceOrder.listInsuredPerson[0].districtId;
      const id7 = insuranceOrder.listInsuredPerson[0].medicalProvinceId;
      const id8 = insuranceOrder.listInsuredPerson[0].houseHold.ksProvinceId;
      const id9 = insuranceOrder.listInsuredPerson[0].houseHold.ksDistrictId;

      // Set thông tin người tham giá BHXH tự nguyện
      const fetchData = async () => {
        const [response1, response2, response3, response4, response5, response6, response7, response8, response9] = await Promise.all([
          axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${id1}`),
          axios.get(`https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${id2}`),

          axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${id3}`),
          axios.get(`https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${id4}`),

          axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${id5}`),
          axios.get(`https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${id6}`),

          axios.get(`https://baohiem.dion.vn/hospital/api/list-hospital-by-provinceId?provinceId=${id7}`),

          axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${id8}`),
          axios.get(`https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${id9}`),
        ]);

        buyerDistricts.current = response1.data.data;
        buyerWards.current = response2.data.data;

        ksDistricts.current = response3.data.data;
        ksWards.current = response4.data.data;

        ttDistricts.current = response5.data.data;
        ttWards.current = response6.data.data;

        infoInsuranceHospital.current = response7.data.data;

        householdDistricts.current = response8.data.data;
        householdWards.current = response9.data.data;

        // Người tham gia
        setPersonName(insuranceOrder.listInsuredPerson[0].fullName);
        selectedInsuranceProvinceId.current = insuranceOrder.listInsuredPerson[0].insuranceProvinceId;
        setCitizenId(insuranceOrder.listInsuredPerson[0].citizenId);
        setSocialInsuranceId(insuranceOrder.listInsuredPerson[0].socialInsuranceNumber)
        setDateValue(dayjs(insuranceOrder.listInsuredPerson[0].doB, dateFormat));
        setGender(insuranceOrder.listInsuredPerson[0].gender);
        setEthnic(insuranceOrder.listInsuredPerson[0].ethnicId)
        wage.current = insuranceOrder.listInsuredPerson[0].wage;
        monthCount.current = insuranceOrder.listInsuredPerson[0].monthInsured;
        setSupportBudget(insuranceOrder.listInsuredPerson[0].supportBudget);
        setSelectedKSProvince(insuranceOrder.listInsuredPerson[0].ksTinhThanhMa)
        setSelectedKSDistrict(insuranceOrder.listInsuredPerson[0].ksQuanHuyenMa)
        setSelectedKSWard(insuranceOrder.listInsuredPerson[0].ksXaPhuongMa)
        setKSAddressDetail(insuranceOrder.listInsuredPerson[0].ksDiaChi)
        setSelectedTTProvince(insuranceOrder.listInsuredPerson[0].provinceId)
        setSelectedTTDistrict(insuranceOrder.listInsuredPerson[0].districtId)
        setSelectedTTWard(insuranceOrder.listInsuredPerson[0].wardId)
        setTTAddressDetail(insuranceOrder.listInsuredPerson[0].addressDetail)

        // Thông tin bảo hiểm
        setVungLuongToiThieuId(insuranceOrder.listInsuredPerson[0].vungLuongToiThieuId)
        setBenefitLevel(insuranceOrder.listInsuredPerson[0].benefitLevel)
        setSelectedMedicalByProvinceParticipant(insuranceOrder.listInsuredPerson[0].medicalProvinceId)
        setSelectedMedicalByHospitalParticipant(insuranceOrder.listInsuredPerson[0].hospitalId)

        //Thông tin chủ hộ 
        setFullNamHouseHoldParticipant(insuranceOrder.listInsuredPerson[0].houseHold.chuHoTen)
        setSelectedHouseholdProvince(insuranceOrder.listInsuredPerson[0].houseHold.ksProvinceId)
        setSelectedHouseholdDistrict(insuranceOrder.listInsuredPerson[0].houseHold.ksDistrictId)
        setSelectedHouseholdWard(insuranceOrder.listInsuredPerson[0].houseHold.ksWardId)
        setAddressDetailHouseHoldParticipant(insuranceOrder.listInsuredPerson[0].houseHold.ksAddressDetail)
        setAddressDetailHKHouseHoldParticipant(insuranceOrder.listInsuredPerson[0].houseHold.hkAddressDetail)

        // Người mua
        setPhone(insuranceOrder.phone);
        setBuyerName(insuranceOrder.fullName);
        setEmail(insuranceOrder.email);
        setSelectedBuyerProvince(insuranceOrder.provinceId);
        setSelectedBuyerDistrict(insuranceOrder.districtId);
        setSelectedBuyerWard(insuranceOrder.wardId);
        setBuyerAddressDetail(insuranceOrder.addressDetail)

        setDisplayValue(
          insuranceOrder.listInsuredPerson[0].wage.toLocaleString("vi-VN")
        );
        finalPrice.current = insuranceOrder.finalPrice;
      }

      fetchData();
    }
  }, []);

  useEffect(() => {
    setFrontImageUrl(insuranceOrder.photoCitizenFront);
    setBackImageUrl(insuranceOrder.photoCitizenBack);
  }, [insuranceOrder.photoCitizenFront, insuranceOrder.photoCitizenBack]);

  const calculateFinalPrice = () => {
    const budgetPerMonth = selectedInsuranceProvinceId.current === 1398 ? 66000 : 33000;
    if (wage.current != 0 && monthCount.current != 0) {
      finalPrice.current =
        (wage.current * 0.22 - budgetPerMonth) * monthCount.current;
      setInsuranceOrder((prevOrder) => ({
        ...prevOrder,
        finalPrice: finalPrice.current,
      }));
      setTemp(!temp);
    } else {
      finalPrice.current = 0;
      setInsuranceOrder((prevOrder) => ({
        ...prevOrder,
        finalPrice: finalPrice.current,
      }));
      setTemp(!temp);
    }
  };

  useEffect(() => {
    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      insuranceId: 1001,
    }));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://baohiem.dion.vn/ethnic/api/list`
      ).then((response) => {
        setEthnicLists(response.data.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])

  function formatDateString(dateString: string): string {
    // Chuyển chuỗi ngày tháng thành đối tượng Date
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    let day: number | string = date.getDate();
    let month: number | string = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần +1
    const year: number = date.getFullYear();

    // Đảm bảo ngày và tháng có 2 chữ số
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return `${day}/${month}/${year}`;
  }
  const handleDobChange = (value) => {
    const dateObject = dayjs(value.toString());
    const dateStr = `${dateObject.date().toString().padStart(2, "0")}/${(
      dateObject.month() + 1
    )
      .toString()
      .padStart(2, "0")}/${dateObject.year()}`;
    setDateValue(dayjs(dateStr, dateFormat));
    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      listInsuredPerson: prevOrder.listInsuredPerson.map((person, index) =>
        index === 0 ? { ...person, doB: dateStr } : person
      ),
    }));
  };

  const handleProvinceChange = (value) => {
    const provinceId = value;
    selectedInsuranceProvinceId.current = provinceId;
    calculateSupportBudget(provinceId, monthCount.current);
    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      listInsuredPerson: prevOrder.listInsuredPerson.map((person, index) =>
        index === 0 ? { ...person, insuranceProvinceId: provinceId } : person
      ),
    }));
    calculateFinalPrice();
  };

  const calculateSupportBudget = (provinceId: number, months: number) => {
    const budgetPerMonth = provinceId === 1398 ? 66000 : 33000;
    setSupportBudget(budgetPerMonth * months);
    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      listInsuredPerson: prevOrder.listInsuredPerson.map((person, index) =>
        index === 0
          ? { ...person, supportBudget: budgetPerMonth * months }
          : person
      ),
    }));
  };

  const updateFrontCitizenPhoto = (img) => {
    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      listInsuredPerson: prevOrder.listInsuredPerson.map((person, index) =>
        index === 0 ? { ...person, photoCitizenFront: img } : person
      ),
    }));
    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      photoCitizenFront: img,
    }));
    setIsUploadingPhotoCitizenFont(false);
  };

  const updateBackCitizenPhoto = (img) => {
    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      listInsuredPerson: prevOrder.listInsuredPerson.map((person, index) =>
        index === 0 ? { ...person, photoCitizenBack: img } : person
      ),
    }));
    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      photoCitizenBack: img,
    }));

    setIsUploadingPhotoCitizenBack(false);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const token = localStorage.token;
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://baohiem.dion.vn/account/api/upload-file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImageUrl(response.data.data[0]);
        return response.data.data[0];
      } catch (error) {
        console.error("Error uploading image:", error);
        setIsUploadingPhotoCitizenBack(false);
        setIsUploadingPhotoCitizenFont(false);
      }
    } else {
      setIsUploadingPhotoCitizenBack(false);
      setIsUploadingPhotoCitizenFont(false);
    }
  };

  const handleCardClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const scrollToElement = (input) => {
    input.current.focus();
  };

  // Validate BHXH
  const validate = () => {
    if (
      !isValidEmptyString(frontImageUrl) ||
      !isValidEmptyString(backImageUrl)
    ) {
      toast.warn("Ảnh giấy tờ tùy thân không được để trống");
      participantRefs.uploadCCCD.current.scrollIntoView({ behavior: 'smooth' })
      return false;
    }
    if (!isValidEmptyString(personName)) {
      toast.warn("Họ và tên người tham gia không được để trống");
      scrollToElement(participantRefs.fullNameParticipants)
      return false;
    }
    if (selectedInsuranceProvinceId.current == 0) {
      toast.warn("Vui lòng chọn tỉnh thành nơi tham gia BHXH");
      scrollToElement(participantRefs.provinceParticipate)
      return false;
    }

    if (!isValidEmptyString(citizenId)) {
      toast.warn("Số CCCD không được để trống");
      scrollToElement(participantRefs.cccdParticipant)
      return false;
    } else if (citizenId.length != 12) {
      toast.warn("Số căn cước công dân phải là 12 chữ số");
      scrollToElement(participantRefs.cccdParticipant)
      return false;
    }

    if (
      !(
        socialInsuranceId.length == 0 ||
        socialInsuranceId.length == 10 ||
        socialInsuranceId.length == 15
      )
    ) {
      toast.warn("Số BHXH bao gồm 10 hoặc 15 ký tự, vui lòng nhập lại");
      scrollToElement(participantRefs.bhxhParticipant)
      return false;
    }

    if (!isValidEmptyString(dateValue)) {
      toast.warn("Ngày sinh không được để trống");
      scrollToElement(participantRefs.dobParticipant)
      return false;
    }

    if (!isValidEmptyString(gender)) {
      toast.warn("Giới tính không được để trống");
      scrollToElement(participantRefs.genderParticipant)
      return false;
    }

    if (ethnic == 0) {
      toast.warn("Dân tộc không được để trống");
      scrollToElement(participantRefs.ethnicParticipant)
      return false;
    }

    if (Number(wage.current) == 0 || Number(wage.current) < 1000000) {
      toast.warn("Mức lương không hợp lệ");
      scrollToElement(participantRefs.salaryParticipant)
      return false;
    }
    if (Number(monthCount.current) == 0 || Number(monthCount.current) < 0) {
      toast.warn("Số tháng tham gia không hợp lệ");
      scrollToElement(participantRefs.monthcountParticipant)
      return false;
    }

    if (selectedKSProvince == 0) {
      toast.warn("Địa chỉ tỉnh thành khai sinh không được để trống");
      scrollToElement(participantRefs.ksProvinceParticipant)
      return false;
    }

    if (selectedKSDistrict == 0) {
      toast.warn("Địa chỉ quận huyện khai sinh không được để trống");
      scrollToElement(participantRefs.ksDistrictParticipant)
      return false;
    }

    if (selectedKSWard == 0) {
      toast.warn("Địa chỉ phường xã khai sinh không được để trống");
      scrollToElement(participantRefs.ksWardParticipant)
      return false;
    }

    if (ksAddressDetail == "") {
      toast.warn("Địa chỉ cụ thể khai sinh không được để trống");
      scrollToElement(participantRefs.ksAddrestailParticipant)
      return false;
    }

    if (selectedTTProvince == 0) {
      toast.warn("Địa chỉ tỉnh thành thường trú không được để trống");
      scrollToElement(participantRefs.ttProvinceParticipant)
      return false;
    }

    if (selectedTTDistrict == 0) {
      toast.warn("Địa chỉ quận huyện thường trú không được để trống");
      scrollToElement(participantRefs.ttDistrictParticipant)
      return false;
    }

    if (selectedTTWard == 0) {
      toast.warn("Địa chỉ phường xã thường trú không được để trống");
      scrollToElement(participantRefs.ttWardParticipant)
      return false;
    }

    if (ttAddressDetail == "") {
      toast.warn("Địa chỉ cụ thể thường trú không được để trống");
      scrollToElement(participantRefs.ttAddressDetailParticipant)
      return false;
    }

    if (vungLuongToiThieuId == 0) {
      toast.warn("Vùng lương tối thiểu không được để trống");
      scrollToElement(participantRefs.areaSalaryParticipant)
      return false;
    }

    if (benefitLevel == "") {
      toast.warn("Mức hưởng không được để trống");
      scrollToElement(participantRefs.benefitLevelParticipant)
      return false;
    }

    if (selectedMedicalByProvinceParticipant == 0) {
      toast.warn("Tỉnh thành khám chữa bệnh không được để trống");
      scrollToElement(participantRefs.medicalByProvinceParticipant)
      return false;
    }

    if (selectedMedicalByHospitalParticipant == 0) {
      toast.warn("Bệnh viện khám chữa bệnh không được để trống");
      scrollToElement(participantRefs.hospitalExaminationParticipant)
      return false;
    }

    if (fullNamHouseHoldParticipant == "") {
      toast.warn("Họ tên chủ hộ không được để trống");
      scrollToElement(participantRefs.fullNamHouseHoldParticipant)
      return false;
    }

    if (selectedHouseholdProvince == 0) {
      toast.warn("Thành phố của chủ hộ không được để trống");
      scrollToElement(participantRefs.provinceHouseHoldParticipant)
      return false;
    }

    if (selectedHouseholdDistrict == 0) {
      toast.warn("Quận huyện của chủ hộ không được để trống");
      scrollToElement(participantRefs.districtHouseHoldParticipant)
      return false;
    }

    if (selectedHouseholdWard == 0) {
      toast.warn("Phường xã của chủ hộ không được để trống");
      scrollToElement(participantRefs.wardHouseHoldParticipant)
      return false;
    }

    if (addressDetailHouseHoldParticipant == "") {
      toast.warn("Địa chỉ cụ thể thường trú của chủ hộ không được để trống");
      scrollToElement(participantRefs.addressDetailHouseHoldParticipant)
      return false;
    }

    if (addressDetailHKHouseHoldParticipant == "") {
      toast.warn("Địa chỉ cụ thể hộ khẩu của chủ hộ không được để trống");
      scrollToElement(participantRefs.addressDetailHKHouseHoldParticipant)
      return false;
    }

    for (let index = 0; index < insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples.length; index++) {
      const intem = insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index];
      if (intem.citizenId == "") {
        toast.warn("Số CCCD của thành viên không được để trống");
        scrollToElement(members[index].citizenId)
        return false;
      }

      if (!isValidCitizenId(intem.citizenId)) {
        toast.warn("Số căn cước công dân phải là 12 chữ số");
        scrollToElement(members[index].citizenId)
        return false;
      }

      if (intem.ethnicId == 0) {
        toast.warn("Vui lòng chọn dân tộc");
        scrollToElement(members[index].ethnicId)
        return false;
      }

      if (intem.gender == "") {
        toast.warn("Vui lòng chọn giới tính");
        scrollToElement(members[index].gender)
        return false;
      }

      if (intem.name == "") {
        toast.warn("Họ và tên thành viên không được để trống");
        scrollToElement(members[index].name)
        return false;
      }

      if (intem.relationShipId == "") {
        toast.warn("Mối quan hệ với thành viên không được để trống");
        scrollToElement(members[index].relationShipId)
        return false;
      }

      if (intem.doB == "") {
        toast.warn("Ngày sinh của thành viên không được để trống");
        scrollToElement(members[index].doB)
        return false;
      }
    }

    if (!isValidPhone(phone)) {
      toast.warn("Số điện thoại không hợp lệ");
      scrollToElement(buyerRefs.phone)
      return false;
    }

    if (!isValidEmptyString(buyerName)) {
      toast.warn("Họ và tên người mua không được để trống");
      scrollToElement(buyerRefs.buyerName)
      return false;
    }

    if (isValidEmptyString(email)) {
      if (!isValidEmail(email)) {
        toast.warn("Email không hợp lệ");
        scrollToElement(buyerRefs.email)
        return false;
      }
    }

    if (selectedBuyerProvince == 0) {
      toast.warn("Vui lòng chọn tỉnh thành");
      scrollToElement(buyerRefs.selectedBuyerProvince)
      return false;
    }
    if (selectedBuyerDistrict == 0) {
      toast.warn("Vui lòng chọn quận huyện");
      scrollToElement(buyerRefs.selectedBuyerDistrict)
      return false;
    }
    if (selectedBuyerWard == 0) {
      toast.warn("Vui lòng chọn phường xã");
      scrollToElement(buyerRefs.selectedBuyerWard)
      return false;
    }

    if (!isValidEmptyString(buyerAddressDetail)) {
      toast.warn("Địa chỉ cụ thể không được để trống");
      scrollToElement(buyerRefs.buyerAddressDetail)
      return false;
    }
    if (!isChecked) {
      toast.warn("Vui lòng xác nhận đã đọc chính sách và điều khoản");
      return false;
    }

    return true;
  };

  // const ()
  const onSubmit = (data: any) => {
    if (validate()) {
      setLoading(true);
      if (insuranceOrder.id == 0) {
        AddInsuranceOrder();
      } else {
        UpdateInsuranceOrder();
      }
    }
  };

  const AddInsuranceOrder = async () => {
    const token = localStorage.token;
    try {
      const response = await axios.post(
        "https://baohiem.dion.vn/insuranceorder/api/add-order",
        insuranceOrder,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.data.status == "201") {
        let result = response.data.data[0];
        delete result.price;
        delete result.discountPrice;
        delete result.fileUploadUrl;
        result.citizenId = 0;

        delete result.listInsuredPerson[0].ethnic;
        delete result.listInsuredPerson[0].oldCardStartDate
        delete result.listInsuredPerson[0].oldCardEndDate
        delete result.listInsuredPerson[0].newCardStartDate
        delete result.listInsuredPerson[0].newCardEndDate
        delete result.listInsuredPerson[0].price
        delete result.listInsuredPerson[0].insuredPersonId

        result.listInsuredPerson[0].houseHold.houseHoldPeoples.map(item => {
          delete item.createdTime;
          return item;
        });

        setInsuranceOrder(result);
        setLoading(false);
        toast.success("Đăng ký bảo hiểm xã hội thành công");
        navigate("/buill-pay/1");
      } else {
        setLoading(false);
        toast.warn("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      setLoading(false);
      toast.warn("Có lỗi xảy ra, vui lòng thử lại!");
      console.error("Error uploading image:", error);
    }
  };

  const UpdateInsuranceOrder = async () => {
    const token = localStorage.token;
    try {
      const response = await axios.post(
        "https://baohiem.dion.vn/insuranceorder/api/update-order",
        insuranceOrder,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.data.status == "200") {
        setLoading(false);
        toast.success("Cập nhật đơn đăng ký bảo hiểm xã hội thành công");
        navigate("/buill-pay/1");
      } else {
        setLoading(false);
        toast.warn("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      setLoading(false);
      toast.warn("Có lỗi xảy ra, vui lòng thử lại!");
      console.error("Error uploading image:", error);
    }
  };

  const boxHeaderParticipants = () => {
    return (
      <div className="flex justify-between">
        <h3 className="text-[#0076B7] text-lg font-medium">
          Thông tin người tham gia BHXH tự nguyện{" "}
        </h3>
        <div
          onClick={() => {
            setIsShowModelQR(true);
          }}
        >
          <img className="w-12" src={imageQR} />
        </div>
      </div>
    )
  }

  const inputFullNameParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="name"
          ref={participantRefs.fullNameParticipants}
          value={personName}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập tên của bạn"
          onChange={(e) => {
            setPersonName(e.target.value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? { ...person, fullName: e.target.value }
                    : person
              ),
            }));
          }}
        />
      </div>
    )
  }

  const inputProvinceParticipate = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành nơi tham gia BHXH{" "}
          <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={participantRefs.provinceParticipate}
          placeholder="Chọn thành phố"
          value={selectedInsuranceProvinceId.current}
          dropdownMatchSelectWidth={false}
          onChange={handleProvinceChange}
          key={selectedInsuranceProvinceId.current}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(buyerProvinces.current, "Chọn tỉnh thành phố")}
        />
      </div>
    )
  }

  const inputCCCDParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số CCCD <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="cccd"
          value={citizenId}
          maxLength={12}
          ref={participantRefs.cccdParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập số CCCD"
          onChange={(e) => {
            // Lọc ra chỉ các ký tự số
            const filteredValue = e.target.value.replace(/\D/g, "");

            // Cập nhật giá trị của input và trạng thái citizenId
            setCitizenId(filteredValue);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? { ...person, citizenId: filteredValue }
                    : person
              ),
            }));
          }}
        />
      </div>
    )
  }

  const inputBHXHParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số BHXH
        </label>
        <Input
          type="text"
          id="bhxh"
          maxLength={15}
          ref={participantRefs.bhxhParticipant}
          value={socialInsuranceId}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập số Bảo hiểm Xã hội"
          onChange={(e) => {
            setSocialInsuranceId(e.target.value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? { ...person, socialInsuranceNumber: e.target.value }
                    : person
              ),
            }));
          }}
        />
      </div>
    )
  }

  const inputDobParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Ngày sinh <samp className="text-red-600">*</samp>
        </label>
        <DatePicker
          type="date"
          size="large"
          locale={locale}
          ref={participantRefs.dobParticipant}
          className="w-[100%]"
          value={dateValue}
          placeholder="dd/mm/yyyy"
          onChange={handleDobChange}
          format={dateFormat}
          maxDate={dayjs(formatDate2(new Date()), dateFormat)}
        />
      </div>
    )

  }

  const inputGenderParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Giới tính <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          placeholder="Chọn giới tính"
          ref={participantRefs.genderParticipant}
          dropdownMatchSelectWidth={false}
          value={gender}
          onChange={(value) => {
            setGender(value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0 ? { ...person, gender: value } : person
              ),
            }));
          }}
          key={gender}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn giới tính" },
            { value: "Nam", label: "Nam" },
            { value: "Nữ", label: "Nữ" },
          ]}
        />
      </div>
    )
  }

  const inputEthnicParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Dân tộc <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: '300px' }}
          ref={participantRefs.ethnicParticipant}
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Chọn dân tộc"
          value={ethnic}
          onChange={(value) => {
            setEthnic(value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0 ? { ...person, ethnicId: value } : person
              ),
            }));
          }}
          key={ethnic}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={
            convertListToSelect(ethnicLists, "Chọn dân tộc")
          }
        />
      </div>
    )
  }

  const inputSalaryParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Mức lương làm căn cứ đóng <samp className="text-red-600">*</samp>
        </label>
        <div className="relative">
          <Input
            type="text"
            id="salary"
            value={displayValue}
            ref={participantRefs.salaryParticipant}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập mức lương"
            onChange={(e) => {
              // Lấy giá trị từ input và loại bỏ dấu phân cách hàng nghìn (dấu chấm)
              let rawValue = e.target.value.replace(/\D/g, "");
              // Chuyển đổi giá trị thành số, nếu rỗng thì đặt thành 0
              let numericValue = rawValue !== "" ? Number(rawValue) : 0;
              // Cập nhật giá trị wage
              wage.current = numericValue;
              // Cập nhật giá trị trong insuranceOrder
              setInsuranceOrder((prevOrder) => ({
                ...prevOrder,
                listInsuredPerson: prevOrder.listInsuredPerson.map(
                  (person, index) =>
                    index === 0
                      ? {
                        ...person,
                        wage: wage.current,

                      }
                      : person
                ),
              }));

              // Hiển thị giá trị định dạng với phân cách hàng nghìn
              setDisplayValue(numericValue.toLocaleString("vi-VN"));

              // Tính toán giá cuối cùng
              calculateFinalPrice();
            }}
          />
          <div className="absolute inset-y-0 start-[72%] top-0 flex items-center pointer-events-none">
            <p className="text-base font-normal text-[#767A7F]">
              vnđ/tháng
            </p>
          </div>
        </div>
      </div>
    )
  }

  const inputMonthcountParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số tháng đóng <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          placeholder="Chọn giới tính"
          dropdownMatchSelectWidth={false}
          ref={participantRefs.monthcountParticipant}
          value={monthCount.current}
          onChange={(value) => {

            if (value != 0) {
              monthCount.current = Number(value);
              calculateSupportBudget(
                selectedInsuranceProvinceId.current,
                value
              );
              setInsuranceOrder((prevOrder) => ({
                ...prevOrder,
                listInsuredPerson: prevOrder.listInsuredPerson.map(
                  (person, index) =>
                    index === 0
                      ? {
                        ...person,
                        monthInsured: value,
                      }
                      : person
                ),
              }));
            } else {
              monthCount.current = 0;
              calculateSupportBudget(
                selectedInsuranceProvinceId.current,
                parseInt("1", 10)
              );
            }

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      monthInsured: value,
                    }
                    : person
              ),
            }));
            calculateFinalPrice();
          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            { value: 0, label: "Chọn tháng đóng" },
            { value: 1, label: "1 Tháng" },
            { value: 3, label: "3 Tháng" },
            { value: 6, label: "6 Tháng" },
            { value: 12, label: "12 Tháng" },
          ]}
        />
      </div>
    )
  }

  const inputBudgetParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Ngân sách hỗ trợ
        </label>
        <div className="relative">
          <Input
            type="text"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={supportBudget.toLocaleString("vi-VN")}
            readOnly
          />
          <div className="absolute inset-y-0 start-[83%] top-0 flex items-center pointer-events-none">
            <p className="text-base font-normal text-[#767A7F]">vnđ</p>
          </div>
        </div>
      </div>
    )
  }

  const inputKSProvinceParticipate = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành <samp className="text-red-600">*</samp>
        </label>

        <Select
          size="large"
          className="w-[100%]"
          showSearch
          placeholder="Chọn tỉnh thành phố"
          ref={participantRefs.ksProvinceParticipant}
          dropdownMatchSelectWidth={false}
          value={selectedKSProvince}
          onChange={(value) => {
            ksDistricts.current = []
            ksWards.current = []

            setSelectedKSDistrict(0)
            setSelectedKSWard(0)

            setSelectedKSProvince(value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      ksTinhThanhMa: value,
                    }
                    : person
              ),
            }));
          }}
          key={selectedKSProvince}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ksProvinces.current, "Chọn tỉnh thành phố")}
        />
      </div>
    )
  }

  const inputKSDistrictParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          ref={participantRefs.ksDistrictParticipant}
          placeholder="Chọn quận huyện"
          value={selectedKSDistrict}
          key={selectedKSDistrict}
          onChange={(value) => {
            ksWards.current = []
            setSelectedKSWard(0)

            setSelectedKSDistrict(value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      ksQuanHuyenMa: value,
                    }
                    : person
              ),
            }));
          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ksDistricts.current, "Chọn quận huyện")}
        />
      </div>
    )
  }

  const inputKSWardParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Phường xã <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          ref={participantRefs.ksWardParticipant}
          placeholder="Chọn phường xã"
          value={selectedKSWard}
          onChange={(value: any) => {

            setSelectedKSWard(value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      ksXaPhuongMa: value,
                    }
                    : person
              ),
            }))
          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ksWards.current, "Chọn phường xã")}
        />
      </div>
    )
  }

  const inputKSAddrestailParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ cụ thể <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          value={ksAddressDetail}
          ref={participantRefs.ksAddrestailParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="VD: Số nhà, số đường,...."
          onChange={(e) => {
            setKSAddressDetail(e.target.value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      ksDiaChi: e.target.value,
                    }
                    : person
              ),
            }));
          }}
        />
      </div>
    )
  }

  const inputTTProvinceParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành <samp className="text-red-600">*</samp>
        </label>

        <Select
          size="large"
          className="w-[100%]"
          showSearch
          placeholder="Chọn tỉnh thành phố"
          dropdownMatchSelectWidth={false}
          ref={participantRefs.ttProvinceParticipant}
          value={selectedTTProvince}
          onChange={(value) => {
            ttDistricts.current = []
            ttWards.current = []

            setSelectedTTDistrict(0)
            setSelectedTTWard(0)
            setSelectedTTProvince(value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      provinceId: value,
                    }
                    : person
              ),
            }));
          }}
          key={selectedTTProvince}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ttProvinces.current, "Chọn tỉnh thành phố")}
        />
      </div>
    )
  }

  const inputTTDistrictParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          ref={participantRefs.ttDistrictParticipant}
          placeholder="Chọn quận huyện"
          value={selectedTTDistrict}
          key={selectedTTDistrict}
          onChange={(value) => {

            ttWards.current = []
            setSelectedTTWard(0)

            setSelectedTTDistrict(value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      districtId: value,
                    }
                    : person
              ),
            }));
          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ttDistricts.current, "Chọn quận huyện")}
        />
      </div>
    )
  }

  const inputTTWardParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Phường xã <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Chọn phường xã"
          value={selectedTTWard}
          key={selectedTTWard}
          ref={participantRefs.ttWardParticipant}
          onChange={(value: any) => {
            setSelectedTTWard(value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      wardId: value,
                    }
                    : person
              ),
            }));

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(ttWards.current, "Chọn phường xã")}
        />
      </div>
    )

  }

  const inputTTAddressDetailParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ cụ thể <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          value={ttAddressDetail}
          ref={participantRefs.ttAddressDetailParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="VD: Số nhà, số đường,...."
          onChange={(e) => {
            setTTAddressDetail(e.target.value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      addressDetail: e.target.value,
                    }
                    : person
              ),
            }));
          }}
        />
      </div>
    )
  }

  const inputAreaSalaryParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Vùng lương tối thiểu <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          ref={participantRefs.areaSalaryParticipant}
          placeholder="Chọn vùng lương"
          value={vungLuongToiThieuId}
          key={vungLuongToiThieuId}
          onChange={(value: any) => {
            setVungLuongToiThieuId(value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      vungLuongToiThieuId: value,
                    }
                    : person
              ),
            }));

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelectVungLuong(vungLuongToiThieuList, "Chọn vùng lương")}
        />
      </div>
    )
  }

  const inputMedicalByProvinceParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành khám chữa bệnh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Tỉnh thành"
          ref={participantRefs.medicalByProvinceParticipant}
          value={selectedMedicalByProvinceParticipant}
          key={selectedMedicalByProvinceParticipant}
          onChange={(value: any) => {
            setSelectedMedicalByHospitalParticipant(0)

            infoInsuranceHospital.current = [];
            if (value != 0) {
              setSelectedMedicalByProvinceParticipant(value);

              setInsuranceOrder((prevOrder) => ({
                ...prevOrder,
                listInsuredPerson: prevOrder.listInsuredPerson.map(
                  (person, index) =>
                    index === 0
                      ? {
                        ...person,
                        medicalProvinceId: value,
                      }
                      : person
                ),
              }));
            } else {
              infoInsuranceHospital.current = [];
              setSelectedMedicalByProvinceParticipant(value);
              setSelectedMedicalByHospitalParticipant(0);
            }

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(infoInsuranceProvinces.current, "Tỉnh thành")}
        />
      </div>

    )
  }

  const inputBenefitLevelParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Mức hưởng <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={participantRefs.benefitLevelParticipant}
          dropdownMatchSelectWidth={false}
          placeholder="Mức hưởng"
          value={benefitLevel}
          key={benefitLevel}
          onChange={(value: any) => {
            setBenefitLevel(value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      benefitLevel: value,
                    }
                    : person
              ),
            }));

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn mức hưởng" },
            { value: "1000000", label: "1.000.000" },
            { value: "2000000", label: "2.000.000" },
            { value: "3000000", label: "3.000.000" }
          ]}
        />
      </div>
    )
  }

  console.log(insuranceOrder);


  const inputExaminationByDistrictParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện khám chữa bệnh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Quận huyện"
          value={selectedMeicalByDistrictParticipant}
          key={selectedMeicalByDistrictParticipant}
          onChange={(value: any) => {
            setSelectedMeicalByDistrictParticipant(value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      medicalDistrictId: value,
                    }
                    : person
              ),
            }));

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(infoInsuranceDistricts.current, "Quận huyện")}
        />
      </div>
    )
  }

  const inputHospitalExaminationParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Bệnh viện khám chữa bệnh <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ maxWidth: '300px' }}
          ref={participantRefs.hospitalExaminationParticipant}
          placeholder="Bệnh viện"
          value={selectedMedicalByHospitalParticipant}
          key={selectedMedicalByHospitalParticipant}
          onChange={(value: any) => {

            setSelectedMedicalByHospitalParticipant(value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      hospitalId: value,
                    }
                    : person
              ),
            }));

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(infoInsuranceHospital.current, "Bệnh viện")}
        />
      </div>
    )
  }

  const inputClosingRateParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Mức đóng / Hệ số đóng <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          value={displayValue}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0"
          disabled
        />
      </div>

    )
  }

  const inputFullNamHouseHoldParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Họ tên chủ hộ <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          value={fullNamHouseHoldParticipant}
          ref={participantRefs.fullNamHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Họ và tên"
          onChange={(e) => {
            setFullNamHouseHoldParticipant(e.target.value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      houseHold: {
                        ...person.houseHold,
                        chuHoTen: e.target.value
                      }
                    }
                    : person
              ),
            }));
          }}
        />
      </div>
    )
  }

  const inputProvinceHouseHoldParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Thành phố <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          ref={participantRefs.provinceHouseHoldParticipant}
          placeholder="Thành phố"
          value={selectedHouseholdProvince}
          key={selectedHouseholdProvince}
          onChange={(value: any) => {
            setSelectedHouseholdProvince(value);

            householdDistricts.current = []
            householdWards.current = []

            setSelectedHouseholdDistrict(0)
            setSelectedHouseholdWard(0)

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      houseHold: {
                        ...person.houseHold,
                        ksProvinceId: value
                      }
                    }
                    : person
              ),
            }));

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(householdProvinces.current, "Thành phố")}
        />
      </div>
    )
  }

  const inputDistrictHouseHoldParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Quận huyện"
          ref={participantRefs.districtHouseHoldParticipant}
          value={selectedHouseholdDistrict}
          key={selectedHouseholdDistrict}
          onChange={(value: any) => {
            setSelectedHouseholdDistrict(value);

            householdWards.current = []
            setSelectedHouseholdWard(0)

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      houseHold: {
                        ...person.houseHold,
                        ksDistrictId: value
                      }
                    }
                    : person
              ),
            }));

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(householdDistricts.current, "Quận huyện")}
        />
      </div>
    )
  }

  const inputWardHouseHoldParticipants = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Phường xã <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Phường xã"
          ref={participantRefs.wardHouseHoldParticipant}
          value={selectedHouseholdWard}
          key={selectedHouseholdWard}
          onChange={(value: any) => {
            setSelectedHouseholdWard(value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      houseHold: {
                        ...person.houseHold,
                        ksWardId: value
                      }
                    }
                    : person
              ),
            }));

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(householdWards.current, "Phường xã")}
        />
      </div>
    )
  }

  const inputAddressDetailHouseHoldParticipants = () => {
    return (

      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ cụ thế <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          value={addressDetailHouseHoldParticipant}
          ref={participantRefs.addressDetailHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Địa chỉ cụ thể"
          onChange={(e) => {
            setAddressDetailHouseHoldParticipant(e.target.value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      houseHold: {
                        ...person.houseHold,
                        ksAddressDetail: e.target.value
                      }
                    }
                    : person
              ),
            }));
          }}
        />
      </div>
    )
  }

  const inputAddressDetailHKHouseHoldParticipants = () => {
    return (

      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ hộ khẩu <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          value={addressDetailHKHouseHoldParticipant}
          ref={participantRefs.addressDetailHKHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Địa chỉ cụ thể"
          onChange={(e) => {
            setAddressDetailHKHouseHoldParticipant(e.target.value);

            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              listInsuredPerson: prevOrder.listInsuredPerson.map(
                (person, index) =>
                  index === 0
                    ? {
                      ...person,
                      houseHold: {
                        ...person.houseHold,
                        hkAddressDetail: e.target.value
                      }
                    }
                    : person
              ),
            }));
          }}
        />
      </div>
    )
  }


  const inputCCCDMember = (index) => {

    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số CCCD <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          ref={members[index].citizenId}
          defaultValue={insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].citizenId}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập CCCD"
          onChange={(e) => {

            insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].citizenId = e.target.value;

          }}
        />
      </div>
    )
  }

  const inputGenderMemder = (index) => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Giới tính <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          placeholder="Chọn giới tính"
          ref={members[index].gender}
          defaultValue={insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].gender}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {

            insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].gender = value;

          }}
          key={gender}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn giới tính" },
            { value: "Nam", label: "Nam" },
            { value: "Nữ", label: "Nữ" },
          ]}
        />
      </div>
    )
  }

  const inputFullNameMember = (index) => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          ref={members[index].name}
          defaultValue={insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].name}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Họ và tên"
          onChange={(e) => {

            insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].name = e.target.value;

          }}
        />
      </div>
    )
  }

  const inputRelationshipMember = (index) => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Môi quan hệ <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={members[index].relationShipId}
          placeholder="Chọn mối quan hệ"
          dropdownMatchSelectWidth={false}
          defaultValue={insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].relationShipId}
          onChange={(value) => {

            insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].relationShipId = value;

          }}
          key={gender}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn mối quan hệ" },
            { value: "Bố ruột", label: "Bố ruột" },
            { value: "Mẹ ruột", label: "Mẹ ruột" },
          ]}
        />
      </div>
    )
  }

  const inputDobMember = (index) => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Ngày sinh <samp className="text-red-600">*</samp>
        </label>
        <DatePicker
          type="date"
          size="large"
          locale={locale}
          className="w-[100%]"
          ref={members[index].doB}
          placeholder="dd/mm/yyyy"
          defaultValue={insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].doB == "" ? "" : dayjs(insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].doB, dateFormat)}
          onChange={(value) => {
            const dateObject = dayjs(value.toString());
            const dateStr = `${dateObject.date().toString().padStart(2, "0")}/${(
              dateObject.month() + 1
            )
              .toString()
              .padStart(2, "0")}/${dateObject.year()}`;

            insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].doB = dateStr;
          }}
          format={dateFormat}
          maxDate={dayjs(formatDate2(new Date()), dateFormat)}
        />
      </div>
    )
  }

  const inputEthnicMember = (index) => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Dân tộc <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          ref={members[index].ethnicId}
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Chọn dân tộc"
          defaultValue={insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].ethnicId}
          onChange={(value) => {

            insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples[index].ethnicId = value;

          }}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={
            convertListToSelect(ethnicLists, "Chọn dân tộc")
          }
        />
      </div>
    )
  }

  const boxhHouseHoldParticipants = (index, onClose) => {
    return (
      <div className="p-4 rounded-xl flex flex-col gap-6 border border-gray-300">
        <div className="flex justify-between">
          <div className="text-[#0076B7] text-sm font-medium">Thông tin thành viên số {index + 1}</div>
          {index != 0 ?
            <button type="button"
              onClick={() => {
                onClose(index);
              }}
            >
              <img src={iconClose} className="w-3 h-3" />
            </button>
            :
            null
          }
        </div>

        {/* Số CCCD thành viên  */}
        {inputCCCDMember(index)}

        {/* Dân tộc */}
        {inputEthnicMember(index)}

        {/* Giới tính thành viên */}
        {inputGenderMemder(index)}

        {/* Họ tên */}
        {inputFullNameMember(index)}

        {/* Mối quan hệ */}
        {inputRelationshipMember(index)}

        {/* Ngày sinh */}
        {inputDobMember(index)}
      </div>
    )
  }

  const buttonAddMember = () => {
    return (
      <button
        type="button"
        className="p-3 bg-white rounded-xl flex flex-row items-center justify-center gap-2 border border-gray-300 "
        onClick={() => {
          setMembers([...members, createNewMember()])

          let houseHoldPeoples = insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples;
          houseHoldPeoples.push(
            {
              "id": 0,
              "name": "",
              "doB": "",
              "gender": "",
              "ethnicId": 0,
              "relationShipId": "",
              "citizenId": ""
            }
          )

          setInsuranceOrder((prevOrder) => ({
            ...prevOrder,
            listInsuredPerson: prevOrder.listInsuredPerson.map(
              (person, index) =>
                index === 0 ?
                  {
                    ...person,
                    houseHold: {
                      ...person.houseHold,
                      houseHoldPeoples: houseHoldPeoples
                    }
                  }
                  : person
            ),
          }));
        }}
      >
        <p className="text-base font-semibold text-[#0076B7]">
          Thêm người được bảo hiểm
        </p>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              d="M1.25122 12C1.25122 6.08579 6.08701 1.25 12.0012 1.25C17.9154 1.25 22.7512 6.08579 22.7512 12C22.7512 17.9142 17.9154 22.75 12.0012 22.75C6.08701 22.75 1.25122 17.9142 1.25122 12ZM12.0012 2.75C6.91543 2.75 2.75122 6.91421 2.75122 12C2.75122 17.0858 6.91543 21.25 12.0012 21.25C17.087 21.25 21.2512 17.0858 21.2512 12C21.2512 6.91421 17.087 2.75 12.0012 2.75ZM7.25122 12C7.25122 11.5858 7.58701 11.25 8.00122 11.25H11.2512V8C11.2512 7.58579 11.587 7.25 12.0012 7.25C12.4154 7.25 12.7512 7.58579 12.7512 8V11.25H16.0012C16.4154 11.25 16.7512 11.5858 16.7512 12C16.7512 12.4142 16.4154 12.75 16.0012 12.75H12.7512V16C12.7512 16.4142 12.4154 16.75 12.0012 16.75C11.587 16.75 11.2512 16.4142 11.2512 16V12.75H8.00122C7.58701 12.75 7.25122 12.4142 7.25122 12Z"
              fill="#0076B7"
            />
          </svg>
        </div>
      </button>
    )
  }

  const infoParticipants = () => {
    return (
      <div className="p-4 mx-4 bg-white rounded-xl flex flex-col gap-6">
        <>
          {/* Header thông tin người tham gia */}
          {boxHeaderParticipants()}

          {/* Tên người tham gia */}
          {inputFullNameParticipants()}

          {/* Tỉnh thành nơi tham gia BHXH*/}
          {inputProvinceParticipate()}

          {/* Số CCCCD */}
          {inputCCCDParticipants()}

          {/* Số BHXH */}
          {inputBHXHParticipants()}

          {/* Ngày sinh */}
          {inputDobParticipants()}

          {/* Giới tính */}
          {inputGenderParticipants()}

          {/* Dân tộc */}
          {inputEthnicParticipants()}

          {/*  Mức lương làm căn cứ đóng */}
          {inputSalaryParticipants()}

          {/* Số tháng đóng */}
          {inputMonthcountParticipants()}

          {/* Ngân sách hỗ trợ */}
          {inputBudgetParticipants()}

          <h3 className="text-base font-semibold text-[#0076B7]">
            Địa chỉ khai sinh{" "}
          </h3>

          {/* Tỉnh thành */}
          {inputKSProvinceParticipate()}

          {/* Quận huyện */}
          {inputKSDistrictParticipants()}

          {/* Phường xã */}
          {inputKSWardParticipants()}

          {/* Địa chỉ chi tiết */}
          {inputKSAddrestailParticipants()}

          <h3 className="text-base font-semibold text-[#0076B7]">
            Địa chỉ thường trú{" "}
          </h3>

          {/* Tỉnh thành */}
          {inputTTProvinceParticipants()}

          {/* Quận huyện */}
          {inputTTDistrictParticipants()}

          {/* Phường xã */}
          {inputTTWardParticipants()}

          {/* Địa chỉ cụ thể */}
          {inputTTAddressDetailParticipants()}


          <h3 className="text-base font-semibold text-[#0076B7]">
            Thông tin bảo hiểm{" "}
          </h3>

          {/* Vùng lương tối thiểu */}
          {inputAreaSalaryParticipants()}

          {/* Mức hưởng */}
          {inputBenefitLevelParticipants()}

          {/* Tỉnh thành khám chữa bệnh */}
          {inputMedicalByProvinceParticipants()}

          {/* Quận huyện khám chữa bênh */}
          {/* {inputExaminationByDistrictParticipants()} */}

          {/* Bệnh viện khám chữa bệnh */}
          {inputHospitalExaminationParticipants()}

          {/* Mức đóng / Hệ số đóng */}
          {inputClosingRateParticipants()}

          <h3 className="text-base font-semibold text-[#0076B7]">
            Thông tin hộ gia đình{" "}
          </h3>

          {/* Họ tên chủ hộ */}
          {inputFullNamHouseHoldParticipants()}

          {/* Tỉnh thành */}
          {inputProvinceHouseHoldParticipants()}

          {/* Quận huyện */}
          {inputDistrictHouseHoldParticipants()}

          {/* Phường xã */}
          {inputWardHouseHoldParticipants()}

          {/* Địa chỉ cụ thể */}
          {inputAddressDetailHouseHoldParticipants()}

          {/* Địa chỉ hộ khẩu */}
          {inputAddressDetailHKHouseHoldParticipants()}

          {members.map((item, index) =>
            boxhHouseHoldParticipants(
              index,
              (index) => {
                members.splice(index, 1);
                setMembers([...members]);

                let houseHoldPeoples = insuranceOrder.listInsuredPerson[0].houseHold.houseHoldPeoples;
                houseHoldPeoples.splice(index, 1);

              }
            )
          )}

          {buttonAddMember()}

        </>
      </div>
    )
  }

  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius - width * 0.5, y);

    ctx.moveTo(x + width - radius - width * 0.2, y)
    ctx.lineTo(x + width - radius, y);

    ctx.moveTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);

    ctx.lineTo(x + width, y + width - radius - width * 0.5);

    ctx.moveTo(x + width, y + width - radius - width * 0.2);
    ctx.lineTo(x + width, y + width - radius);

    ctx.quadraticCurveTo(x + width, y + width, x + width - radius, y + width);
    ctx.lineTo(x + width - width * 0.3, y + width);

    ctx.moveTo(x + width - width * 0.6, y + width);
    ctx.lineTo(x + width * 0.2, y + width);

    ctx.quadraticCurveTo(x, y + width, x, y + width - radius);
    ctx.lineTo(x, y + radius + width * 0.5);

    ctx.moveTo(x, y + radius + width * 0.2);
    ctx.lineTo(x, y + radius);

    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  const customStyles = {
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.50)'
    }
  };

  const uploadImage = () => {
    return (
      <div className="p-4 mx-4 mt-4 bg-white rounded-xl border border-[#B9BDC1] flex flex-col gap-3">
        <div className="flex justify-between">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Chụp ảnh giấy tờ tuỳ thân
          </h3>
        </div>

        <div ref={participantRefs.uploadCCCD} className="flex flex-row gap-2 justify-between w-[100%]">
          <div className="flex gap-3 w-[100%]">
            <div className="flex flex-col gap-2 w-[100%]">
              <div
                className={`bg-[#F5F5F5]  rounded-lg p-[${frontImageUrl ? "0px" : "9px"
                  }]  card-cccd w-[100%] h-[100px]`}
                onClick={() => handleCardClick(frontImageInputRef)}
              >
                <div className="icon-1">
                  {frontImageUrl ? (
                    <img
                      src={`https://baohiem.dion.vn${frontImageUrl}`}
                      alt="Mặt trước"
                      className="w-[100%] h-[100px] object-center rounded-lg "
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={"100%"}
                      height={"81px"}
                      viewBox="0 0 130 89"
                      fill="none"
                    >
                      <path
                        d="M0.183716 7.50059V20.4506H1.83927V7.50059C1.83927 4.43539 4.06292 1.95059 6.80594 1.95059H18.3948V0.100586H6.80594C3.14859 0.100586 0.183716 3.41363 0.183716 7.50059Z"
                        fill="#0076B7"
                      />
                      <path
                        d="M129.317 7.50058V20.4506H127.661V7.50058C127.661 4.4354 125.438 1.95059 122.695 1.95059H111.106V0.100586H122.695C126.352 0.100586 129.317 3.41368 129.317 7.50058Z"
                        fill="#0076B7"
                      />
                      <path
                        d="M0.183716 81.5006V68.5506H1.83927V81.5006C1.83927 84.5658 4.06292 87.0506 6.80594 87.0506H18.3948V88.9006H6.80594C3.14859 88.9006 0.183716 85.5875 0.183716 81.5006Z"
                        fill="#0076B7"
                      />
                      <path
                        d="M129.317 81.5006V68.5506H127.661V81.5006C127.661 84.5658 125.438 87.0506 122.695 87.0506H111.106V88.9006H122.695C126.352 88.9006 129.317 85.5875 129.317 81.5006Z"
                        fill="#0076B7"
                      />
                    </svg>
                  )}
                </div>
                <div className="icon-2">
                  {frontImageUrl ? (
                    <></>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M12.25 7.4375C12.5607 7.4375 12.8125 7.68934 12.8125 8V11.4375H16.25C16.5607 11.4375 16.8125 11.6893 16.8125 12C16.8125 12.3107 16.5607 12.5625 16.25 12.5625H12.8125V16C12.8125 16.3107 12.5607 16.5625 12.25 16.5625C11.9393 16.5625 11.6875 16.3107 11.6875 16V12.5625H8.25C7.93934 12.5625 7.6875 12.3107 7.6875 12C7.6875 11.6893 7.93934 11.4375 8.25 11.4375H11.6875V8C11.6875 7.68934 11.9393 7.4375 12.25 7.4375Z"
                        fill="#0076B7"
                      />
                      <path
                        fillRule="evenodd"
                        d="M3.68506 12.0001C3.68506 7.26974 7.51974 3.43506 12.2501 3.43506C16.9804 3.43506 20.8151 7.26974 20.8151 12.0001C20.8151 16.7304 16.9804 20.5651 12.2501 20.5651C7.51974 20.5651 3.68506 16.7304 3.68506 12.0001ZM12.2501 4.56506C8.14382 4.56506 4.81506 7.89382 4.81506 12.0001C4.81506 16.1063 8.14382 19.4351 12.2501 19.4351C16.3563 19.4351 19.6851 16.1063 19.6851 12.0001C19.6851 7.89382 16.3563 4.56506 12.2501 4.56506Z"
                        fill="#0076B7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <h4 className="text-[15px] text-black text-center">
                Mặt trước
              </h4>
              <input
                type="file"
                accept="image/*"
                ref={frontImageInputRef}
                style={{ display: "none" }}
                onChange={(event) => {
                  setIsUploadingPhotoCitizenFont(true);
                  handleImageUpload(event, updateFrontCitizenPhoto);
                }}
              />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <div
                className={`bg-[#F5F5F5]  rounded-lg p-[${backImageUrl ? "0px" : "9px"
                  }]  card-cccd w-[100%] h-[100px]`}
                onClick={() => handleCardClick(backImageInputRef)}
              >
                <div className="icon-1">
                  {backImageUrl ? (
                    <img
                      src={`https://baohiem.dion.vn${backImageUrl}`}
                      alt="Mặt sau"
                      className="w-[100%] h-[100px] object-center rounded-lg"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={"100%"}
                      height={"81px"}
                      viewBox="0 0 130 89"
                      fill="none"
                    >
                      <path
                        d="M0.183716 7.50059V20.4506H1.83927V7.50059C1.83927 4.43539 4.06292 1.95059 6.80594 1.95059H18.3948V0.100586H6.80594C3.14859 0.100586 0.183716 3.41363 0.183716 7.50059Z"
                        fill="#0076B7"
                      />
                      <path
                        d="M129.317 7.50058V20.4506H127.661V7.50058C127.661 4.4354 125.438 1.95059 122.695 1.95059H111.106V0.100586H122.695C126.352 0.100586 129.317 3.41368 129.317 7.50058Z"
                        fill="#0076B7"
                      />
                      <path
                        d="M0.183716 81.5006V68.5506H1.83927V81.5006C1.83927 84.5658 4.06292 87.0506 6.80594 87.0506H18.3948V88.9006H6.80594C3.14859 88.9006 0.183716 85.5875 0.183716 81.5006Z"
                        fill="#0076B7"
                      />
                      <path
                        d="M129.317 81.5006V68.5506H127.661V81.5006C127.661 84.5658 125.438 87.0506 122.695 87.0506H111.106V88.9006H122.695C126.352 88.9006 129.317 85.5875 129.317 81.5006Z"
                        fill="#0076B7"
                      />
                    </svg>
                  )}
                </div>
                <div className="icon-2">
                  {backImageUrl ? (
                    <></>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M12.25 7.4375C12.5607 7.4375 12.8125 7.68934 12.8125 8V11.4375H16.25C16.5607 11.4375 16.8125 11.6893 16.8125 12C16.8125 12.3107 16.5607 12.5625 16.25 12.5625H12.8125V16C12.8125 16.3107 12.5607 16.5625 12.25 16.5625C11.9393 16.5625 11.6875 16.3107 11.6875 16V12.5625H8.25C7.93934 12.5625 7.6875 12.3107 7.6875 12C7.6875 11.6893 7.93934 11.4375 8.25 11.4375H11.6875V8C11.6875 7.68934 11.9393 7.4375 12.25 7.4375Z"
                        fill="#0076B7"
                      />
                      <path
                        fillRule="evenodd"
                        d="M3.68506 12.0001C3.68506 7.26974 7.51974 3.43506 12.2501 3.43506C16.9804 3.43506 20.8151 7.26974 20.8151 12.0001C20.8151 16.7304 16.9804 20.5651 12.2501 20.5651C7.51974 20.5651 3.68506 16.7304 3.68506 12.0001ZM12.2501 4.56506C8.14382 4.56506 4.81506 7.89382 4.81506 12.0001C4.81506 16.1063 8.14382 19.4351 12.2501 19.4351C16.3563 19.4351 19.6851 16.1063 19.6851 12.0001C19.6851 7.89382 16.3563 4.56506 12.2501 4.56506Z"
                        fill="#0076B7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <h4 className="text-[15px] text-black text-center">Mặt sau</h4>
              <input
                type="file"
                accept="image/*"
                ref={backImageInputRef}
                style={{ display: "none" }}
                onChange={(event) => {
                  setIsUploadingPhotoCitizenBack(true);
                  handleImageUpload(event, updateBackCitizenPhoto);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const inputPhoneBuyer = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số điện thoại <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="phone"
          value={phone}
          ref={buyerRefs.phone}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Số điện thoại"
          maxLength={12}
          onChange={(e) => {
            let numberValue = e.target.value.replace(/\D/g, "");
            setPhone(numberValue);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              phone: numberValue,
            }));
          }}
        />
      </div>
    )
  }

  const inputFullNameBuyer = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="name"
          value={buyerName}
          ref={buyerRefs.buyerName}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập tên của bạn"
          onChange={(e) => {
            setBuyerName(e.target.value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              fullName: e.target.value,
            }));
          }}
        />
      </div>
    )
  }

  const inputEmailBuyer = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Email
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          ref={buyerRefs.email}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập email của bạn"
          onChange={(e) => {
            setEmail(e.target.value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              email: e.target.value,
            }));
          }}
        />
      </div>
    )
  }

  const inputProvinceBuyer = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Tỉnh thành <samp className="text-red-600">*</samp>
        </label>

        <Select
          size="large"
          className="w-[100%]"
          showSearch
          placeholder="Chọn tỉnh thành phố"
          dropdownMatchSelectWidth={false}
          ref={buyerRefs.selectedBuyerProvince}
          value={selectedBuyerProvince}
          onChange={(value) => {
            buyerDistricts.current = [];
            buyerWards.current = []

            setSelectedBuyerDistrict(0)
            setSelectedBuyerWard(0)

            setSelectedBuyerProvince(value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              provinceId: value,
            }));
          }}
          key={selectedBuyerProvince}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(buyerProvinces.current, "Chọn tỉnh thành phố")}
        />
      </div>
    )
  }

  const inputDistrictBuyer = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Quận huyện <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Chọn quận huyện"
          ref={buyerRefs.selectedBuyerDistrict}
          value={selectedBuyerDistrict}
          key={selectedBuyerDistrict}
          onChange={(value) => {
            buyerWards.current = [];
            setSelectedBuyerWard(0)

            setSelectedBuyerDistrict(value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              districtId: value,
            }))
          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(buyerDistricts.current, "Chọn quận huyện")}
        />
      </div>
    )
  }

  const inputWardBuyer = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Phường xã <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          dropdownMatchSelectWidth={false}
          placeholder="Chọn phường xã"
          ref={buyerRefs.selectedBuyerWard}
          value={selectedBuyerWard}
          onChange={(value: any) => {
            setSelectedBuyerWard(value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              wardId: parseInt(value),
            }));

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={convertListToSelect(buyerWards.current, "Chọn phường xã")}
        />
      </div>
    )
  }

  const inputAddressDetailBuyer = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Địa chỉ cụ thể <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          value={buyerAddressDetail}
          ref={buyerRefs.buyerAddressDetail}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="VD: Số nhà, số đường,...."
          onChange={(e) => {
            setBuyerAddressDetail(e.target.value);
            setInsuranceOrder((prevOrder) => ({
              ...prevOrder,
              addressDetail: e.target.value,
            }));
          }}
        />
      </div>
    )
  }

  const infoBuyer = () => {
    return (
      <div className="p-4 mx-4 bg-white rounded-xl flex flex-col gap-6">
        <h3 className="text-[#0076B7] text-lg font-medium">
          Thông tin người mua
        </h3>

        {/* Số điện thoại */}
        {inputPhoneBuyer()}

        {/* Họ và tên */}
        {inputFullNameBuyer()}

        {/* Email */}
        {inputEmailBuyer()}

        {/* Tỉnh thành */}
        {inputProvinceBuyer()}

        {/* Quận huyện */}
        {inputDistrictBuyer()}

        {/* Phường xã */}
        {inputWardBuyer()}

        {/* Địa chỉ cụ thể */}
        {inputAddressDetailBuyer()}
      </div>
    );
  }

  const rendePrivacyPolicy = () => {
    return (
      <div className="flex mx-4 flex-col gap-2 pb-4">
        <div className="flex gap-2">
          <input
            type="checkbox"
            className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
            id="unchecked-circular-checkbox"
            checked={isChecked}
            onChange={(event) => {
              setIsChecked(event.target.checked);
            }}
          />
          <label
            htmlFor="unchecked-circular-checkbox"
            className="text-sm font-normal text-[#000] w-[96%]"
          >
            Tôi cam đoan rằng tất cả những lời khai trên là đúng và đã hiểu rõ
            <strong className="text-[#0076B7] font-bold">
              {" "}
              Chính sách và điều khoản
            </strong>
          </label>
        </div>
      </div>
    )
  }

  const renderFotter = () => {
    return (
      <div className="page-2 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-between">
            <p className="block text-sm font-normal text-gray-900">
              Tổng thanh toán:
            </p>
            <h3 className="text-base font-medium text-[#0076B7]">
              {finalPrice.current > 0
                ? finalPrice.current.toLocaleString("vi-VN")
                : 0}{" "}
              VND
            </h3>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <button
              className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
              type="submit"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    )
  }

  const styleModal = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      border: 'none',
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  }


  const modalLoading = () => {
    return (
      <>
        <Modal
          isOpen={isUploadingPhotoCitizenFont || isUploadingPhotoCitizenBack || loading}
          style={styleModal}
        >
          <div className="w-[100%] h-[100%] relative flex justify-center items-center">
            <FadeLoader height={10} width={3} loading={true} color="#ffffff" />
          </div>
        </Modal>
      </>
    )
  }

  const modalScanQR = () => {
    return (
      <>
        <Modal
          isOpen={isShowModelQR}
          onRequestClose={() => setIsShowModelQR(false)}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="QR Code"
        >
          <div className="w-[400px] h-[750px] relative">
            <div className="text-[#fff] z-10  w-[100%] text-center justify-items-center underline italic ">
              Quét QR trên CCCD của bạn
            </div>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: opacityQR }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                zIndex: 10,
                top: windowSize?.height / 2,
                left: windowSize?.width / 2,
                transform: 'translate(-50%, -50%)'
              }}>
              <Lottie
                animationData={lottieScanQR}
                ref={lottieRef}
                loop={true}
                style={{
                  width: size.width,
                  height: size.height,
                }}
                rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} />
            </motion.div>


            <Scanner
              paused={!isShowModelQR}
              onError={(error) => {

              }}
              constraints={{
                facingMode: 'environment',
                aspectRatio: { ideal: 18 / 6 },
                frameRate: { ideal: 50 },
                width: { ideal: 2160 },
                height: { ideal: 720 },
                echoCancellation: true,
                latency: { ideal: 0 },
                suppressLocalAudioPlayback: true,
              }}
              components={{
                torch: false,
                zoom: true,
                finder: false,
                tracker: (detectedCodes: IDetectedBarcode[], ctx: CanvasRenderingContext2D) => {
                  if (detectedCodes.length > 0) {
                    const { boundingBox } = detectedCodes[0];

                    // boundingBox object contains properties like x, y, width, and height
                    const { x, y, width, height } = boundingBox;

                    setOpacityQR(0)

                    // setPosition({ x: x + width, y: y - height });
                    setSize({ width: width, height: height })

                    drawRoundedRect(ctx, x, y, width, height, 10);
                  }
                },
              }}
              onScan={(data) => {
                setTimeout(() => {
                  const info = data[0]["rawValue"];
                  const words = info.split("|");

                  setIsShowModelQR(false);
                  setCitizenId(words[0]);

                  // số căn cước
                  setCitizenId(words[0]);
                  setInsuranceOrder((prevOrder) => ({
                    ...prevOrder,
                    listInsuredPerson: prevOrder.listInsuredPerson.map(
                      (person, index) =>
                        index === 0
                          ? { ...person, citizenId: words[0] }
                          : person
                    ),
                  }));
                  // họ và tên
                  setPersonName(words[2]);
                  setInsuranceOrder((prevOrder) => ({
                    ...prevOrder,
                    listInsuredPerson: prevOrder.listInsuredPerson.map(
                      (person, index) =>
                        index === 0
                          ? { ...person, fullName: words[2] }
                          : person
                    ),
                  }));

                  const dob = words[3];
                  const day = dob.substring(0, 2);
                  const month = dob.substring(2, 4);
                  const year = dob.substring(4, 8);

                  // set năm sinh
                  setDateValue(dayjs(`${day}-${month}-${year}`, dateFormat));

                  setInsuranceOrder((prevOrder) => ({
                    ...prevOrder,
                    listInsuredPerson: prevOrder.listInsuredPerson.map(
                      (person, index) =>
                        index === 0
                          ? {
                            ...person,
                            doB: formatDateString(
                              `${year}-${month}-${day}`
                            ),
                          }
                          : person
                    ),
                  }));

                  setGender(words[4]); // giới tính
                  setInsuranceOrder((prevOrder) => ({
                    ...prevOrder,
                    listInsuredPerson: prevOrder.listInsuredPerson.map(
                      (person, index) =>
                        index === 0 ? { ...person, gender: words[4] } : person
                    ),
                  }));
                }, 1000)
              }}
              allowMultiple={false}

              styles={{
                container: {
                  position: 'fixed',
                  width: 450,
                  height: 812 + 20,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'white'
                },
                finderBorder: 2,
                video: {
                  width: 2160,
                  height: 812 + 20,
                  objectFit: 'cover',
                },
              }}
            />
          </div>

        </Modal>
      </>
    )
  }

  return (
    <>
      <HeaderBase isHome={false} title={"Đăng ký BHXH Tự nguyện"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 pt-[75px]"
      >
        {/* Cập nhật căn cước công dân */}
        {uploadImage()}

        {/* Thông tin người tham gia và hộ gia đình */}
        {infoParticipants()}

        {/* Người mua */}
        {infoBuyer()}

        {/* Chính sách bảo mật */}
        {rendePrivacyPolicy()}

        {/* Fotter */}
        {renderFotter()}
      </form>

      {/* Modal loading  */}
      {modalLoading()}

      {/* Modal QR  */}
      {modalScanQR()}
    </>
  );
};

export default RegisterBHXH;
