import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Province, District, Ward } from "../models";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HeaderBase from "../components/headerBase";
import {
  isValidEmail,
  isValidEmptyString,
  isValidPhone,
} from "../utils/validateString";
import { Modal } from "zmp-ui";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import imageQR from "../../assets-src/icon_qr.png";
import { FadeLoader } from "react-spinners";
const UpdateBHXH: React.FunctionComponent = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isUploadingPhotoCitizenFont, setIsUploadingPhotoCitizenFont] =
    useState(false);
  const [isUploadingPhotoCitizenBack, setIsUploadingPhotoCitizenBack] =
    useState(false);

  const [orderDetail, setOrderDetail] = useState<any>();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedBuyerProvince, setSelectedBuyerProvince] = useState<number>();
  const [selectedDistrict, setSelectedDistrict] = useState<number>();
  const [selectedWard, setSelectedWard] = useState<number>();
  const provinceId = useRef(0);
  const districtId = useRef(0);
  const wardId = useRef(0);
  const selectedProvince = useRef<number>();
  const [supportBudget, setSupportBudget] = useState<number>(0);
  const wage = useRef<number>(0);
  const monthCount = useRef<number>(0);
  const [frontImageUrl, setFrontImageUrl] = useState<string>("");
  const [backImageUrl, setBackImageUrl] = useState<string>("");
  const [dateValue, setDateValue] = useState("");
  const finalPrice = useRef(0);
  const { register, handleSubmit, watch, setValue } = useForm();
  const frontImageInputRef = useRef<HTMLInputElement>(null);
  const backImageInputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState("");
  const [temp, setTemp] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowModelQR, setIsShowModelQR] = useState<boolean>(false);
  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/insuranceorder/api/Detail-By-VM/" + id)
      .then((response) => {
        console.log(response.data.data[0]);
        setOrderDetail(response.data.data[0]);
        setDisplayValue(
          response.data.data[0].listInsuredPerson[0].wage.toLocaleString(
            "vi-VN"
          )
        );
        wage.current = response.data.data[0].listInsuredPerson[0].wage;
        monthCount.current =
          response.data.data[0].listInsuredPerson[0].monthInsured;
        provinceId.current = response.data.data[0].provinceId;
        districtId.current = response.data.data[0].districtId;
        wardId.current = response.data.data[0].wardId;
        selectedProvince.current =
          response.data.data[0].listInsuredPerson[0].insuranceProvinceId;
        setSelectedBuyerProvince(response.data.data[0].provinceId);
        setSelectedDistrict(response.data.data[0].districtId);
        axios
          .get(
            `https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${response.data.data[0].districtId}`
          )
          .then((response) => {
            setWards(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
        setSelectedWard(response.data.data[0].wardId);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/province/api/list")
      .then((response) => {
        setProvinces(response.data.data);
        setDistricts([]);
        setWards([]);
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
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedDistrict]);

  function handleInputChange(field: string, value: any) {
    setOrderDetail((prevDetail) => ({
      ...prevDetail,
      [field]: value,
    }));
  }

  function handleInsuredPersonChange(field: string, value: any) {
    setOrderDetail((prevDetail) => ({
      ...prevDetail,
      listInsuredPerson: [
        {
          ...prevDetail.listInsuredPerson[0],
          [field]: value,
        },
      ],
    }));
  }

  function formatDateString(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    let day: number | string = date.getDate();
    let month: number | string = date.getMonth() + 1;
    const year: number = date.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return `${day}/${month}/${year}`;
  }
  const handleUpdateFrontImage = (url) => {
    setFrontImageUrl(url);
    setOrderDetail((prevState) => ({
      ...prevState,
      photoCitizenFront: url,
    }));
    setOrderDetail((prevState) => ({
      // Sao chép đối tượng hiện tại
      // const updatedOrderDetail = { ...prevState };
      // // Sao chép mảng listInsuredPerson và cập nhật phần tử đầu tiên
      // updatedOrderDetail.listInsuredPerson = [
      //   {
      //     ...prevState.listInsuredPerson[0],
      //     photoCitizenBack: url,
      //   },
      // ];
      // return updatedOrderDetail;
      ...prevState,
      ...(prevState.listInsuredPerson[0].photoCitizenFront = url),
    }));
    setIsUploadingPhotoCitizenFont(false);
  };
  const handleUpdateBackImage = (url) => {
    setBackImageUrl(url);
    setOrderDetail((prevState) => ({
      ...prevState,
      photoCitizenBack: url,
    }));
    setOrderDetail((prevState) => ({
      // Sao chép đối tượng hiện tại
      // const updatedOrderDetail = { ...prevState };
      // // Sao chép mảng listInsuredPerson và cập nhật phần tử đầu tiên
      // updatedOrderDetail.listInsuredPerson = [
      //   {
      //     ...prevState.listInsuredPerson[0],
      //     photoCitizenBack: url,
      //   },
      // ];
      // return updatedOrderDetail;
      ...prevState,
      ...(prevState.listInsuredPerson[0].photoCitizenBack = url),
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
  const calculateFinalPrice = () => {
    const budgetPerMonth = selectedProvince.current === 1001 ? 66000 : 33000;
    if (wage.current != 0 && monthCount.current != 0) {
      finalPrice.current =
        (wage.current * 0.22 - budgetPerMonth) * monthCount.current;
      // console.log(finalPrice.current);
      setOrderDetail((prevDetail) => ({
        ...prevDetail,
        finalPrice: finalPrice.current,
      }));
      setTemp(!temp);
    } else {
      finalPrice.current = 0;
      setOrderDetail((prevDetail) => ({
        ...prevDetail,
        finalPrice: 0,
      }));
      setTemp(!temp);
    }
  };

  const handleDobChange = (event) => {
    const { value } = event.target;
    setDateValue(value);
    handleInsuredPersonChange("doB", value);
  };

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceId = parseInt(event.target.value, 10);
    selectedProvince.current = provinceId;
    calculateSupportBudget(provinceId, monthCount.current);
    calculateFinalPrice();
    handleInsuredPersonChange("insuranceProvinceId", provinceId);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let districtId = Number(event.target.value);
    if (districtId == 0) {
      setWards([]);
    }
    handleInputChange("wardId", 0);
    setSelectedDistrict(districtId);
    handleInputChange("districtId", districtId);
  };

  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let wardId = Number(event.target.value);

    setSelectedWard(wardId);
    handleInputChange("wardId", wardId);
  };

  const calculateSupportBudget = (provinceId: number, months: number) => {
    const budgetPerMonth = provinceId === 1001 ? 66000 : 33000;
    setSupportBudget(budgetPerMonth * months);
    setOrderDetail((prevDetail) => ({
      ...prevDetail,
      listInsuredPerson: [
        {
          ...prevDetail.listInsuredPerson[0],
          supportBudget: budgetPerMonth * months,
        },
      ],
    }));
  };
  const validate = () => {
    if (
      !isValidEmptyString(orderDetail.photoCitizenFront) ||
      !isValidEmptyString(orderDetail.photoCitizenBack)
    ) {
      toast.warn("Ảnh giấy tờ tùy thân không được để trống");
      return false;
    }
    if (!isValidEmptyString(orderDetail.listInsuredPerson[0].fullName)) {
      toast.warn("Họ và tên người tham gia không được để trống");
      return false;
    }
    if (
      !isValidEmptyString(orderDetail.listInsuredPerson[0].citizenId.trim())
    ) {
      toast.warn("Số CCCD không được để trống");
      return false;
    } else if (orderDetail.listInsuredPerson[0].citizenId.trim().length != 12) {
      toast.warn("Số CCCD gồm 12 ký tự, vui lòng nhập lại");
      return false;
    }
    if (
      !(
        orderDetail.listInsuredPerson[0].socialInsuranceNumber.trim().length ==
          0 ||
        orderDetail.listInsuredPerson[0].socialInsuranceNumber.trim().length ==
          10 ||
        orderDetail.listInsuredPerson[0].socialInsuranceNumber.trim().length ==
          15
      )
    ) {
      toast.warn("Số BHXH không hợp lệ");
      return false;
    }
    if (!isValidEmptyString(orderDetail.listInsuredPerson[0].doB)) {
      toast.warn("Ngày sinh không được để trống");
      return false;
    }
    if (!isValidEmptyString(orderDetail.listInsuredPerson[0].gender)) {
      toast.warn("Giới tính không được để trống");
      return false;
    }
    if (Number(orderDetail.listInsuredPerson[0].wage) < 1000000) {
      toast.warn("Mức lương không hợp lệ");
      return false;
    }
    if (Number(orderDetail.listInsuredPerson[0].monthInsured) <= 0) {
      toast.warn("Số tháng tham gia không hợp lệ");
      return false;
    }
    if (!isValidPhone(orderDetail.phone.trim())) {
      toast.warn("Số điện thoại không hợp lệ");
      return false;
    }
    if (!isValidEmptyString(orderDetail.fullName.trim())) {
      toast.warn("Họ và tên người mua không được để trống");
      return false;
    }
    if (Number(orderDetail.provinceId) == 0) {
      toast.warn("Vui lòng chọn tỉnh thành");
      return false;
    }
    if (Number(orderDetail.districtId) == 0) {
      toast.warn("Vui lòng chọn quận huyện");
      return false;
    }
    if (Number(orderDetail.wardId) == 0) {
      toast.warn("Vui lòng chọn phường xã");
      return false;
    }
    if (isValidEmptyString(orderDetail.email.trim())) {
      if (!isValidEmail(orderDetail.email.trim())) {
        toast.warn("Email không hợp lệ");
        return false;
      }
    }
    if (!isValidEmptyString(orderDetail.addressDetail.trim())) {
      toast.warn("Địa chỉ cụ thể không được để trống");
      return false;
    }
    if (!isChecked) {
      toast.warn("Vui lòng xác nhận đã đọc chính sách và điều khoản");
      return false;
    }
    return true;
  };

  const onSubmit = (data: any) => {
    if (validate()) {
      setLoading(true);
      //UpdateInsuranceOrder();
      const updateOrder = {
        id: Number(orderDetail.id),
        insuranceId: Number(orderDetail.insuranceId),
        accountId: Number(orderDetail.accountId),
        citizenId: orderDetail.citizenId.trim(),
        photoCitizenFront: orderDetail.photoCitizenFront,
        photoCitizenBack: orderDetail.photoCitizenBack,
        phone: orderDetail.phone.trim(),
        fullName: orderDetail.fullName.trim(),
        email: orderDetail.email.trim(),
        provinceId: Number(orderDetail.provinceId),
        districtId: Number(orderDetail.districtId),
        wardId: Number(orderDetail.wardId),
        finalPrice: Number(orderDetail.finalPrice),
        addressDetail: orderDetail.addressDetail.trim(),
        listInsuredPerson: orderDetail.listInsuredPerson.map((person) => ({
          id: person.id,
          insuranceProvinceId: Number(person.insuranceProvinceId),
          socialInsuranceNumber: person.socialInsuranceNumber.trim(),
          citizenId: person.citizenId.trim(),
          photoCitizenFront: person.photoCitizenFront,
          photoCitizenBack: person.photoCitizenBack,
          fullName: person.fullName.trim(),
          doB: formatDateString(person.doB),
          gender: person.gender,
          supportBudget: Number(person.supportBudget),
          wage: Number(person.wage),
          monthInsured: Number(person.monthInsured),
        })),
      };

      UpdateInsuranceOrder(updateOrder);
    }
  };

  const UpdateInsuranceOrder = async (updateOrder) => {
    const token = localStorage.token;
    try {
      const response = await axios.post(
        "https://baohiem.dion.vn/insuranceorder/api/update-order",
        updateOrder,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status == "200") {
        setLoading(false);
        toast.success("Cập nhật đơn đăng ký BHXH thành công!");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        setLoading(false);
        toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const formatDateToISO = (dateString: string): string => {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  function formatDate(input: string): string {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // useEffect(() => {
  //   if (orderDetail) {
  //     setSelectedBuyerProvince(orderDetail.provinceId);
  //     setSelectedDistrict(orderDetail.districtId);
  //     setSelectedWard(orderDetail.wardId);
  //   }
  // }, [orderDetail]);

  if (!orderDetail) {
    return;
  }
  // const calculateFinalPrice = () => {
  //   const budgetPerMonth = selectedProvince.current === 1001 ? 66000 : 33000;
  //   if (wage.current != 0 && monthCount.current != 0) {
  //     finalPrice.current =
  //       (wage.current * 0.22 - budgetPerMonth) * monthCount.current;
  //     setInsuranceOrder((prevOrder) => ({
  //       ...prevOrder,
  //       finalPrice: finalPrice.current,
  //     }));
  //     setTemp(!temp);
  //   } else {
  //     finalPrice.current = 0;
  //     setInsuranceOrder((prevOrder) => ({
  //       ...prevOrder,
  //       finalPrice: finalPrice.current,
  //     }));
  //     setTemp(!temp);
  //   }
  // };
  return (
    <>
      <HeaderBase isHome={false} title={"Đăng ký BHXH Tự nguyện"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 pt-[75px]"
      >
        <div className="p-4 mx-4 mt-4 bg-white rounded-xl border border-[#B9BDC1] flex flex-col gap-3">
          {/* <h3 className="text-[#0076B7] text-lg font-medium">
            Chụp ảnh giấy tờ tuỳ thân
          </h3> */}
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
                  onError={(error) => {}}
                  components={{
                    zoom: true,
                    torch: false,
                    tracker: (
                      detectedCodes: IDetectedBarcode[],
                      ctx: CanvasRenderingContext2D
                    ) => {},
                  }}
                  onScan={(data) => {
                    const info = data[0]["rawValue"];
                    const words = info.split("|");

                    setIsShowModelQR(false);
                    handleInsuredPersonChange("citizenId", words[0]);
                    handleInsuredPersonChange("fullName", words[2]);
                    const dob = words[3];
                    const day = dob.substring(0, 2);
                    const month = dob.substring(2, 4);
                    const year = dob.substring(4, 8);

                    // set năm sinh
                    setDateValue(`${year}-${month}-${day}`);

                    handleInsuredPersonChange("doB", `${year}-${month}-${day}`);

                    handleInsuredPersonChange("gender", words[4]);
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
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                <div
                  className={`bg-[#F5F5F5]  rounded-lg p-[${
                    frontImageUrl ? "0px" : "0px"
                  }]  card-cccd w-[100%] h-[100px]`}
                  onClick={() => handleCardClick(frontImageInputRef)}
                >
                  <div className="icon-1">
                    {orderDetail ? (
                      <img
                        src={`https://baohiem.dion.vn${orderDetail.photoCitizenFront}`}
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
                    {orderDetail ? (
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
                    handleImageUpload(event, handleUpdateFrontImage);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div
                  className={`bg-[#F5F5F5]  rounded-lg p-[${
                    backImageUrl ? "0px" : "0px"
                  }]  card-cccd w-[100%] h-[100px]`}
                  onClick={() => handleCardClick(backImageInputRef)}
                >
                  <div className="icon-1">
                    {orderDetail ? (
                      <img
                        src={`https://baohiem.dion.vn${orderDetail.photoCitizenBack}`}
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
                    {orderDetail ? (
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
                    handleImageUpload(event, handleUpdateBackImage);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 mx-4 bg-white rounded-xl flex flex-col gap-6">
          <div className="flex justify-between">
            <h3 className="text-[#0076B7] text-lg font-medium">
              Thông tin người tham gia BHXH tự nguyện
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
            <label className="block text-sm font-normal text-gray-900">
              Họ và tên <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="name"
              value={orderDetail.listInsuredPerson[0].fullName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập tên của bạn"
              onChange={(e) =>
                handleInsuredPersonChange("fullName", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Tỉnh thành nơi tham gia BHXH{" "}
              <samp className="text-red-600">*</samp>
            </label>
            <select
              id="insuranceProvince"
              value={orderDetail.listInsuredPerson[0].insuranceProvinceId}
              onChange={handleProvinceChange}
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
              Số CCCD <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="cccd"
              value={orderDetail.listInsuredPerson[0].citizenId.trim()}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập số CCCD"
              maxLength={12}
              onChange={(e) => {
                const filteredValue = e.target.value.replace(/\D/g, "");
                handleInsuredPersonChange("citizenId", filteredValue);
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
              maxLength={15}
              value={orderDetail.listInsuredPerson[0].socialInsuranceNumber.trim()}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập số Bảo hiểm Xã hội"
              onChange={(e) =>
                handleInsuredPersonChange(
                  "socialInsuranceNumber",
                  e.target.value
                )
              }
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Ngày sinh <samp className="text-red-600">*</samp>
            </label>
            <input
              type="date"
              id="dob"
              value={formatDate(orderDetail.listInsuredPerson[0].doB)}
              onInput={handleDobChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Giới tính <samp className="text-red-600">*</samp>
            </label>
            <select
              id="gender"
              value={orderDetail.listInsuredPerson[0].gender}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select-arrow"
              onChange={(e) =>
                handleInsuredPersonChange("gender", e.target.value)
              }
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
                value={displayValue}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập mức lương"
                onChange={(e) => {
                  let rawValue = e.target.value.replace(/\D/g, "");
                  let numericValue = rawValue !== "" ? Number(rawValue) : 0;
                  wage.current = numericValue;
                  setDisplayValue(numericValue.toLocaleString("vi-VN"));
                  handleInsuredPersonChange("wage", numericValue);
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
                value={orderDetail.listInsuredPerson[0].monthInsured}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-[#0076B7] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập số tháng"
                onChange={(e) => {
                  let numberValue = e.target.value.replace(/\D/g, "");
                  if (e.target.value != "") {
                    monthCount.current = Number(numberValue);
                    setValue("months", numberValue);
                    calculateSupportBudget(
                      selectedProvince.current,
                      parseInt(numberValue, 10)
                    );
                  } else {
                    monthCount.current = 0;
                    setValue("months", 0);
                    calculateSupportBudget(
                      selectedProvince.current,
                      parseInt("1", 10)
                    );
                  }
                  handleInsuredPersonChange("monthInsured", numberValue);
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
                value={orderDetail.listInsuredPerson[0].supportBudget.toLocaleString(
                  "vi-VN"
                )}
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
              value={orderDetail.phone.trim()}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Số điện thoại"
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Họ và tên <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="name"
              value={orderDetail.fullName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập tên của bạn"
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={orderDetail.email.trim()}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập email của bạn"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Tỉnh thành <samp className="text-red-600">*</samp>
            </label>
            <select
              value={orderDetail.provinceId}
              onChange={(e) => {
                let provinceId: number = Number(e.target.value);
                if (provinceId == 0) {
                  setDistricts([]);
                  setWards([]);
                }
                setSelectedBuyerProvince(provinceId);
                handleInputChange("provinceId", provinceId);
                handleInputChange("wardId", 0);
                handleInputChange("districtId", 0);
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
              value={selectedWard}
              onChange={handleWardChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select-arrow"
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
              value={orderDetail.addressDetail}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="VD: Số nhà, số đường,...."
              onChange={(e) =>
                handleInputChange("addressDetail", e.target.value)
              }
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
        <div className="page-2 bg-white">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row content-center justify-between">
              <p className="block text-sm font-normal text-gray-900">
                Tổng thanh toán:
              </p>
              <h3 className="text-base font-medium text-[#0076B7]">
                {orderDetail.finalPrice > 0
                  ? orderDetail.finalPrice.toLocaleString("vi-VN")
                  : 0}{" "}
                VND
              </h3>
            </div>
            <div className="flex flex-row content-center justify-center items-center">
              <button
                className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
                type="submit"
              >
                Gửi lại thông tin
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

export default UpdateBHXH;
