import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import HeaderBase from "../../components/headerBase";
import { useParams } from "react-router-dom";
import { formatDate, formatMoneyVND, formatPhoneNumber, formatTime, isValidEmptyString, isValidString } from "../../utils/validateString";
import { registerInfoBHYT } from "./list_health_insurance";

const InfoDetailBHYT: React.FunctionComponent = () => {
  const { id } = useParams();
  const [billPay, setBillPay] = useState<any>();
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [insuranceid, setInsuranceId] = useState(0)
  const insurance = useRef()

  const PENDING = 1001;
  const DONE = 1002;
  const CANCELED = 1003;

  const switchColor = (insuranceOrderStatusId) => {
    switch (insuranceOrderStatusId) {
      case PENDING:
        return '#FAAD14'
      case DONE:
        return '#00BA00'
      case CANCELED:
        return '#F00'
      default:
        return '#FAAD14'
    }
  }

  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/insuranceorder/api/detail-by-vm/" + id)
      .then((response) => {
        const data = response.data.data[0]
        setBillPay(data);
        setLoading(false);

        setInsuranceId(data?.insuranceId);
        registerInfoBHYT["id"] = data?.id;
        registerInfoBHYT["fileUploadUrl"] = data?.fileUploadUrl;
        registerInfoBHYT["insuranceId"] = data?.insuranceId;
        registerInfoBHYT["citizenId"] = data?.citizenId;
        registerInfoBHYT["photoCitizenFront"] = data?.photoCitizenFront;
        registerInfoBHYT["photoCitizenBack"] = data?.photoCitizenBack;
        registerInfoBHYT["phone"] = isValidString(data?.phone);
        registerInfoBHYT["fullName"] = isValidString(data?.fullName);
        registerInfoBHYT["email"] = isValidString(data?.email);
        registerInfoBHYT["provinceId"] = data?.provinceId;
        registerInfoBHYT["districtId"] = data?.districtId;
        registerInfoBHYT["wardId"] = data?.wardId;
        registerInfoBHYT["finalPrice"] = data?.finalPrice;
        registerInfoBHYT["addressDetail"] = isValidString(data?.addressDetail);


        registerInfoBHYT["listInsuredPerson"] = data?.listInsuredPerson.map(item => {
          const obj = Object.assign({}, item);
          obj["socialInsuranceNumber"] = isValidString(item["socialInsuranceNumber"]);
          obj["healthInsuranceNumber"] = isValidString(item["healthInsuranceNumber"]);
          obj["citizenId"] = isValidString(item["citizenId"]);
          obj["photoCitizenFront"] = isValidString(item["photoCitizenFront"]);
          obj["photoCitizenBack"] = isValidString(item["photoCitizenBack"]);
          obj["fullName"] = isValidString(item["fullName"]);
          obj["doB"] = formatDate(item["doB"]);
          obj["newCardEndDate"] = formatDate(item["newCardEndDate"]);
          obj["newCardStartDate"] = formatDate(item["newCardStartDate"]);
          obj["oldCardEndDate"] = formatDate(item["oldCardEndDate"]);
          obj["oldCardStartDate"] = formatDate(item["oldCardStartDate"]);
          return obj;
        })

        console.log(registerInfoBHYT);

      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id])

  useEffect(() => {
    axios
      .get(
        "https://baohiem.dion.vn/insurance/api/list-paging-viewmodel?pageIndex=1&pageSize=100&insuranceTypeId=1002"
      )
      .then((response) => {
        const data = response.data.data.filter((item) => item.id == insuranceid)[0]

        insurance.current = data;

      })
      .catch((error) => {
        console.error(error);
      });
  }, [insuranceid != 0]);

  const boxBuyer = () => {
    return (
      <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
        <div className="flex justify-between">
          <h3 className="text-base font-medium text-[#0076B7]">
            Người mua bảo hiểm
          </h3>

          {billPay?.insuranceOrderStatusId == PENDING &&
            <button
              onClick={() => {
                navigate("/register-BHYT/", { state: { data: insurance.current, type: 'updated' } });
              }}
              className="text-sm text-[#0076B7] underline"
            >
              Chỉnh sửa
            </button>
          }
        </div>


        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Họ và tên</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
              {billPay?.fullName ? billPay?.fullName.trim() : "Đang tải"}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Email</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {billPay?.email ? billPay?.email.trim() : "Đang tải"}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">
              Số điện thoại
            </p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
              {billPay?.phone ? formatPhoneNumber(billPay?.phone.trim()) : "Đang tải"}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Địa chỉ</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {`${billPay?.addressDetail ? billPay?.addressDetail.trim() : ""}, ${billPay?.wardName ? billPay?.wardName.trim() : ""}, ${billPay?.districtName ? billPay?.districtName.trim() : ""} ,${billPay?.provinceName ? billPay?.provinceName.trim() : ""}`}
            </p>
          </div>
        </div>

        {loading ? <div></div> :
          billPay.listInsuredPerson.map((item, index) => {
            return boxBeneficiary(item, index)
          })}
      </div>
    )
  }

  const boxBeneficiary = (item, index) => {
    return (
      <div className="bg-white rounded-xl flex flex-col gap-6 mt-4">
        {line()}

        <h3 className="text-base font-medium text-[#0076B7]">
          Thông tin người số {index + 1} được bảo hiểm
        </h3>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Họ và tên</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
              {!isValidEmptyString(item?.fullName) ? "Chưa cập nhật" : item?.fullName.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Ngày sinh</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {!isValidEmptyString(item?.doB) ? "Chưa cập nhật" : formatDate(item?.doB.trim())}
            </p>
          </div>
        </div>


        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Số CCCD</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {!isValidEmptyString(item?.citizenId) ? "Chưa cập nhật" : item?.citizenId.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Giới tính</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {!isValidEmptyString(item?.gender) ? "Chưa cập nhật" : item?.gender.trim()}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Mã số BHYT</p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
              {!isValidEmptyString(item?.healthInsuranceNumber) ? "Chưa cập nhật" : item?.healthInsuranceNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">
              Số tháng đóng
            </p>
          </div>
          <div>
            <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
              {!isValidEmptyString(item?.monthInsured) ? "Chưa cập nhật" : item?.monthInsured} tháng
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Bệnh viện đăng ký</p>
          </div>
          <div>
            <p className="text-[#0076B7] text-sm font-semibold max-w-[180px] text-right">
              {!isValidEmptyString(item?.hospitalName) ? "Chưa cập nhật" : item?.hospitalName} -
              {!isValidEmptyString(item?.medicalProvinceName) ? "Chưa cập nhật" : item?.medicalProvinceName}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="text-[#646464] text-sm font-normal">Phí bảo hiểm</p>
          </div>
          <div>
            <p className="text-[#0076B7] text-sm font-semibold max-w-[180px] text-right">
              {item?.price == 0 ? "Chưa cập nhật" : formatMoneyVND(item?.price)} vnđ
            </p>
          </div>
        </div>
      </div >
    )
  }

  const line = () => {
    return (
      <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>
    )
  }


  const boxInfo = () => {
    return (
      <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
        <h3 className="text-[#0076B7] text-lg font-medium">
          Danh mục sản phẩm
        </h3>
        <div className="flex gap-[10px]">
          <img src="https://dion.vn/wp-content/uploads/2024/07/image-1004.png" />
          <div className="title-product flex flex-col">
            <h3 className="text-[#0076B7] text-lg font-medium">
              {billPay?.insuranceOrderStatusName}
            </h3>
            <p className="text-[#646464] text-sm font-normal">{billPay?.listInsuredPerson.length > 0 ? billPay?.listInsuredPerson[0].monthInsured : ''} tháng</p>
            <span className="text-[#0076B7] text-lg font-bold">
              {billPay?.finalPrice ? formatMoneyVND(billPay?.finalPrice) : 'Đang tải'} vnđ
            </span>
          </div>
        </div>

        <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Phương thức thanh toán
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-normal max-w-[180px] text-right">
                Thanh toán VNPAY (Powered ChaiPay)
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Ngày đăng ký
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {billPay?.createdTime ? formatTime(billPay?.createdTime) : 'Đang tải'}
              </p>
            </div>
          </div>

          {/* <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Ngày xét duyệt
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                10:00 - 12/07/2024
              </p>
            </div>
          </div> */}
        </div>
      </div>
    )
  }

  const boxFooterPayment = () => {
    return (
      <div className="page-2 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-between">
            <p className="block text-sm font-normal text-gray-900">
              Tổng thanh toán:
            </p>
            <h3 className="text-base font-medium text-[#0076B7]">
              {billPay?.finalPrice ? formatMoneyVND(billPay?.finalPrice) : 'Đang tải'} VND
            </h3>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <Link
              to={`/buill-detail/${id}`}
              className="px-[20px] py-2 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-lg font-normal text-white text-center"
            >
              Tiếp tục
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const lookUpAgain = () => {
    return (
      <div className="page-2 bg-white">
        <div className="flex flex-col">
          <div className="flex flex-row content-center justify-center items-center">
            <button
              onClick={() => {
                navigate("/register-BHYT/", { state: { data: insurance.current, type: 'updated' } });
              }}
              className="px-[20px] py-2 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-lg font-normal text-white text-center"
            >
              Tra cứu lại
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <HeaderBase
        isHome={false}
        title={"Thông tin chi tiết"}
        onBack={() => navigate('/list-history-bhyt')}
      />

      <div className={`bg-[${switchColor(billPay?.insuranceOrderStatusId)}] h-10 flex justify-between px-4 items-center text-white text-base font-normal`}>
        <div>Trạng thái</div>
        <div>{billPay?.insuranceOrderStatusName}</div>
      </div>

      <div className="page-1 flex flex-col gap-4 mb-4">

        <div className="">
          {boxBuyer()}
          {line()}

        </div >

        {boxInfo()}

      </div>


      {billPay?.insuranceOrderStatusId == PENDING &&
        boxFooterPayment()
      }

      {billPay?.insuranceOrderStatusId == CANCELED &&
        lookUpAgain()
      }
    </div>
  );
};

export default InfoDetailBHYT;
