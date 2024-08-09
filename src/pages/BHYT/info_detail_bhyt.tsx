import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import HeaderBase from "../../components/headerBase";
import { useParams } from "react-router-dom";
import { formatDate, formatMoneyVND, formatPhoneNumber, isValidEmptyString } from "../../utils/validateString";

const InfoDetailBHYT: React.FunctionComponent = () => {
  const { id } = useParams();
  const [billPay, setBillPay] = useState<any>();
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [selectedCheckbox, setSelectedCheckbox] = useState("");

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

  const handleCheckboxChange = (value) => {
    setSelectedCheckbox(value);
  };

  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/insuranceorder/api/detail-by-vm/" + id)
      .then((response) => {
        setBillPay(response.data.data[0]);
        setLoading(false);
        console.log(response.data);

      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [])

  const boxBuyer = () => {
    return (
      <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
        <h3 className="text-base font-medium text-[#0076B7]">
          Người mua bảo hiểm
        </h3>

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
      </div>
    )
  }

  const boxBeneficiary = (item, index) => {
    return (
      <div className="p-4 bg-white rounded-xl flex flex-col gap-6 mt-4">
        <h3 className="text-base font-medium text-[#0076B7]">
          `Thông tin người số {index + 1} được bảo hiểm`
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
              {isValidEmptyString(item?.citizenId) ? "Chưa cập nhật" : item?.citizenId.trim()}
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

  const methodPayment = () => {
    return (

      <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Phương thức thanh toán
          </h3>
          <div className="flex gap-3">
            <input
              type="checkbox"
              className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
              checked={true}
              onChange={() => handleCheckboxChange("vnpay")}
              id="vnpay-checkbox"
            />
            <label
              htmlFor="vnpay-checkbox"
              className="text-sm font-normal text-[#000] w-[96%]"
            >
              Thanh toán VNPAY (Powered ChaiPay)
            </label>
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
          {loading ? <div></div> :
            billPay.listInsuredPerson.map((item, index) => {
              return boxBeneficiary(item, index)
            })}
        </div >

        {billPay?.insuranceOrderStatusId == PENDING && methodPayment()}
      </div>
      {billPay?.insuranceOrderStatusId == PENDING &&
        (
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
                  className="px-[20px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
                >
                  Tiếp tục
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default InfoDetailBHYT;
