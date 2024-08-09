import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import FooterPayPage from "./footerPay";
import HeaderBase from "./headerBase";

const HistoryUnpaidPage: React.FunctionComponent = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState<any>();
  const [insuredPerson, setInsuredPerson] = useState<any>();
  const [orderStatusId, setOrderStatusId] = useState<number>(0);
  const PENDING = 1001;
  const DONE = 1002;
  const CANCELED = 1003;
  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/insuranceorder/api/Detail-By-VM/" + id)
      .then((response) => {
        console.log(response.data.data[0]);
        setOrderDetail(response.data.data[0]);
        setInsuredPerson(response.data.data[0].listInsuredPerson[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get(
        "https://baohiem.dion.vn/insuranceorder/api/check-order-status/" + id
      )
      .then((response) => {
        setOrderStatusId(response.data.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }
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
  if (!orderDetail || !insuredPerson || !orderStatusId) {
    return (
      <>
        <HeaderBase
          isHome={false}
          onBack={() => navigate("/lists-history")}
          title={"Thông tin chi tiết"}
        />
        <div className="fixed inset-0 flex items-center justify-center">
          <PulseLoader size={15} loading={true} color="#0076B7" />
        </div>
      </>
    );
  }
  return (
    <div>
      <HeaderBase
        isHome={false}
        onBack={() => navigate("/lists-history")}
        title={"Thông tin chi tiết"}
      />
      <div className="pt-20">
        <div
          className={`bg-[${orderStatusId == PENDING ? "#FAAD14" : ""}${
            orderStatusId == CANCELED ? "#F00" : ""
          }${
            orderStatusId == DONE ? "#00BA00" : ""
          }] py-[12px] px-4 flex flex-row items-center justify-between`}
        >
          <p className="text-white text-sm font-normal">Trạng thái</p>
          <p className="text-white text-sm font-semibold">
            {orderDetail.insuranceOrderStatusName}
          </p>
        </div>
        <div className="page-1 flex flex-col gap-4 mb-4">
          <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium text-[#0076B7]">
                Người mua bảo hiểm
              </h3>
              {orderStatusId == PENDING ? (
                <button
                  onClick={() => {
                    navigate("/update-bhxh/" + id);
                  }}
                  className="text-sm text-[#0076B7] underline"
                >
                  Chỉnh sửa
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">
                  Mã đơn hàng
                </p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
                  #{orderDetail.id}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">Họ và tên</p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
                  {orderDetail.fullName}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">Email</p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                  {orderDetail.email}
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
                  {orderDetail.phone}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">Địa chỉ</p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                  {orderDetail.addressDetail}, {orderDetail.wardName},{" "}
                  {orderDetail.districtName}, {orderDetail.provinceName}
                </p>
              </div>
            </div>

            <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

            <h3 className="text-base font-medium text-[#0076B7]">
              Thông tin người được bảo hiểm
            </h3>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">Họ và tên</p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
                  {insuredPerson.fullName}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">Số CCCD</p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                  {insuredPerson.citizenId}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">Số BHXH</p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                  {insuredPerson.socialInsuranceNumber}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">Ngày sinh</p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                  {formatDateString(insuredPerson.doB)}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">Giới tính</p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                  {insuredPerson.gender}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">Mức lương</p>
              </div>
              <div>
                <p className="text-[#0076B7] text-sm font-semibold max-w-[180px] text-right">
                  {insuredPerson.wage.toLocaleString("vi-VN")} vnđ
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">
                  Ngân sách hỗ trợ
                </p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                  {insuredPerson.supportBudget.toLocaleString("vi-VN")} vnđ
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
                  {insuredPerson.monthInsured} tháng
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">
                  Phí bảo hiểm
                </p>
              </div>
              <div>
                <p className="text-[#0076B7] text-sm font-semibold max-w-[180px] text-right">
                  {orderDetail.finalPrice.toLocaleString("vi-VN")} vnđ
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
            <h3 className="text-[#0076B7] text-lg font-medium">
              Danh mục sản phẩm
            </h3>
            <div className="flex gap-[10px]">
              <img src="https://dion.vn/wp-content/uploads/2024/07/image-1004.png" />
              <div className="title-product flex flex-col">
                <h3 className="text-[#0076B7] text-lg font-medium">
                  BH Xã Hội Tự nguyện
                </h3>
                <p className="text-[#646464] text-sm font-normal">Theo tháng</p>
                <span className="text-[#0076B7] text-lg font-bold">
                  22
                  <samp className="text-[#646464] text-sm font-normal">%</samp>
                </span>
              </div>
            </div>

            <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

            <div className="flex flex-col gap-2">
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
                    {formatDateTime(orderDetail.createdTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!(orderStatusId == CANCELED || orderStatusId == DONE) && (
          <div className="page-2 bg-white">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row content-center justify-between">
                <p className="block text-sm font-normal text-gray-900">
                  Tổng thanh toán:
                </p>
                <h3 className="text-base font-medium text-[#0076B7]">
                  {orderDetail.finalPrice.toLocaleString("vi-VN")} VND
                </h3>
              </div>
              <div className="flex flex-row content-center justify-center items-center">
                <Link
                  to={"/buill-detail/" + id}
                  className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
                >
                  Tiếp tục
                </Link>
              </div>
            </div>
          </div>
        )}
        {orderStatusId == CANCELED && (
          <div className="page-2 bg-white">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row content-center justify-center items-center">
                <Link
                  to={"/update-bhxh/" + id}
                  className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
                >
                  Tra cứu lại
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryUnpaidPage;
