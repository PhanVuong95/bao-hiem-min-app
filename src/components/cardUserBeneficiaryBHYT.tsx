import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { registerInfoBHYT } from "../pages/BHYT/list_health_insurance";
import { listEthnics } from "../utils/constants";
import { formatDate, formatMoneyVND, formatTimeSql, isValidCitizenId, isValidEmptyString, isValidHealthInsuranceNumber, isValidSocialInsuranceNumber } from "../utils/validateString";

interface Props {
  price: number,
  index: number,
  onClose: (index: number) => void;
  refs: any
  provinces: any
}

const UserBeneficiaryBHYTPage = (props: Props) => {
  const { index, price, onClose, refs, provinces } = props;

  const [socialInsuranceNumber, setSocialInsuranceNumber] = useState(registerInfoBHYT["listInsuredPerson"][index].socialInsuranceNumber);
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState(registerInfoBHYT["listInsuredPerson"][index].healthInsuranceNumber);
  const [errors, setErrors] = useState<any>({});
  const [citizenId, setCitizenId] = useState(registerInfoBHYT["listInsuredPerson"][index].citizenId);
  const [photoCitizenFront, setPhotoCitizenFront] = useState(registerInfoBHYT["listInsuredPerson"][index].photoCitizenFront);
  const [photoCitizenBack, setPhotoCitizenBack] = useState(registerInfoBHYT["listInsuredPerson"][index].photoCitizenBack);
  const [fullName, setFullName] = useState(registerInfoBHYT["listInsuredPerson"][index].fullName);
  const [dob, setDob] = useState(
    registerInfoBHYT["listInsuredPerson"][index].doB == "" ?
      "" :
      formatTimeSql(registerInfoBHYT["listInsuredPerson"][index].doB)
  );

  const [gender, setGender] = useState(registerInfoBHYT["listInsuredPerson"][index].gender);
  const [ethnic, setEthnic] = useState(registerInfoBHYT["listInsuredPerson"][index].ethnic);
  const [oldCardStartDate, setOldCardStartDate] = useState(
    registerInfoBHYT["listInsuredPerson"][index].oldCardStartDate == "" ?
      "" :
      formatTimeSql(registerInfoBHYT["listInsuredPerson"][index].oldCardStartDate)
  );
  const [oldCardEndDate, setOldCardEndDate] = useState(
    registerInfoBHYT["listInsuredPerson"][index].oldCardEndDate == "" ? "" :
      formatTimeSql(registerInfoBHYT["listInsuredPerson"][index].oldCardEndDate)
  );
  const [newCardEndDate, setNewCardEndDate] = useState(
    registerInfoBHYT["listInsuredPerson"][index].newCardEndDate == "" ? "" :
      formatTimeSql(registerInfoBHYT["listInsuredPerson"][index].newCardEndDate)
  );
  const [newCardStartDate, setNewCardStartDate] = useState(
    registerInfoBHYT["listInsuredPerson"][index].newCardStartDate == "" ? "" :
      formatTimeSql(registerInfoBHYT["listInsuredPerson"][index].newCardStartDate)
  );
  const frontImageInputRef = useRef<HTMLInputElement>(null);
  const backImageInputRef = useRef<HTMLInputElement>(null);
  const [medicalProvinceId, setMedicalProvinceId] = useState(registerInfoBHYT["listInsuredPerson"][index].medicalProvinceId.toString());
  const [hospitalId, setHospitalId] = useState(registerInfoBHYT["listInsuredPerson"][index].hospitalId.toString());
  const [listHospitals, setListHospitals] = useState<any>([])

  const [currentDate, setCurrentDate] = useState(new Date());

  console.log();


  const calculatePrice = () => {
    switch (index) {
      case 0:
        return `${formatMoneyVND(price)} đ`
      case 1:
        return `${formatMoneyVND(price * 0.7)} đ`
      case 2:
        return `${formatMoneyVND(price * 0.6)} đ`
      case 3:
        return `${formatMoneyVND(price * 0.5)} đ`
      case 4:
        return `${formatMoneyVND(price * 0.4)} đ`
      default:
        return `${formatMoneyVND(price * 0.4)} đ`
    }
  }

  useEffect(() => {
    setListHospitals([])
    if (medicalProvinceId != "0") {
      axios
        .get(
          `https://baohiem.dion.vn/hospital/api/list-hospital-by-provinceId?provinceId=${medicalProvinceId}`
        ).then((response) => {
          setListHospitals(response.data.data);
        })
        .catch((error) => {
          setListHospitals([])
          console.error(error);
        });
    }
  }, [medicalProvinceId])

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
      }
    }
  };

  const updateBackCitizenPhoto = (img) => {
    setPhotoCitizenBack(img);
    registerInfoBHYT["listInsuredPerson"][index].photoCitizenBack = img;
  };

  const updateFrontCitizenPhoto = (img) => {
    setPhotoCitizenFront(img);
    registerInfoBHYT["listInsuredPerson"][index].photoCitizenFront = img;
  }

  const handleCardClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };


  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between">
        <h3 className="text-[#0076B7] text-lg font-medium">
          Thông tin người được bảo hiểm {index + 1}
        </h3>
        {index != 0 ?
          <button type="button"
            onClick={() => {
              onClose(index);
            }}
          >
            <img src="../../assets-src/close_1.png" className="w-3 h-3" />
          </button>
          :
          null
        }
      </div>
    )
  }

  const renderPrice = () => {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-sm font-normal text-gray-900">Phí bảo hiểm</p>
        <span className="text-base font-semibold text-[#0076B7]">
          {calculatePrice()}
        </span>
        <ul className="list-disc px-4">
          <li>
            <p className="text-sm font-normal">
              Vui lòng nhập số BHXH để tra cứu thông tin
            </p>
          </li>
          <li>
            <p className="text-sm font-normal">
              Tra cứu mã số BHXH bằng thông tin khai sinh{" "}
              <span className="text-[#0076B7] font-semibold underline">
                tại đây
              </span>
            </p>
          </li>
        </ul>
      </div>
    )
  }

  const renderInputsocialInsuranceNumber = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Số BHXH
        </label>
        <div className="relative">
          <input
            type="text"
            id="socialInsuranceNumber"
            value={socialInsuranceNumber}
            ref={refs.socialInsuranceNumber}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value;

              setSocialInsuranceNumber(value);
              registerInfoBHYT["listInsuredPerson"][index].socialInsuranceNumber = value;

              if (value.length > 0) {
                if (!isValidSocialInsuranceNumber(value)) {
                  setErrors({ ...errors, ...{ "socialInsuranceNumber": "Số BHXH không hợp lệ" } })
                } else {
                  setErrors({ ...errors, ...{ "socialInsuranceNumber": null } })
                }
              } else {
                setErrors({ ...errors, ...{ "socialInsuranceNumber": null } })
              }
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập số BHYT"
            required
          />
          <div className="absolute inset-y-0 start-[79%] top-0 flex items-center pointer-events-none">
            <p className="text-base font-normal text-[#0076B7]">Tra cứu</p>
          </div>
        </div>
        {errors.socialInsuranceNumber && <div className="mt-2 text-red-500">{errors.socialInsuranceNumber}</div>}
      </div>
    )
  }

  const renderLine = () => {
    return (
      <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>
    )
  }

  const renderNote = () => {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-sm font-normal text-gray-900">
          Trường hợp không có số BHXH vui lòng
        </p>
        <ul className="list-disc px-4">
          <li>
            <p className="text-sm font-normal">
              Điền số CCCD và Đính kèm ảnh CCCD
            </p>
          </li>
        </ul>
      </div>
    )
  }

  const renderCitizenId = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Số CCCD <samp className="text-red-600">*</samp>
        </label>
        <input
          type="text"
          id="name"
          ref={refs.citizenId}
          maxLength={12}
          value={citizenId}
          onChange={(e) => {
            const value = e.target.value;

            setCitizenId(value);
            registerInfoBHYT["listInsuredPerson"][index].citizenId = value;

            if (value.length > 0) {
              if (!isValidCitizenId(value)) {
                setErrors({ ...errors, ...{ "citizenId": "Số căn cước công dân không hợp lệ" } })
              } else {
                setErrors({ ...errors, ...{ "citizenId": null } })
              }
            } else {
              setErrors({ ...errors, ...{ "citizenId": null } })
            }
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập số CCCD"
          required
        />
        {errors.citizenId && <div className="mt-2 text-red-500">{errors.citizenId}</div>}
      </div>
    )
  }

  const renderUploadImages = () => {
    return (
      <div className="p-4 bg-white rounded-xl border border-[#B9BDC1] flex flex-col gap-3">
        <h3 className="text-[#0076B7] text-lg font-medium">Tải ảnh CCCD</h3>
        <div className="flex flex-row gap-2 ">
          <div ref={refs.photoCitizenFront} className="flex flex-row gap-2">
            <div className="flex flex-col gap-2 " onClick={() => handleCardClick(frontImageInputRef)}>
              <div className="bg-[#F5F5F5]  rounded-lg p-[9px] card-cccd">
                <div className="icon-1">
                  {photoCitizenFront ? (
                    <img
                      src={`https://baohiem.dion.vn${photoCitizenFront}`}
                      alt="Mặt trước"
                    />
                  ) :
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={'118px'}
                      height={'81px'}
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
                  }
                </div>
                <div className="icon-2">
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
                </div>
              </div>
              <h4 className="text-[15px] text-black text-center">Mặt trước</h4>
              <input
                type="file"
                accept="image/*"
                ref={frontImageInputRef}
                style={{ display: "none" }}
                onChange={(event) =>
                  handleImageUpload(event, updateFrontCitizenPhoto)
                }
              />
            </div>

            <div ref={refs.photoCitizenBack} className="flex flex-col gap-2 " onClick={() => handleCardClick(backImageInputRef)}>
              <div className="flex flex-col gap-2">
                <div className="bg-[#F5F5F5]  rounded-lg p-[9px] card-cccd">
                  <div className="icon-1">
                    {photoCitizenBack ? (
                      <img
                        src={`https://baohiem.dion.vn${photoCitizenBack}`}
                        alt="Mặt sau"
                        width="100%"
                        height="100%"
                      />
                    ) :
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={'118px'}
                        height={'81px'}
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
                    }
                  </div>
                  <div className="icon-2">
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
                  </div>
                </div>

                <h4 className="text-[15px] text-black text-center">Mặt sau</h4>
                <input
                  type="file"
                  accept="image/*"
                  ref={backImageInputRef}
                  style={{ display: "none" }}
                  onChange={(event) =>
                    handleImageUpload(event, updateBackCitizenPhoto)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderFullName = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <input
          type="text"
          ref={refs.fullName}
          value={fullName}
          onChange={(e) => {
            const value = e.target.value;

            setFullName(value);
            registerInfoBHYT["listInsuredPerson"][index].fullName = value;

            if (e.target.value == "") {
              setErrors({ ...errors, ...{ "fullName": "Họ và tên không được để trống" } })
            } else {
              setErrors({ ...errors, ...{ "fullName": "" } })
            }
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập tên của bạn"
          required
        />
        {errors.fullName && <div className="mt-2 text-red-500">{errors.fullName}</div>}
      </div>
    )
  }

  const renderInputBHYT = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Mã BHYT cũ <samp className="text-red-600">*</samp>
        </label>
        <input
          type="text"
          maxLength={15}
          ref={refs.healthInsuranceNumber}
          value={healthInsuranceNumber}
          onChange={(e) => {
            const value = e.target.value;

            setHealthInsuranceNumber(value);
            registerInfoBHYT["listInsuredPerson"][index].healthInsuranceNumber = value;

            if (value.length > 0) {
              if (!isValidHealthInsuranceNumber(value)) {
                setErrors({ ...errors, ...{ "healthInsuranceNumber": "Mã BHYT không hợp lệ" } })
              } else {
                setErrors({ ...errors, ...{ "healthInsuranceNumber": null } })
              }
            } else {
              setErrors({ ...errors, ...{ "healthInsuranceNumber": null } })
            }
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="---"
          required
        />
        {errors.healthInsuranceNumber && <div className="mt-2 text-red-500">{errors.healthInsuranceNumber}</div>}
      </div>
    )
  }

  const renderDob = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Ngày sinh <samp className="text-red-600">*</samp>
        </label>
        <input
          type="date"
          ref={refs.dob}
          value={dob}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            const value = e.target.value;

            setDob(value)

            registerInfoBHYT["listInsuredPerson"][index].doB = formatDate(value);

          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Chọn ngày sinh"
          required
        />
        {errors.dob && <div className="mt-2 text-red-500">{errors.dob}</div>}
      </div>
    )
  }

  const renderGender = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Giới tính <samp className="text-red-600">*</samp>
        </label>
        <select
          ref={refs.gender}
          value={gender}
          onChange={(e) => {
            const value = e.target.value;
            setGender(value);

            registerInfoBHYT["listInsuredPerson"][index].gender = value;

          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected>Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
        {errors.gender && <div className="mt-2 text-red-500">{errors.gender}</div>}
      </div>
    )
  }

  const renderEthnic = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Đân tộc <samp className="text-red-600">*</samp>
        </label>
        <select
          ref={refs.ethnic}
          value={ethnic}
          onChange={(e) => {
            const value = e.target.value;

            setEthnic(value);

            registerInfoBHYT["listInsuredPerson"][index].ethnic = value;

          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected>Chọn dân tộc</option>
          {listEthnics.map((item) => <option value={`${item?.name}`}>{item?.name}</option>)}

        </select>
        {errors.ethnic && <div className="mt-2 text-red-500">{errors.ethnic}</div>}
      </div>
    )
  }

  const renderBoxOldCard = () => {
    return (
      <div className="flex flex-col">
        <h3 className="text-base font-semibold text-[#0076B7] pb-[24px]">
          Thẻ cũ
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hiệu lực <samp className="text-red-600">*</samp>
            </label>
            <input
              type="date"
              ref={refs.oldCardStartDate}
              value={oldCardStartDate}
              onChange={(e) => {
                const value = e.target.value;

                setOldCardStartDate(value);

                registerInfoBHYT["listInsuredPerson"][index].oldCardStartDate = formatDate(value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Chọn ngày sinh"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hết hiệu lực <samp className="text-red-600">*</samp>
            </label>
            <input
              type="date"
              id="oldCardEndDate"
              ref={refs.oldCardEndDate}
              value={oldCardEndDate}
              onChange={(e) => {
                const value = e.target.value;

                setOldCardEndDate(value)

                registerInfoBHYT["listInsuredPerson"][index].oldCardEndDate = formatDate(value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Chọn ngày sinh"
              required
            />
          </div>
        </div>

        {errors.boxOldCard && <div className="mt-2 text-red-500">{errors.boxOldCard}</div>}
      </div>

    )
  }

  const renderBoxNewCard = () => {
    return (
      <div className="flex flex-col ">
        <h3 className="text-base font-semibold text-[#0076B7] pb-[24px]">
          Thẻ mới{" "}
          <span className="text-xs font-normal text-[#F00]">
            (ngày hiệu lực dự kiến)
          </span>
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hiệu lực <samp className="text-red-600">*</samp>
            </label>
            <input
              type="date"
              ref={refs.newCardStartDate}
              value={newCardStartDate}
              onChange={(e) => {
                const value = e.target.value;

                setNewCardStartDate(value)

                registerInfoBHYT["listInsuredPerson"][index].newCardStartDate = formatDate(value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Chọn ngày sinh"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hết hiệu lực <samp className="text-red-600">*</samp>
            </label>
            <input
              type="date"
              ref={refs.newCardEndDate}
              value={newCardEndDate}
              onChange={(e) => {
                const value = e.target.value;

                setNewCardEndDate(value);

                registerInfoBHYT["listInsuredPerson"][index].newCardEndDate = formatDate(value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Chọn ngày sinh"
              required
            />
          </div>
        </div>

        {errors.boxNewCard && <div className="mt-2 text-red-500">{errors.boxNewCard}</div>}
      </div>
    )
  }

  const renderProvince = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Thành phố đăng ký khám chữa bệnh
          <samp className="text-red-600"> *</samp>
        </label>
        <select
          ref={refs.medicalProvinceId}
          value={medicalProvinceId}
          onChange={(e) => {
            const value = e.target.value;

            setMedicalProvinceId(value)

            registerInfoBHYT["listInsuredPerson"][index].medicalProvinceId = parseInt(value);
          }}
          className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected value="0">Chọn tỉnh thành phố</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>

        {errors.provinceRegister && <div className="mt-2 text-red-500">{errors.provinceRegister}</div>}
      </div>
    )
  }

  const renderHispital = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Bệnh viện đăng ký khám chữa bệnh
          <samp className="text-red-600"> *</samp>
        </label>
        <select
          ref={refs.hospitalId}
          value={hospitalId}
          onChange={(e) => {
            const value = e.target.value;

            setHospitalId(value)

            registerInfoBHYT["listInsuredPerson"][index].hospitalId = parseInt(value);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected>Chọn bệnh viện</option>
          {listHospitals.map((hospital) => (
            <option key={hospital.id} value={hospital.id}>
              {hospital.name}
            </option>
          ))}
        </select>

        {errors.hispitalRegister && <div className="mt-2 text-red-500">{errors.hispitalRegister}</div>}
      </div>
    )
  }

  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
      {renderHeader()}

      {renderPrice()}

      {renderInputsocialInsuranceNumber()}

      {renderLine()}

      {renderNote()}

      {renderCitizenId()}

      {renderUploadImages()}

      {renderFullName()}

      {renderDob()}

      {renderGender()}

      {renderEthnic()}

      {renderInputBHYT()}

      {renderLine()}

      {renderBoxOldCard()}

      {renderLine()}

      {renderBoxNewCard()}

      {renderLine()}

      {renderProvince()}

      {renderHispital()}

    </div>
  );
};

export default UserBeneficiaryBHYTPage;
