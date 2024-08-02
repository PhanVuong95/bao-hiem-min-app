import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SpecificContext } from "../components/SpecificContext";
import html2canvas from "html2canvas";
const BuillDetailPage: React.FunctionComponent = (props) => {
  const navigate = useNavigate();
  const specificContext = useContext(SpecificContext);
  const { insuranceOrder, setInsuranceOrder } = specificContext;
  const [base64QRCode, setBase64QRCode] = useState<string>("");
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardeName, setWardeName] = useState("");
  const [expiryDateString, setExpiryDateString] = useState("");
  const orderRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (orderRef.current) {
      const canvas = await html2canvas(orderRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "order-info.png";
      link.click();
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    axios
      .get(
        "https://baohiem.dion.vn/province/api/detail/" +
          insuranceOrder.provinceId
      )
      .then((response) => {
        setProvinceName(response.data.data[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(
        "https://baohiem.dion.vn/district/api/detail/" +
          insuranceOrder.districtId
      )
      .then((response) => {
        setDistrictName(response.data.data[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("https://baohiem.dion.vn/ward/api/detail/" + insuranceOrder.wardId)
      .then((response) => {
        setWardeName(response.data.data[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const GetQrCode = async () => {
    const token = localStorage.token;
    // const formData = new FormData();
    //   formData.append("file", file);
    try {
      const response = await axios.post(
        "https://baohiem.dion.vn/insuranceorder/api/create-payment?orderId=" +
          insuranceOrder.id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // return response.data.data[0];
      setBase64QRCode(response.data.data[0]);
      const now = new Date();
      now.setMinutes(now.getMinutes() + 30);
      setExpiryDateString(formatDate(now));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  useEffect(() => {
    GetQrCode();
  }, []);
  const formatDate = (date) => {
    // Lấy giờ, phút, ngày, tháng, năm từ đối tượng Date
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Định dạng thời gian theo 'hh:mm dd/mm/yyyy'
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };
  return (
    <>
      <div className="page-1 flex flex-col gap-4 mb-[32px]">
        <h3 className="text-[#0076B7] text-lg font-medium text-center">
          Hệ thống đang ghi nhận thanh toán
        </h3>
        <p className="text-[#000] text-sm font-normal text-center">
          Xin quý khách vui lòng chờ trong giây lát
        </p>
        <div
          ref={orderRef}
          className="p-4 bg-white rounded-xl flex flex-col gap-4"
        >
          <h3 className="text-[#0076B7] text-lg font-medium">
            Thông tin đơn hàng
          </h3>
          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Mã đơn hàng</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
                #{insuranceOrder.id}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Tình trạng thanh toán
              </p>
            </div>
            <div>
              <p className="text-[#FAAD14] text-sm font-semibold max-w-[190px] text-right">
                Chưa thanh toán
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Họ và tên</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
                {insuranceOrder.fullName}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Email</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.email}
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
                {insuranceOrder.phone}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Địa chỉ</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                {insuranceOrder.addressDetail}, {wardeName}, {districtName},{" "}
                {provinceName}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Gói bảo hiểm</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                BH Xã Hội Tự Nguyện
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Gói</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                Theo tháng
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Tổng cộng</p>
            </div>
            <div>
              <p className="text-[#0076B7] text-sm font-semibold max-w-[142px] text-right">
                {insuranceOrder.finalPrice.toLocaleString("vi-VN")} vnđ
              </p>
            </div>
          </div>
          <div>
            <img src={`data:image/png;base64,${base64QRCode}`} />
          </div>
          <i className="text-xs font-semibold text-center text-red-700">
            QR thanh toán sẽ hết hạn vào lúc {expiryDateString}
          </i>
        </div>
      </div>
      <div className="page-2 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-center items-center">
            <button
              onClick={handleDownload}
              className="px-[24px] py-3 bg-[#DEE7FE] w-full rounded-full bg-[#0076B7] text-base font-normal text-[#0076B7] text-center"
            >
              Tải xuống hóa đơn
            </button>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <Link
              to="/"
              className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            >
              Trở về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuillDetailPage;
