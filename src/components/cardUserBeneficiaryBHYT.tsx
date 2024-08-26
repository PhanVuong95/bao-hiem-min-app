import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ClipLoader, FadeLoader } from "react-spinners";
import { registerInfoBHYT } from "../pages/BHYT/list_health_insurance";
import { formattedEthnics, listEthnics } from "../utils/constants";
import { convertListToSelect, formatDate, formatDate2, formatMoneyVND, formatTimeSql, isValidCitizenId, isValidEmptyString, isValidHealthInsuranceNumber, isValidSocialInsuranceNumber } from "../utils/validateString";
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import iconClose from '../../assets-src/close_1.png'
import imageQR from '../../assets-src/icon_qr.png'
import { Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import '../locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from "antd/es/date-picker/locale/vi_VN";
import Modal from 'react-modal';
import Lottie from "lottie-react";
import lottieScanQR from "../../assets-src/lottie_scan_qr.json";
import { motion } from 'framer-motion';

dayjs.locale('vi');
dayjs.extend(customParseFormat);

interface Props {
  price: number,
  index: number,
  onClose: (index: number) => void;
  refs: any
  provinces: any
  windowSize: any
}

const UserBeneficiaryBHYTPage = (props: Props) => {
  const { index, price, onClose, refs, provinces, windowSize } = props;
  const dateFormat = 'DD/MM/YYYY';
  const [districts, setDistricts] = useState<any>([]);
  const [socialInsuranceNumber, setSocialInsuranceNumber] = useState(registerInfoBHYT["listInsuredPerson"][index].socialInsuranceNumber);
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState(registerInfoBHYT["listInsuredPerson"][index].healthInsuranceNumber);
  const [errors, setErrors] = useState<any>({});
  const [citizenId, setCitizenId] = useState(registerInfoBHYT["listInsuredPerson"][index].citizenId);
  const [photoCitizenFront, setPhotoCitizenFront] = useState(registerInfoBHYT["listInsuredPerson"][index].photoCitizenFront);
  const [photoCitizenBack, setPhotoCitizenBack] = useState(registerInfoBHYT["listInsuredPerson"][index].photoCitizenBack);
  const [isUploadingPhotoCitizenFont, setIsUploadingPhotoCitizenFont] = useState(true)
  const [isUploadingPhotoCitizenBack, setIsUploadingPhotoCitizenBack] = useState(false)

  const [fullName, setFullName] = useState(registerInfoBHYT["listInsuredPerson"][index].fullName.trim());
  const [dob, setDob] = useState<any>(
    registerInfoBHYT["listInsuredPerson"][index].doB == "" ?
      "" :
      dayjs(registerInfoBHYT["listInsuredPerson"][index].doB.trim(), 'DD/MM/YYYY')
  );

  const [gender, setGender] = useState(registerInfoBHYT["listInsuredPerson"][index].gender);
  const [ethnic, setEthnic] = useState(registerInfoBHYT["listInsuredPerson"][index].ethnic);
  const [oldCardStartDate, setOldCardStartDate] = useState<any>(
    registerInfoBHYT["listInsuredPerson"][index].oldCardStartDate == "" ?
      "" :
      dayjs(registerInfoBHYT["listInsuredPerson"][index].oldCardStartDate.trim(), 'DD/MM/YYYY')
  );
  const [oldCardEndDate, setOldCardEndDate] = useState<any>(
    registerInfoBHYT["listInsuredPerson"][index].oldCardEndDate == "" ? "" :
      dayjs(registerInfoBHYT["listInsuredPerson"][index].oldCardEndDate.trim(), 'DD/MM/YYYY')

  );
  const [newCardEndDate, setNewCardEndDate] = useState(
    registerInfoBHYT["listInsuredPerson"][index].newCardEndDate == "" ? "" :
      dayjs(registerInfoBHYT["listInsuredPerson"][index].newCardEndDate.trim(), 'DD/MM/YYYY')
  );
  const [newCardStartDate, setNewCardStartDate] = useState<any>(
    registerInfoBHYT["listInsuredPerson"][index].newCardStartDate == "" ? "" :
      dayjs(registerInfoBHYT["listInsuredPerson"][index].newCardStartDate.trim(), 'DD/MM/YYYY')
  );
  const frontImageInputRef = useRef<HTMLInputElement>(null);
  const backImageInputRef = useRef<HTMLInputElement>(null);
  const [medicalProvinceId, setMedicalProvinceId] = useState<any>(registerInfoBHYT["listInsuredPerson"][index].medicalProvinceId);
  const [medicalDistrictId, setMedicalDistrictId] = useState<any>(registerInfoBHYT["listInsuredPerson"][index].medicalDistrictId);
  const [hospitalId, setHospitalId] = useState(registerInfoBHYT["listInsuredPerson"][index].hospitalId);
  const [listHospitals, setListHospitals] = useState<any>([])
  const [isShowModelQR, setIsShowModelQR] = useState<boolean>(false)
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [opacityQR, setOpacityQR] = useState(1);
  const lottieRef = useRef(null);

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
    setDistricts([])
    setListHospitals([])
    if (medicalProvinceId != "0" || medicalProvinceId != 0) {
      axios
        .get(
          `https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${medicalProvinceId}`
        ).then((response) => {
          setDistricts(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [medicalProvinceId]);

  useEffect(() => {
    setListHospitals([])
    if (medicalDistrictId != "0" || medicalDistrictId != 0) {
      axios
        .get(
          `https://baohiem.dion.vn/hospital/api/list-hospital-by-districtId?districtId=${medicalDistrictId}`
        ).then((response) => {
          setListHospitals(response.data.data);
        })
        .catch((error) => {
          setListHospitals([])
          console.error(error);
        });
    }
  }, [medicalDistrictId])


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
        setIsUploadingPhotoCitizenBack(false)
        setIsUploadingPhotoCitizenFont(false)
      }
    } else {
      setIsUploadingPhotoCitizenBack(false)
      setIsUploadingPhotoCitizenFont(false)
    }
  };

  const updateBackCitizenPhoto = (img) => {
    setPhotoCitizenBack(img);
    registerInfoBHYT["listInsuredPerson"][index].photoCitizenBack = img;
    setIsUploadingPhotoCitizenBack(false)
  };

  const updateFrontCitizenPhoto = (img) => {
    setPhotoCitizenFront(img);
    registerInfoBHYT["listInsuredPerson"][index].photoCitizenFront = img;
    setIsUploadingPhotoCitizenFont(false)
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
            <img src={iconClose} className="w-3 h-3" />
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
          <Input
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
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <Input
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
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập số CCCD"
          required
        />

        {errors.citizenId && <div className="mt-2 text-red-500">{errors.citizenId}</div>}
      </div>
    )
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

  const renderUploadImages = () => {

    return (
      <div className="p-4 bg-white rounded-xl border border-[#B9BDC1] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[#0076B7] text-lg font-medium items-center">Tải ảnh CCCD</h3>
          <button onClick={() => {
            setIsShowModelQR(true)
          }}>
            <img src={imageQR} className="w-8" />
          </button>
        </div>

        {
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
                  }
                }}
                onScan={(data) => {
                  setTimeout(() => {
                    const info = data[0]["rawValue"];
                    const words = info.split("|")

                    setIsShowModelQR(false)
                    setCitizenId(words[0])

                    registerInfoBHYT["listInsuredPerson"][index].citizenId = words[0];

                    setFullName(words[2])
                    registerInfoBHYT["listInsuredPerson"][index].fullName = words[2];

                    const dob = words[3];
                    const day = dob.substring(0, 2);
                    const month = dob.substring(2, 4);
                    const year = dob.substring(4, 8);

                    setDob(dayjs(`${day} /${month}/${year}`, dateFormat))

                    registerInfoBHYT["listInsuredPerson"][index].doB = formatDate(`${year}-${month}-${day}`);

                    setGender(words[4])
                    registerInfoBHYT["listInsuredPerson"][index].gender = words[4];
                    setOpacityQR(1)
                  }, 1000)

                }}
                allowMultiple={false}
                styles={{
                  container: {
                    position: 'fixed',
                    width: 450,
                    height: windowSize.height + 20,
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
                    height: windowSize.height + 20,
                    objectFit: 'cover',
                  },
                }}
              />
            </div>
          </Modal>
        }


        <div className="flex flex-row gap-2 justify-between w-[100%]">
          <div ref={refs.photoCitizenFront} className="flex gap-3 w-[100%]">
            <div className="flex flex-col gap-2 w-[100%]" onClick={() => handleCardClick(frontImageInputRef)}>
              <div className={`bg-[#F5F5F5]  rounded-lg p-[${photoCitizenFront ? '0px' : '9px'}]  card-cccd w-[100%] h-[100px]`}>
                <div className="icon-1">

                  {photoCitizenFront ? (
                    <img
                      src={`https://baohiem.dion.vn${photoCitizenFront}`}
                      alt="Mặt trước"
                      className="w-[100%] h-[100px] object-center rounded-lg"
                    />
                  ) :
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={'100%'}
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
                  {photoCitizenFront ? null : <svg
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
                  </svg>}
                </div>
              </div>
              <h4 className="text-[15px] text-black text-center">Mặt trước</h4>
              <input
                type="file"
                accept="image/*"
                ref={frontImageInputRef}
                style={{ display: "none" }}
                onChange={(event) => {
                  setIsUploadingPhotoCitizenFont(true)
                  handleImageUpload(event, updateFrontCitizenPhoto)
                }
                }
              />
            </div>

            <div ref={refs.photoCitizenBack} className="flex gap-3 w-[100%]" onClick={() => handleCardClick(backImageInputRef)}>
              <div className="flex flex-col gap-2 w-[100%]">
                <div className={`bg-[#F5F5F5]  rounded-lg p-[${photoCitizenBack ? '0px' : '9px'}]  card-cccd w-[100%] h-[100px]`}>
                  <div className="icon-1">

                    {photoCitizenBack ? (
                      <img
                        src={`https://baohiem.dion.vn${photoCitizenBack}`}
                        alt="Mặt sau"
                        className="w-[100%] h-[100px] object-center rounded-lg"
                      />
                    ) :
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={'100%'}
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
                    {photoCitizenBack ? null : <svg
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
                    </svg>}

                  </div>
                </div>

                <h4 className="text-[15px] text-black text-center">Mặt sau</h4>
                <input
                  type="file"
                  accept="image/*"
                  ref={backImageInputRef}
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setIsUploadingPhotoCitizenBack(true)
                    handleImageUpload(event, updateBackCitizenPhoto)
                  }
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
        <Input
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
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          Mã BHYT cũ
        </label>
        <Input
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
                setErrors({ ...errors, ...{ "healthInsuranceNumber": "Mã BHYT 10-15 ký tự bao gồm chữ và số" } })
              } else {
                setErrors({ ...errors, ...{ "healthInsuranceNumber": null } })
              }
            } else {
              setErrors({ ...errors, ...{ "healthInsuranceNumber": null } })
            }
          }}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <DatePicker
          type="date"
          size="large"
          locale={locale}
          className="w-[100%]"
          ref={refs.dob}
          value={dob}
          placeholder="dd/mm/yyyy"
          onChange={(e) => {
            const dateObject = dayjs(e.toString());
            const dateStr = `${dateObject.date().toString().padStart(2, '0')}/${(dateObject.month() + 1).toString().padStart(2, '0')}/${dateObject.year()}`
            setDob(dayjs(dateStr, dateFormat))
            registerInfoBHYT["listInsuredPerson"][index].doB = dateStr;

          }}
          format={dateFormat}
          maxDate={dayjs(formatDate2(new Date()), dateFormat)}
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
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          ref={refs.gender}
          placeholder="Chọn giới tính"
          value={gender}
          onChange={(value) => {
            ;
            setGender(value);

            registerInfoBHYT["listInsuredPerson"][index].gender = value;

          }}
          key={gender}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={
            [
              { value: '', label: 'Chọn giới tính' },
              { value: 'Nam', label: 'Nam' },
              { value: 'Nữ', label: 'Nữ' },
            ]
          }
        />
        {errors.gender && <div className="mt-2 text-red-500">{errors.gender}</div>}
      </div>
    )
  }

  const renderEthnic = () => {
    return (
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
          ref={refs.ethnic}
          placeholder="Chọn dân tộc"
          value={ethnic}
          onChange={(value) => {

            setEthnic(value);

            registerInfoBHYT["listInsuredPerson"][index].ethnic = value;

          }}
          key={ethnic}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={
            formattedEthnics
          }
        />
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
              min={new Date().toISOString().split("T")[0]}
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

            <DatePicker
              type="date"
              size="large"
              locale={locale}
              className="w-[100%]"
              ref={refs.newCardStartDate}
              value={newCardStartDate}
              placeholder="dd/mm/yyyy"
              onChange={(e) => {
                const dateObject = dayjs(e.toString());
                const dateStr = `${dateObject.date().toString().padStart(2, '0')}/${(dateObject.month() + 1).toString().padStart(2, '0')}/${dateObject.year()}`
                setNewCardStartDate(dayjs(dateStr, dateFormat))
                registerInfoBHYT["listInsuredPerson"][index].newCardStartDate = dateStr;

              }}
              format={dateFormat}
            />
          </div>
        </div>

      </div>
    )
  }

  const renderProvince = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Thành phố khám chữa bệnh
          <samp className="text-red-600"> *</samp>
        </label>
        <Select
          size="large"
          onMouseDown={(event) => event.preventDefault()}
          className="w-[100%] z-1"
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          ref={refs.medicalProvinceId}
          placeholder="Chọn tỉnh thành phố"
          virtual={false}
          value={medicalProvinceId}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {

            setMedicalProvinceId(value)

            setMedicalDistrictId(0)
            setHospitalId(0)

            registerInfoBHYT["listInsuredPerson"][index].medicalProvinceId = value;
          }}
          key={medicalProvinceId}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(provinces, 'Chọn tỉnh thành phố')}
        />

      </div>
    )
  }

  const renderDistrict = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Quận huyện khám chữa bệnh
          <samp className="text-red-600"> *</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          ref={refs.medicalDistrictId}
          virtual={false}
          placeholder="Chọn quận huyện"
          value={medicalDistrictId}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {

            setMedicalDistrictId(value)

            setHospitalId(0)

            registerInfoBHYT["listInsuredPerson"][index].medicalDistrictId = value;
          }}
          key={medicalProvinceId}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(districts, 'Chọn quận huyện')}
        />
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
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          ref={refs.hospitalId}
          virtual={false}
          placeholder="Chọn bệnh viện"
          value={hospitalId}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {

            setHospitalId(value)

            registerInfoBHYT["listInsuredPerson"][index].hospitalId = value;
          }}
          key={medicalProvinceId}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(listHospitals, 'Chọn bệnh viện')}
        />
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

      {/* {renderLine()}

      {renderBoxOldCard()} */}

      {renderLine()}

      {renderBoxNewCard()}

      {renderLine()}

      {renderProvince()}

      {renderDistrict()}

      {renderHispital()}

      <Modal
        visible={isUploadingPhotoCitizenFont}
        modalStyle={{
          background: 'transparent'
        }}
      >
        <div className="justify-center flex">
          <FadeLoader height={10} width={3} loading={true} color="#0076B7" />
        </div>
      </Modal>


      <Modal
        visible={isUploadingPhotoCitizenBack}
        modalStyle={{
          background: 'transparent'
        }}
      >
        <div className="justify-center flex">
          <FadeLoader height={10} width={3} loading={true} color="#0076B7" />
        </div>
      </Modal>
    </div>
  );
};

export default UserBeneficiaryBHYTPage;


