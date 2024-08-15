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
import {
  isValidEmail,
  isValidEmptyString,
  isValidPhone,
} from "../utils/validateString";
const RegisterBHXH: React.FunctionComponent = (props) => {
  const navigate = useNavigate();
  const [personName, setPersonName] = useState<string>("");
  const [citizenId, setCitizenId] = useState<string>("");
  const [socialInsuranceId, setSocialInsuranceId] = useState<string>("");
  // const [dob, setDob] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [buyerName, setBuyerName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [addressDetail, setAddressDetail] = useState<string>("");

  const [temp, setTemp] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedBuyerProvince, setSelectedBuyerProvince] = useState<number>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
  const [selectedWard, setSelectedWard] = useState<number>(0);

  const [isUploadingPhotoCitizenFont, setIsUploadingPhotoCitizenFont] =
    useState(false);
  const [isUploadingPhotoCitizenBack, setIsUploadingPhotoCitizenBack] =
    useState(false);

  // const [selectedProvince, setSelectedProvince] = useState<number>(0);
  const selectedProvince = useRef<number>(0);
  const [supportBudget, setSupportBudget] = useState<number>(0);
  // const [wage, setWage] = useState<number>(0);
  const wage = useRef<number>(0);
  // const [monthCount, setMonthCount] = useState<number>(0);
  const monthCount = useRef<number>(0);
  const [frontImageUrl, setFrontImageUrl] = useState<string>("");
  const [backImageUrl, setBackImageUrl] = useState<string>("");
  const [dateValue, setDateValue] = useState("");

  const { register, handleSubmit, watch, setValue } = useForm();
  // const [finalPrice, setFinalPrice] = useState<number>(0);
  const finalPrice = useRef<number>(0);
  const specificContext = useContext(SpecificContext);
  const [displayValue, setDisplayValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const {
    // frontCitizenidPhoto,
    // backCitizenidPhoto,
    // setFrontCitizenidPhoto,
    // setBackCitizenidPhoto,
    // insuranceOrderId,
    // setInsuranceOrderId,
    insuranceOrder,
    setInsuranceOrder,
  } = specificContext;
  const frontImageInputRef = useRef<HTMLInputElement>(null);
  const backImageInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (insuranceOrder.id != 0) {
      setPersonName(insuranceOrder.listInsuredPerson[0].fullName);
      setValue("name", insuranceOrder.listInsuredPerson[0].fullName);
      selectedProvince.current =
        insuranceOrder.listInsuredPerson[0].insuranceProvinceId;
      setValue(
        "province",
        insuranceOrder.listInsuredPerson[0].insuranceProvinceId
      );
      setCitizenId(insuranceOrder.listInsuredPerson[0].citizenId);
      setValue("cccd", insuranceOrder.listInsuredPerson[0].citizenId);
      setSocialInsuranceId(
        insuranceOrder.listInsuredPerson[0].socialInsuranceNumber
      );
      setValue(
        "bhxh",
        insuranceOrder.listInsuredPerson[0].socialInsuranceNumber
      );
      setDateValue(formatDateToISO(insuranceOrder.listInsuredPerson[0].doB));
      setValue("dob", formatDateToISO(insuranceOrder.listInsuredPerson[0].doB));
      setGender(insuranceOrder.listInsuredPerson[0].gender);
      setValue("gender", insuranceOrder.listInsuredPerson[0].gender);
      wage.current = insuranceOrder.listInsuredPerson[0].wage;
      setValue("salary", insuranceOrder.listInsuredPerson[0].wage);
      monthCount.current = insuranceOrder.listInsuredPerson[0].monthInsured;
      setValue("months", insuranceOrder.listInsuredPerson[0].monthInsured);
      setSupportBudget(insuranceOrder.listInsuredPerson[0].supportBudget);

      setPhone(insuranceOrder.phone);
      setValue("phone", insuranceOrder.phone);
      setBuyerName(insuranceOrder.fullName);
      setValue("buyerName", insuranceOrder.fullName);
      setEmail(insuranceOrder.email);
      setValue("email", insuranceOrder.email);
      setSelectedBuyerProvince(insuranceOrder.provinceId);
      setSelectedDistrict(insuranceOrder.districtId);
      setValue("buyerDistrict", Number(insuranceOrder.districtId));
      setSelectedWard(insuranceOrder.wardId);
      setValue("buyerWard", Number(insuranceOrder.wardId));
      //setValue("province", Number(insuranceOrder);
      setAddressDetail(insuranceOrder.addressDetail);
      setValue("address", insuranceOrder.addressDetail);
      setDisplayValue(
        insuranceOrder.listInsuredPerson[0].wage.toLocaleString("vi-VN")
      );
      finalPrice.current = insuranceOrder.finalPrice;
    }
  }, []);
  useEffect(() => {
    setFrontImageUrl(insuranceOrder.photoCitizenFront);
    setBackImageUrl(insuranceOrder.photoCitizenBack);
  }, [insuranceOrder.photoCitizenFront, insuranceOrder.photoCitizenBack]);
  const calculateFinalPrice = () => {
    const budgetPerMonth = selectedProvince.current === 1001 ? 66000 : 33000;
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
      .get("https://baohiem.dion.vn/province/api/list")
      .then((response) => {
        setProvinces(response.data.data);
        setWards([]);
        setDistricts([]);
        //setSelectedBuyerProvince(Number(response.data.data[0].id));
        //selectedProvince.current = Number(response.data.data[0].id);
        //setValue("province", Number(response.data.data[0].id));
        //setValue("buyerProvince", Number(response.data.data[0].id));
        setTemp(!temp);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedBuyerProvince !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${selectedBuyerProvince}`
        )
        .then((response) => {
          setDistricts(response.data.data);
          setWards([]);
          //setSelectedDistrict(Number(response.data.data[0].id));
          //setValue("buyerDistrict", Number(response.data.data[0].id));
          // setInsuranceOrder((prevOrder) => ({
          //   ...prevOrder,
          //   districtId: Number(response.data.data[0].id),
          // }));
          setTemp(!temp);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedBuyerProvince]);

  useEffect(() => {
    if (selectedDistrict !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${selectedDistrict}`
        )
        .then((response) => {
          setWards(response.data.data);
          // setSelectedWard(Number(response.data.data[0].id));
          // setValue("buyerWard", Number(response.data.data[0].id));
          // setInsuranceOrder((prevOrder) => ({
          //   ...prevOrder,
          //   wardId: Number(response.data.data[0].id),
          // }));
          setTemp(!temp);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedDistrict]);
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
  const handleDobChange = (event) => {
    const { value } = event.target;
    setDateValue(value);

    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      listInsuredPerson: prevOrder.listInsuredPerson.map((person, index) =>
        index === 0 ? { ...person, doB: formatDateString(value) } : person
      ),
    }));
  };
  // const convertToISODate = (date) => {
  //   const [day, month, year] = date.split('/');
  //   return `${year}-${month}-${day}`;
  // };
  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceId = parseInt(event.target.value);
    selectedProvince.current = provinceId;
    calculateSupportBudget(provinceId, watch("months"));
    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      listInsuredPerson: prevOrder.listInsuredPerson.map((person, index) =>
        index === 0 ? { ...person, insuranceProvinceId: provinceId } : person
      ),
    }));
    calculateFinalPrice();
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(parseInt(event.target.value, 10));
    setInsuranceOrder((prevOrder) => ({
      ...prevOrder,
      districtId: parseInt(event.target.value, 10),
    }));
    // setInsuranceOrder((prevOrder) => ({
    //   ...prevOrder,
    //   wardId: 0,
    // }));
  };

  const calculateSupportBudget = (provinceId: number, months: number) => {
    const budgetPerMonth = provinceId === 1001 ? 66000 : 33000;
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
    if (selectedProvince.current == 0) {
      toast.warn("Vui lòng chọn tỉnh thành nơi tham gia BHXH");
      return false;
    }
    if (!isValidEmptyString(citizenId)) {
      toast.warn("Số CCCD không được để trống");
      return false;
    } else if (citizenId.length > 12) {
      toast.warn("Số CCCD gồm 12 ký tự, vui lòng nhập lại");
      return false;
    }
    if (socialInsuranceId.length < 10 || socialInsuranceId.length > 15) {
      toast.warn("Số BHXH không hợp lệ");
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
    if (Number(wage.current) == 0 || Number(wage.current) < 1000000) {
      toast.warn("Mức lương không hợp lệ");
      return false;
    }
    if (Number(monthCount.current) == 0 || Number(monthCount.current) < 0) {
      toast.warn("Số tháng tham gia không hợp lệ");
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
    if (Number(selectedBuyerProvince) == 0) {
      toast.warn("Vui lòng chọn tỉnh thành");
      return false;
    }
    if (Number(selectedDistrict) == 0) {
      toast.warn("Vui lòng chọn quận huyện");
      return false;
    }
    if (Number(selectedWard) == 0) {
      toast.warn("Vui lòng chọn phường xã");
      return false;
    }
    if (isValidEmptyString(email)) {
      if (!isValidEmail(email)) {
        toast.warn("Email không hợp lệ");
        return false;
      }
    }
    if (!isValidEmptyString(addressDetail)) {
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
      console.log(insuranceOrder.id);
      if (insuranceOrder.id == 0) {
        AddInsuranceOrder();
      } else {
        UpdateInsuranceOrder();
      }
    }
  };
  const AddInsuranceOrder = async () => {
    const token = localStorage.token;
    // const formData = new FormData();
    //   formData.append("file", file);
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
      // return response.data.data[0];
      console.log(response.data);
      if (response.data.status == "201") {
        setInsuranceOrder((prevOrder) => ({
          ...prevOrder,
          id: response.data.data[0],
        }));
        navigate("/buill-pay/1");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const UpdateInsuranceOrder = async () => {
    const token = localStorage.token;
    // const formData = new FormData();
    //   formData.append("file", file);
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
      // return response.data.data[0];
      console.log(response.data);
      if (response.data.status == "200") {
        navigate("/buill-pay/1");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const formatDateToISO = (dateString: string): string => {
    // Tách ngày, tháng, năm từ chuỗi đầu vào
    const [day, month, year] = dateString.split("/").map(Number);

    // Tạo đối tượng Date từ các thành phần ngày, tháng, năm
    const date = new Date(year, month - 1, day);

    // Định dạng ngày theo định dạng yyyy-MM-dd
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };
  return (
    <>
      <HeaderBase isHome={false} title={"Đăng ký BHXH Tự nguyện"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 pt-[75px]"
      >
        <div className="p-4 mx-4 mt-4 bg-white rounded-xl border border-[#B9BDC1] flex flex-col gap-3">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Chụp ảnh giấy tờ tuỳ thân
          </h3>
          <div className="flex flex-row gap-2  justify-around w-[100%]">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                <div
                  className={`bg-[#F5F5F5]  rounded-lg p-[${
                    frontImageUrl ? "0px" : "9px"
                  }]  card-cccd w-[100%] h-[100px]`}
                  onClick={() => handleCardClick(frontImageInputRef)}
                >
                  <div className="icon-1">
                    {frontImageUrl ? (
                      <img
                        src={`https://baohiem.dion.vn${frontImageUrl}`}
                        alt="Mặt trước"
                        className="w-[140px] h-[100px] object-center rounded-lg"
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
              <div className="flex flex-col gap-2">
                <div
                  className={`bg-[#F5F5F5]  rounded-lg p-[${
                    backImageUrl ? "0px" : "9px"
                  }]  card-cccd w-[100%] h-[100px]`}
                  onClick={() => handleCardClick(backImageInputRef)}
                >
                  <div className="icon-1">
                    {backImageUrl ? (
                      <img
                        src={`https://baohiem.dion.vn${backImageUrl}`}
                        alt="Mặt sau"
                        className="w-[140px] h-[100px] object-center rounded-lg"
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
        <div className="p-4 mx-4 bg-white rounded-xl flex flex-col gap-6">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Thông tin người tham gia BHXH tự nguyện
          </h3>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Họ và tên <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="name"
              value={personName}
              {...register("name", { required: false })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <label className="block text-sm font-normal text-gray-900">
              Tỉnh thành nơi tham gia BHXH{" "}
              <samp className="text-red-600">*</samp>
            </label>
            <select
              id="insuranceProvince"
              value={selectedProvince.current}
              {...register("province", { required: false })}
              onChange={handleProvinceChange}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select-arrow`}
            >
              <option selected className="" value="0">
                Chọn tỉnh thành phố
              </option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Số CCCD <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="cccd"
              value={citizenId}
              {...register("cccd", { required: false })}
              maxLength={12}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <label className="block text-sm font-normal text-gray-900">
              Số BHXH
            </label>
            <input
              type="text"
              id="bhxh"
              {...register("bhxh", { required: false })}
              maxLength={15}
              value={socialInsuranceId}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <label className="block text-sm font-normal text-gray-900">
              Ngày sinh <samp className="text-red-600">*</samp>
            </label>
            <input
              type="date"
              id="dob"
              value={dateValue}
              onInput={handleDobChange}
              {...register("dob", { required: false })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Giới tính <samp className="text-red-600">*</samp>
            </label>
            <select
              id="gender"
              value={gender}
              {...register("gender", { required: false })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select-arrow"
              onChange={(e) => {
                setGender(e.target.value);
                setInsuranceOrder((prevOrder) => ({
                  ...prevOrder,
                  listInsuredPerson: prevOrder.listInsuredPerson.map(
                    (person, index) =>
                      index === 0
                        ? { ...person, gender: e.target.value }
                        : person
                  ),
                }));
              }}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Mức lương làm căn cứ đóng <samp className="text-red-600">*</samp>
            </label>
            <div className="relative">
              <input
                type="text"
                id="salary"
                {...register("salary", { required: false })}
                value={displayValue}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <label className="block text-sm font-normal text-gray-900">
              Số tháng đóng <samp className="text-red-600">*</samp>
            </label>
            <div className="relative">
              <input
                type="text"
                id="months"
                {...register("months", { required: false })}
                value={monthCount.current}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-[#0076B7] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập số tháng"
                onChange={(e) => {
                  let numberValue = e.target.value.replace(/\D/g, "");
                  if (e.target.value != "") {
                    // console.log(e.target.value);
                    monthCount.current = Number(numberValue);
                    setValue("months", numberValue);
                    calculateSupportBudget(
                      selectedProvince.current,
                      parseInt(numberValue, 10)
                    );
                    setInsuranceOrder((prevOrder) => ({
                      ...prevOrder,
                      listInsuredPerson: prevOrder.listInsuredPerson.map(
                        (person, index) =>
                          index === 0
                            ? {
                                ...person,
                                monthInsured: parseInt(numberValue),
                              }
                            : person
                      ),
                    }));
                  } else {
                    monthCount.current = 0;
                    setValue("months", 0);
                    calculateSupportBudget(
                      selectedProvince.current,
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
                              monthInsured: parseInt(e.target.value),
                            }
                          : person
                    ),
                  }));
                  calculateFinalPrice();
                }}
              />
              <div className="absolute inset-y-0 start-[83%] top-0 flex items-center pointer-events-none">
                <p className="text-base font-normal text-[#767A7F]">tháng</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-normal text-gray-900">
              Ngân sách hỗ trợ
            </label>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={supportBudget.toLocaleString("vi-VN")}
                readOnly
              />
              <div className="absolute inset-y-0 start-[83%] top-0 flex items-center pointer-events-none">
                <p className="text-base font-normal text-[#767A7F]">vnđ</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 mx-4 bg-white rounded-xl flex flex-col gap-6">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Thông tin người mua
          </h3>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Số điện thoại <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              {...register("phone", { required: false })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Số điện thoại"
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
            <label className="block text-sm font-normal text-gray-900">
              Họ và tên <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="name"
              value={buyerName}
              {...register("buyerName", { required: false })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <label className="block text-sm font-normal text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: false })}
              value={email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <label className="block text-sm font-normal text-gray-900">
              Tỉnh thành <samp className="text-red-600">*</samp>
            </label>
            <select
              value={selectedBuyerProvince}
              {...register("buyerProvince", { required: false })}
              onChange={(e) => {
                let provinceId: number = Number(e.target.value);
                if (provinceId == 0) {
                  setDistricts([]);
                  setWards([]);
                }
                setSelectedBuyerProvince(provinceId);
                setInsuranceOrder((prevOrder) => ({
                  ...prevOrder,
                  provinceId: provinceId,
                }));
                // setInsuranceOrder((prevOrder) => ({
                //   ...prevOrder,
                //   districtId: 0,
                // }));
                // setInsuranceOrder((prevOrder) => ({
                //   ...prevOrder,
                //   wardId: 0,
                // }));
                setSelectedWard(0);
                setSelectedDistrict(0);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select-arrow"
            >
              <option selected className="" value="0">
                Chọn tỉnh thành phố
              </option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Quận huyện <samp className="text-red-600">*</samp>
            </label>
            <select
              value={selectedDistrict}
              {...register("buyerDistrict", { required: false })}
              onChange={handleDistrictChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select-arrow"
            >
              <option selected className="" value="0">
                Chọn quận huyện
              </option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Phường xã <samp className="text-red-600">*</samp>
            </label>
            <select
              {...register("buyerWard", { required: false })}
              value={selectedWard}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select-arrow"
              onChange={(e) => {
                {
                  setSelectedWard(parseInt(e.target.value));
                  setInsuranceOrder((prevOrder) => ({
                    ...prevOrder,
                    wardId: parseInt(e.target.value, 10),
                  }));
                }
              }}
            >
              <option selected className="" value="0">
                Chọn phường xã
              </option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Địa chỉ cụ thể <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: false })}
              value={addressDetail}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="VD: Số nhà, số đường,...."
              onChange={(e) => {
                setAddressDetail(e.target.value);
                setInsuranceOrder((prevOrder) => ({
                  ...prevOrder,
                  addressDetail: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <div className="flex mx-4 flex-col gap-2 pb-4">
          {/* <div>
            <p className="text-sm font-normal text-[#000]">
              Thông tin BHXH sẽ được cập nhật trên ứng dụng{" "}
              <strong className="text-[#0076B7] font-bold">VSSID </strong>
              trong 15 ngày làm việc.
            </p>
          </div> */}
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
        {/* <FooterPayPage h={""} w={""} url={"/buill-pay/1"} /> */}
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
              {/* <Link
                to={"/buill-pay/1"}
                className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
              >
                Tiếp tục  
              </Link> */}
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
    </>
  );
};

export default RegisterBHXH;
