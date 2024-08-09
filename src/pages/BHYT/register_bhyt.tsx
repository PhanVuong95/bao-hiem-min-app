import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "zmp-ui";
import { Province } from "../../models";
import { registerInfoBHYT } from "./list_health_insurance";
import { compareTwoDateString, formatMoneyVND, isValidCitizenId, isValidEmail, isValidEmptyString, isValidFullName, isValidHealthInsuranceNumber, isValidPhone, isValidSocialInsuranceNumber } from "../../utils/validateString";
import UserBeneficiaryBHYTPage from "../../components/cardUserBeneficiaryBHYT";
import UserBuyerPage from "../../components/cardUserBuyer";
import VoucherPage from "../../components/cardVoucher";
import HeaderBase from "../../components/headerBase";

const RegisterBHYT = ({ }) => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState<Province[]>([]);

  const userBuyerPageRefs = {
    phone: useRef<any>(null),
    fullName: useRef<any>(null),
    email: useRef<any>(null),
    provinceId: useRef<any>(null),
    districtId: useRef<any>(null),
    wardId: useRef<any>(null),
    addressDetail: useRef<any>(null),
  };

  const createNewBeneficiary = () => (
    {
      socialInsuranceNumber: React.createRef(),
      healthInsuranceNumber: React.createRef(),
      citizenId: React.createRef(),
      photoCitizenFront: React.createRef(),
      photoCitizenBack: React.createRef(),
      fullName: React.createRef(),
      dob: React.createRef(),
      gender: React.createRef(),
      ethnic: React.createRef(),
      oldCardStartDate: React.createRef(),
      oldCardEndDate: React.createRef(),
      newCardEndDate: React.createRef(),
      newCardStartDate: React.createRef(),
      insuranceProvinceId: React.createRef(),
      medicalProvinceId: React.createRef(),
      hospitalId: React.createRef(),
    }
  )

  const policyTerm1 = useRef(false);
  const policyTerm2 = useRef(false);

  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/province/api/list")
      .then((response) => {
        setProvinces(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [beneficiaries, setBeneficiaries] = useState(Array.from({ length: registerInfoBHYT["listInsuredPerson"].length }, () => createNewBeneficiary()));

  const addBeneficiary = () => {

    setBeneficiaries([...beneficiaries, createNewBeneficiary()]);

    const itemBeneficiary = {
      "id": 0,
      "insuranceProvinceId": null,
      "medicalProvinceId": 0,
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
      "ethnic": "",
      "oldCardStartDate": "",
      "oldCardEndDate": "",
      "newCardEndDate": "",
      "newCardStartDate": "",
      "price": 0,
      "hospitalId": 0
    }

    registerInfoBHYT['listInsuredPerson'].push(itemBeneficiary)
  };


  const scrollToElement = (input, boxNumber, duration) => {
    switch (boxNumber) {
      case 1:
        if (userBuyerPageRefs[input] && userBuyerPageRefs[input].current) {
          userBuyerPageRefs[input].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            userBuyerPageRefs[input].current.focus();
          }, duration)
        }
        break;
      case 2:
        if (duration != 0)
          input.current.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          input.current.focus();
        }, duration)
        break;
      default:
        break;
    }

  };

  const calculatePrice = () => {
    let finalPrice = 0;
    const BHYTprice = state.data.price;

    for (let index = 0; index < beneficiaries.length; index++) {
      let price = 0;
      switch (index) {
        case 0:
          price = BHYTprice;
          break;
        case 1:
          price = BHYTprice * 0.7;
          break;
        case 2:
          price = BHYTprice * 0.6;
          break;
        case 3:
          price = BHYTprice * 0.5;
          break;
        case 4:
          price = BHYTprice * 0.4;
          break;
        default:
          price = BHYTprice * 0.4;
          break;
      }
      finalPrice += price
    }
    return finalPrice;
  }

  const calculateInsuredPersonPrice = (index) => {
    const BHYTprice = state.data.price;

    switch (index) {
      case 0:
        return BHYTprice;
      case 1:
        return BHYTprice * 0.7;
      case 2:
        return BHYTprice * 0.6;
      case 3:
        return BHYTprice * 0.5;
      case 4:
        return BHYTprice * 0.4;
      default:
        return BHYTprice * 0.4;
    }

  }

  const validateForm = () => {
    console.log(registerInfoBHYT);

    registerInfoBHYT['finalPrice'] = calculatePrice()
    registerInfoBHYT["insuranceId"] = state.data.insuranceTypeId

    // Validate số điện thoại
    if (!isValidEmptyString(registerInfoBHYT["phone"])) {
      toast.warn(
        "Số điện thoại không được để trống",
      );
      scrollToElement("phone", 1, 500)

      return false;
    }
    if (!isValidPhone(registerInfoBHYT["phone"])) {
      toast.warn(
        "Số điện thoại không hợp lệ",
      );
      scrollToElement("phone", 1, 500)
      return false;
    }

    // Validate họ và tên
    if (!isValidEmptyString(registerInfoBHYT["fullName"])) {
      toast.warn(
        "Họ và tên không được để trống",
      );
      scrollToElement("fullName", 1, 500)
      return false;
    }

    if (!isValidFullName(registerInfoBHYT["fullName"])) {
      toast.warn(
        "Họ và tên không hợp lệ",
      );
      scrollToElement("fullName", 1, 500)
      return false;
    }

    // Validate email
    if (isValidEmptyString(registerInfoBHYT["email"])) {
      if (!isValidEmail(registerInfoBHYT["email"])) {
        toast.warn(
          "Email không hợp lệ",
        );
        scrollToElement("email", 1, 500)
        return false;
      }
    }

    // Validate địa chỉ
    if (registerInfoBHYT["provinceId"] == 0) {
      toast.warn(
        "Vui lòng lựa chọn Thành phố",
      );
      scrollToElement("provinceId", 1, 500)
      return false;
    }

    if (registerInfoBHYT["districtId"] == 0) {
      toast.warn(
        "Vui lòng lựa chọn Quận huyện",
      );
      scrollToElement("districtId", 1, 500)
      return false;
    }

    if (registerInfoBHYT["wardId"] == 0) {
      toast.warn(
        "Vui lòng lựa chọn Phường xã",
      );
      scrollToElement("wardId", 1, 500)
      return false;
    }

    if (!isValidEmptyString(registerInfoBHYT["addressDetail"])) {
      toast.warn(
        "Địa chỉ cụ thể không được để trống",
      );
      scrollToElement("addressDetail", 1, 500)
      return false;
    }

    for (let index = 0; index < registerInfoBHYT['listInsuredPerson'].length; index++) {
      // Update thông tin còn thiếu
      registerInfoBHYT["listInsuredPerson"][index].supportBudget = 0
      registerInfoBHYT["listInsuredPerson"][index].wage = 0
      registerInfoBHYT["listInsuredPerson"][index].monthInsured = state.data.monthDuration
      registerInfoBHYT["listInsuredPerson"][index].price = calculateInsuredPersonPrice(index)

      // if (registerInfoBHYT['listInsuredPerson'][index].socialInsuranceNumber == ""
      //   && registerInfoBHYT['listInsuredPerson'][index].citizenId == "") {
      //   toast.warn(
      //     "Số bảo hiểm y tế hoặc CCCD không được để trống",
      //   );
      //   scrollToElement(beneficiaries[index].socialInsuranceNumber, 2, 500)
      //   return false;
      // }

      if (registerInfoBHYT['listInsuredPerson'][index].socialInsuranceNumber != ""
        && !isValidSocialInsuranceNumber(registerInfoBHYT['listInsuredPerson'][index].socialInsuranceNumber)) {
        toast.warn(
          "Số BHYT không hợp lệ",
        );
        scrollToElement(beneficiaries[index].socialInsuranceNumber, 2, 500)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].citizenId == "") {
        toast.warn(
          "Số căn cước công dân không hợp lệ",
        );
        scrollToElement(beneficiaries[index].citizenId, 2, 500)
        return false;
      }

      if (!isValidCitizenId(registerInfoBHYT['listInsuredPerson'][index].citizenId)) {
        toast.warn(
          "Số căn cước công dân không hợp lệ",
        );
        scrollToElement(beneficiaries[index].citizenId, 2, 500)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].citizenId != ""
        && registerInfoBHYT['listInsuredPerson'][index].photoCitizenFront == "") {
        toast.warn(
          "Bạn cần tải CCCD mặt trước",
        );
        scrollToElement(beneficiaries[index].photoCitizenFront, 2, 500)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].citizenId != ""
        && registerInfoBHYT['listInsuredPerson'][index].photoCitizenBack == "") {
        toast.warn(
          "Bạn cần tải CCCD mặt sau",
        );
        scrollToElement(beneficiaries[index].photoCitizenBack, 2, 500)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].fullName == "") {
        toast.warn(
          "Họ và tên không được để trống",
        );
        scrollToElement(beneficiaries[index].fullName, 2, 500)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].doB == "") {
        toast.warn(
          "Ngày sinh không được để trống",
        );
        scrollToElement(beneficiaries[index].dob, 2, 500)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].gender == "") {
        toast.warn(
          "Giới tính không được để trống",
        );
        scrollToElement(beneficiaries[index].gender, 2, 500)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].ethnic == "") {
        toast.warn(
          "Dân tộc không được để trống",
        );
        scrollToElement(beneficiaries[index].ethnic, 2, 500)
        return false;
      }
      // ///////
      if (registerInfoBHYT['listInsuredPerson'][index].healthInsuranceNumber == "") {
        toast.warn(
          "Mã BHYT cũ không được để trống",
        );
        scrollToElement(beneficiaries[index].healthInsuranceNumber, 2, 500)
        return false;
      }

      if (!isValidHealthInsuranceNumber(registerInfoBHYT['listInsuredPerson'][index].healthInsuranceNumber)) {
        toast.warn(
          "Mã BHYT cũ không hợp lệ",
        );
        scrollToElement(beneficiaries[index].healthInsuranceNumber, 2, 500)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].oldCardStartDate == "") {
        toast.warn(
          "Ngày hiệu lực của thẻ cũ không được để trống",
        );
        scrollToElement(beneficiaries[index].oldCardStartDate, 2, 500)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].oldCardEndDate == "") {
        toast.warn(
          "Ngày hết hiệu lực của thẻ cũ không được để trống",
        );
        scrollToElement(beneficiaries[index].oldCardEndDate, 2, 500)
        return false;
      }


      if (compareTwoDateString(
        registerInfoBHYT['listInsuredPerson'][index].oldCardStartDate,
        registerInfoBHYT['listInsuredPerson'][index].oldCardEndDate
      ) != 1) {
        toast.warn(
          "Ngày hiệu lực phải trước ngày hết hiệu lực",
        );
        scrollToElement(beneficiaries[index].oldCardEndDate, 2, 500)
        return false;
      }


      if (registerInfoBHYT['listInsuredPerson'][index].newCardStartDate == "") {
        toast.warn(
          "Ngày hiệu lực của thẻ mới không được để trống",
        );
        scrollToElement(beneficiaries[index].newCardStartDate, 2, 0)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].newCardEndDate == "") {
        toast.warn(
          "Ngày hết hiệu lực của thẻ mới không được để trống",
        );
        scrollToElement(beneficiaries[index].newCardEndDate, 2, 0)
        return false;
      }

      if (compareTwoDateString(
        registerInfoBHYT['listInsuredPerson'][index].newCardStartDate,
        registerInfoBHYT['listInsuredPerson'][index].newCardEndDate
      ) != 1) {
        toast.warn(
          "Ngày hiệu lực phải trước ngày hết hiệu lực",
        );
        scrollToElement(beneficiaries[index].newCardEndDate, 2, 500)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].medicalProvinceId == 0) {
        toast.warn(
          "Thành phố đăng ký khám chữa bệnh không được để trống",
        );
        scrollToElement(beneficiaries[index].medicalProvinceId, 2, 0)
        return false;
      }

      if (registerInfoBHYT['listInsuredPerson'][index].hospitalId == 0) {
        toast.warn(
          "Bệnh viện đăng ký khám chữa bệnh không được để trống",
        );
        scrollToElement(beneficiaries[index].hospitalId, 2, 0)
        return false;
      }
    }

    if (!policyTerm2.current) {
      toast.warn(
        "Bạn cần chấp nhận điều khoản của chúng tôi",
      );
      return false;
    }

    return true;
  }

  const renderHeader = () => {
    return (
      <HeaderBase
        isHome={false}
        title={"Đăng ký BHYT tự nguyện"}
      />
    )
  }

  const renderAddUserBeneficiary = () => {
    return (
      <button
        className="p-4 bg-white rounded-xl flex flex-row items-center justify-center gap-2"
        onClick={addBeneficiary}
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

  const renderAttachedFiles = () => {
    return (
      <div className="flex flex-col gap-2 mb-[32px]">
        <div className="bg-white rounded-xl flex flex-col gap-6 p-4">
          <h3 className="text-[#0076B7] text-lg font-medium">
            File đính kèm
          </h3>
          <button className="button-add">
            <div className="flex flex-row justify-center items-center gap-3">
              <p className="text-[#0076B7] text-base font-semibold">
                Upload hình ảnh liên quan
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  d="M1.75134 12.7915C1.75134 6.87729 6.58713 2.0415 12.5013 2.0415C18.4156 2.0415 23.2513 6.87729 23.2513 12.7915C23.2513 18.7057 18.4156 23.5415 12.5013 23.5415C6.58713 23.5415 1.75134 18.7057 1.75134 12.7915ZM12.5013 3.5415C7.41556 3.5415 3.25134 7.70572 3.25134 12.7915C3.25134 17.8773 7.41556 22.0415 12.5013 22.0415C17.5871 22.0415 21.7513 17.8773 21.7513 12.7915C21.7513 7.70572 17.5871 3.5415 12.5013 3.5415ZM7.75134 12.7915C7.75134 12.3773 8.08713 12.0415 8.50134 12.0415H11.7513V8.7915C11.7513 8.37729 12.0871 8.0415 12.5013 8.0415C12.9156 8.0415 13.2513 8.37729 13.2513 8.7915V12.0415H16.5013C16.9156 12.0415 17.2513 12.3773 17.2513 12.7915C17.2513 13.2057 16.9156 13.5415 16.5013 13.5415H13.2513V16.7915C13.2513 17.2057 12.9156 17.5415 12.5013 17.5415C12.0871 17.5415 11.7513 17.2057 11.7513 16.7915V13.5415H8.50134C8.08713 13.5415 7.75134 13.2057 7.75134 12.7915Z"
                  fill="#0076B7"
                />
              </svg>
            </div>
          </button>

          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

          <div className="gap-2 flex flex-col">
            <p className="text-sm font-normal text-[#000]">
              Quy tắc giảm phí cùng hộ gia đình:
            </p>

            <ul className="list-disc px-4">
              <li>
                <p className="text-sm font-normal">
                  Cung cấp toàn bộ thẻ CCCD gắn chip điện tử những người tham
                  gia BHYT hộ gia đình
                </p>
              </li>
              <li>
                <p className="text-sm font-normal">
                  Tất cả thành viên trong gia đình phải có cùng địa chỉ trên
                  thẻ CCCD để được giảm phí
                </p>
              </li>
              <li>
                <p className="text-sm font-normal">
                  Trường hợp quan hệ với chủ hộ là “ở nhờ”, “ ở trọ” thì không
                  thuộc đối tượng được giảm phí
                </p>
              </li>
            </ul>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              onChange={(e) => {
                policyTerm1.current = !policyTerm1.current
              }}
              className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
              id="unchecked-circular-checkbox"
            />
            <label
              htmlFor="unchecked-circular-checkbox"
              className="text-sm font-normal text-[#000] w-[96%]"
            >
              Tôi cam đoan răng tất cả những lời khai trên là đúng và đã hiểu
              rõ
              <strong className="text-[#0076B7] font-bold">
                {" "}
                Chính sách và điều khoản
              </strong>
            </label>
          </div>

          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

          <div className="flex flex-col gap-2 pb-4">
            <h3 className="text-[#0076B7] text-lg font-medium">
              Thông tin thẻ BHYT
            </h3>
            <div>
              <p className="text-sm font-normal text-[#000]">
                Thông tin BHXH sẽ được cập nhật trên ứng dụng{" "}
                <strong className="text-[#0076B7] font-bold">VSSID </strong>
                trong 15 ngày làm việc.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={(e) => {
                  policyTerm2.current = !policyTerm2.current
                }}
                className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
                id="unchecked-circular-checkbox"
              />
              <label
                htmlFor="unchecked-circular-checkbox"
                className="text-sm font-normal text-[#000] w-[96%]"
              >
                Tôi cam đoan răng tất cả những lời khai trên là đúng và đã
                hiểu rõ
                <strong className="text-[#0076B7] font-bold">
                  {" "}
                  Chính sách và điều khoản
                </strong>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const onCreate = async (token) => {
    const response = await axios.post(
      "https://baohiem.dion.vn/insuranceorder/api/add-order",
      registerInfoBHYT,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (response.data.message == "CREATED" && response.data.status == "201") {
      registerInfoBHYT["id"] = response.data.data[0]
    }

    toast.success(
      "Đăng ký BBHYT tự nguyện thành công",
    );

    navigate(`/bill-pay-bhyt/${registerInfoBHYT["id"]}`)
  }

  const onUpdate = async (token) => {
    const response = await axios.post(
      "https://baohiem.dion.vn/insuranceorder/api/update-order",
      registerInfoBHYT,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (response.data.message == "CREATED" && response.data.status == "201") {
      registerInfoBHYT["id"] = response.data.data[0]
    }

    toast.success(
      "Cập nhật thành công",
    );

    navigate(`/bill-pay-bhyt/${registerInfoBHYT["id"]}`)
  }

  const onSubmitFormData = async () => {
    const token = localStorage.token;
    try {
      if (registerInfoBHYT["id"] == 0) {
        onCreate(token)
      } else {
        onUpdate(token)
      }
    } catch (error) {
      toast.error(
        "Đăng ký bBHYT tự nguyện thất bại, vui lòng thử lại sau",
      );
    }
  }

  const renderFooter = () => {
    return (
      <div className="page-2 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-between">
            <p className="block text-sm font-normal text-gray-900">
              Tổng thanh toán:
            </p>
            <h3 className="text-base font-medium text-[#0076B7]">
              {formatMoneyVND(calculatePrice())} VND
            </h3>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <button type="button"
              onClick={() => {
                // navigate(`/bill-pay-bhyt/1097`)
                if (validateForm()) {
                  onSubmitFormData();
                }
              }}
              className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {renderHeader()}
      <div className="page-1 flex flex-col gap-4">
        <div >
          <UserBuyerPage data={state.data} refs={userBuyerPageRefs} />
        </div>

        {beneficiaries.map((beneficiary, index) => (
          <UserBeneficiaryBHYTPage
            index={index}
            price={state.data.price}
            onClose={(index) => {
              beneficiaries.splice(index, 1);
              setBeneficiaries([...beneficiaries]);

              registerInfoBHYT['listInsuredPerson'].splice(index, 1);
            }}
            provinces={provinces}
            refs={beneficiary}
          />
        ))}

        {renderAddUserBeneficiary()}

        <VoucherPage />

        {renderAttachedFiles()}
      </div>

      {renderFooter()}
    </div>
  );
};

export default RegisterBHYT;
