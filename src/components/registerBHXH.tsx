import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Province, District, Ward } from "../models";
import { ClipLoader, FadeLoader } from "react-spinners";
import { Modal } from "zmp-ui";
import { SpecificContext } from "./SpecificContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HeaderBase from "./headerBase";
import imageQR from "../../assets-src/icon_qr.png";
import {
  convertListToSelect,
  formatDate,
  formatDate2,
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
import { formattedEthnics } from "../utils/constants";

dayjs.locale("vi");
dayjs.extend(customParseFormat);
const RegisterBHXH: React.FunctionComponent = (props) => {
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

  useEffect(() => {
    if (insuranceOrder.id != 0) {
      // Set thông tin người tham giá BHXH tự nguyện
      const fetchData = async () => {
        const [response1, response2, response3, response4, response5, response6] = await Promise.all([
          axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${insuranceOrder.provinceId}`),
          axios.get(`https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${insuranceOrder.districtId}`),

          axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${insuranceOrder.listInsuredPerson[0].ksTinhThanhMa}`),
          axios.get(`https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${insuranceOrder.listInsuredPerson[0].ksQuanHuyenMa}`),

          axios.get(`https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${insuranceOrder.listInsuredPerson[0].provinceId}`),
          axios.get(`https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${insuranceOrder.listInsuredPerson[0].districtId}`),

        ]);

        buyerDistricts.current = response1.data.data;
        buyerWards.current = response2.data.data;

        ksDistricts.current = response3.data.data;
        ksWards.current = response4.data.data;

        ttDistricts.current = response5.data.data;
        ttWards.current = response6.data.data;

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

  const validate = () => {
    if (
      !isValidEmptyString(frontImageUrl) ||
      !isValidEmptyString(backImageUrl)
    ) {
      toast.warn("Ảnh giấy tờ tùy thân không được để trống");
      return false;
    }
    if (!isValidEmptyString(personName)) {
      toast.warn("Họ và tên người tham gia không được để trống");
      return false;
    }
    if (selectedInsuranceProvinceId.current == 0) {
      toast.warn("Vui lòng chọn tỉnh thành nơi tham gia BHXH");
      return false;
    }

    if (!isValidEmptyString(citizenId)) {
      toast.warn("Số CCCD không được để trống");
      return false;
    } else if (citizenId.length != 12) {
      toast.warn("Số CCCD bao gồm 12 ký tự, vui lòng nhập lại");
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
      return false;
    }

    if (!isValidEmptyString(dateValue)) {
      toast.warn("Ngày sinh không được để trống");
      return false;
    }

    if (!isValidEmptyString(gender)) {
      toast.warn("Giới tính không được để trống");
      return false;
    }

    if (ethnic == 0) {
      toast.warn("Dân tộc không được để trống");
      return false;
    }

    if (Number(wage.current) == 0 || Number(wage.current) < 1000000) {
      toast.warn("Mức lương không hợp lệ");
      return false;
    }
    if (Number(monthCount.current) == 0 || Number(monthCount.current) < 0) {
      toast.warn("Số tháng tham gia không hợp lệ");
      return false;
    }

    if (selectedKSProvince == 0) {
      toast.warn("Địa chỉ tỉnh thành khai sinh không được để trống");
      return false;
    }

    if (selectedKSDistrict == 0) {
      toast.warn("Địa chỉ quận huyện khai sinh không được để trống");
      return false;
    }

    if (selectedKSWard == 0) {
      toast.warn("Địa chỉ phường xã khai sinh không được để trống");
      return false;
    }

    if (ksAddressDetail == "") {
      toast.warn("Địa chỉ cụ thể khai sinh không được để trống");
      return false;
    }

    if (selectedTTProvince == 0) {
      toast.warn("Địa chỉ tỉnh thành thường trú không được để trống");
      return false;
    }

    if (selectedTTDistrict == 0) {
      toast.warn("Địa chỉ quận huyện thường trú không được để trống");
      return false;
    }

    if (selectedTTWard == 0) {
      toast.warn("Địa chỉ phường xã thường trú không được để trống");
      return false;
    }

    if (ttAddressDetail == "") {
      toast.warn("Địa chỉ cụ thể thường trú không được để trống");
      return false;
    }

    if (!isValidPhone(phone)) {
      toast.warn("Số điện thoại không hợp lệ");
      return false;
    }

    if (!isValidEmptyString(buyerName)) {
      toast.warn("Họ và tên người mua không được để trống");
      return false;
    }

    if (isValidEmptyString(email)) {
      if (!isValidEmail(email)) {
        toast.warn("Email không hợp lệ");
        return false;
      }
    }

    if (selectedBuyerProvince == 0) {
      toast.warn("Vui lòng chọn tỉnh thành");
      return false;
    }
    if (selectedBuyerDistrict == 0) {
      toast.warn("Vui lòng chọn quận huyện");
      return false;
    }
    if (selectedBuyerWard == 0) {
      toast.warn("Vui lòng chọn phường xã");
      return false;
    }

    if (!isValidEmptyString(buyerAddressDetail)) {
      toast.warn("Địa chỉ cụ thể không được để trống");
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
        setInsuranceOrder((prevOrder) => ({
          ...prevOrder,
          id: response.data.data[0],
        }));
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


  return (
    <>
      <HeaderBase isHome={false} title={"Đăng ký BHXH Tự nguyện"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 pt-[75px]"
      >
        <div className="p-4 mx-4 mt-4 bg-white rounded-xl border border-[#B9BDC1] flex flex-col gap-3">
          <div className="flex justify-between">
            <h3 className="text-[#0076B7] text-lg font-medium">
              Chụp ảnh giấy tờ tuỳ thân
            </h3>

            {
              <Modal
                visible={isShowModelQR}
                onClose={() => {
                  setIsShowModelQR(false);
                }}
                modalStyle={{
                  background: "transparent",
                  width: "400px",
                  height: "600px",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="text-[#fff]  w-[100%] text-center justify-items-center underline italic ">
                  Quét QR trên CCCD của bạn
                </div>
                <Scanner
                  paused={!isShowModelQR}
                  onError={(error) => { }}
                  components={{
                    zoom: true,
                    torch: false,
                    tracker: (
                      detectedCodes: IDetectedBarcode[],
                      ctx: CanvasRenderingContext2D
                    ) => { },
                  }}
                  onScan={(data) => {
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
                    setDateValue(`${year}-${month}-${day}`);

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
                  }}
                  allowMultiple={false}
                  constraints={{ facingMode: "environment" }}
                  styles={{
                    container: {
                      width: "100%",
                      height: "90%",
                      alignSelf: "center",
                    },
                    finderBorder: 10,
                    video: {
                      width: "100%",
                      height: "100%",
                      alignSelf: "center",
                    },
                  }}
                />
              </Modal>
            }
          </div>
          <div className="flex flex-row gap-2  justify-around w-[100%]">
            <div className="flex flex-row gap-2 w-[100%]">
              <div className="flex flex-col gap-2 w-[100%]">
                <div
                  className={`bg-[#F5F5F5]  rounded-lg p-[${frontImageUrl ? "0px" : "4px"
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
                        height={"90px"}
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
                  className={`bg-[#F5F5F5] rounded-lg p-[${backImageUrl ? "0px" : "4px"
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
                        height={"90px"}
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
        <div className="p-4 mx-4 bg-white rounded-xl flex flex-col gap-6">
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
          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Họ và tên <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              id="name"
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
          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Tỉnh thành nơi tham gia BHXH{" "}
              <samp className="text-red-600">*</samp>
            </label>
            <Select
              size="large"
              className="w-[100%]"
              showSearch
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
          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Số CCCD <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              id="cccd"
              value={citizenId}
              maxLength={12}
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
          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Số BHXH
            </label>
            <Input
              type="text"
              id="bhxh"
              maxLength={15}
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
          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Ngày sinh <samp className="text-red-600">*</samp>
            </label>
            <DatePicker
              type="date"
              size="large"
              locale={locale}
              className="w-[100%]"
              value={dateValue}
              placeholder="dd/mm/yyyy"
              onChange={handleDobChange}
              format={dateFormat}
              maxDate={dayjs(formatDate2(new Date()), dateFormat)}
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Giới tính <samp className="text-red-600">*</samp>
            </label>
            <Select
              size="large"
              className="w-[100%]"
              showSearch
              placeholder="Chọn giới tính"
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

          <div>
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Dân tộc <samp className="text-red-600">*</samp>
            </label>
            <Select
              size="large"
              className="w-[100%]"
              dropdownStyle={{ maxWidth: '300px' }}
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

          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Mức lương làm căn cứ đóng <samp className="text-red-600">*</samp>
            </label>
            <div className="relative">
              <Input
                type="text"
                id="salary"
                value={displayValue}
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

          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Số tháng đóng <samp className="text-red-600">*</samp>
            </label>
            <Select
              size="large"
              className="w-[100%]"
              placeholder="Chọn giới tính"
              dropdownMatchSelectWidth={false}
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
          {/*---------------------------------------------------------*/}
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

          <h3 className="text-base font-semibold text-[#0076B7]">
            Địa chỉ khai sinh{" "}
          </h3>


          {/*---------------------------------------------------------*/}
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

          {/*---------------------------------------------------------*/}
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

          {/*---------------------------------------------------------*/}
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

          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Địa chỉ cụ thể <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              id="address"
              value={ksAddressDetail}
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

          <h3 className="text-base font-semibold text-[#0076B7]">
            Địa chỉ thường trú{" "}
          </h3>

          {/*---------------------------------------------------------*/}
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

          {/*---------------------------------------------------------*/}
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

          {/*---------------------------------------------------------*/}
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

          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Địa chỉ cụ thể <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              id="address"
              value={ttAddressDetail}
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
        </div>

        {/* Người mua */}
        <div className="p-4 mx-4 bg-white rounded-xl flex flex-col gap-6">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Thông tin người mua
          </h3>


          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Số điện thoại <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              id="phone"
              value={phone}
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
          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Họ và tên <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              id="name"
              value={buyerName}
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
          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
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
          <div>
            <label className="block text-sm font-normal text-gray-900 pb-2">
              Địa chỉ cụ thể <samp className="text-red-600">*</samp>
            </label>
            <Input
              type="text"
              id="address"
              value={buyerAddressDetail}
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
        </div>
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
        {/* Đưa fotter trực tiếp vào đây để tiện xử lý */}
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
      </form>

      <Modal
        visible={isUploadingPhotoCitizenFont}
        modalStyle={{
          background: "transparent",
        }}
      >
        <div className="justify-center flex">
          <FadeLoader height={10} width={3} loading={true} color="#0076B7" />
        </div>
      </Modal>

      <Modal
        visible={isUploadingPhotoCitizenBack}
        modalStyle={{
          background: "transparent",
        }}
      >
        <div className="justify-center flex">
          <FadeLoader height={10} width={3} loading={true} color="#0076B7" />
        </div>
      </Modal>
      <Modal
        visible={loading}
        modalStyle={{
          background: "transparent",
        }}
      >
        <div className="justify-center flex">
          <FadeLoader height={10} width={3} loading={true} color="#0076B7" />
        </div>
      </Modal>
    </>
  );
};

export default RegisterBHXH;
