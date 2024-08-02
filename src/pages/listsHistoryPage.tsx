import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Widthheight } from "../models";
import axios from "axios";
const ListsHistoryPage: React.FC<Widthheight> = ({ url }) => {
  const PENDING = 1001;
  const DONE = 1002;
  const CANCELED = 1003;

  const [openTab, setOpenTab] = useState(1);
  const [listOrder, setListOrder] = useState([]);
  const token = localStorage.token;
  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/insuranceorder/api/list-by-accountId", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let fillteredOrders: any = [];
        response.data.data.forEach((item) => {
          if (item.insuranceOrderStatusId == DONE && openTab == 2) {
            fillteredOrders.push(item);
          } else if (
            (item.insuranceOrderStatusId == PENDING && openTab == 1) ||
            (item.insuranceOrderStatusId == CANCELED && openTab == 1)
          ) {
            fillteredOrders.push(item);
          }
        });
        setListOrder(fillteredOrders);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [openTab]);
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  }
  return (
    <div className="page-1">
      <div className="max-w-md mx-auto">
        <div className="mb-4 flex space-x-4 p-1 bg-white rounded-lg shadow-md">
          <button
            onClick={() => setOpenTab(1)}
            className={`flex-1 py-2 px-[24px] rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
              openTab === 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            Đang mua
          </button>
          <button
            onClick={() => setOpenTab(2)}
            className={`flex-1 py-2 px-[24px] rounded-md text-base focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
              openTab === 2 ? "bg-blue-600 text-white" : ""
            }`}
          >
            Đã mua
          </button>
        </div>

        {openTab === 1 && (
          <div className="flex flex-col gap-4">
            {listOrder?.map((item, index) => {
              return (
                <Link to="/history-unpaid/1" key={index}>
                  <div className="p-4 bg-white w-full rounded-xl flex flex-col gap-4">
                    <div className="flex gap-[10px]">
                      <img src="https://dion.vn/wp-content/uploads/2024/07/image-1004.png" />
                      <div className="title-product flex flex-col">
                        <h3 className="text-[#0076B7] text-lg font-medium">
                          BH Xã Hội Tự nguyện
                        </h3>
                        <p className="text-[#646464] text-sm font-normal">
                          {item.monthInsured} tháng
                        </p>
                        <span className="text-[#0076B7] text-lg font-bold">
                          {item.finalPrice.toLocaleString("vi-VN")} VND
                        </span>
                      </div>
                    </div>

                    <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Trạng thái
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-[${
                              item.insuranceOrderStatusId == PENDING
                                ? "#FAAD14"
                                : ""
                            }${
                              item.insuranceOrderStatusId == CANCELED
                                ? "#F00"
                                : ""
                            }] text-sm font-semibold max-w-[142px] text-right`}
                          >
                            {item.insuranceOrderStatusName}
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
                          <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                            {formatDateTime(item.createdTime)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Người mua
                          </p>
                        </div>
                        <div>
                          <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                            {item.fullName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {openTab === 2 && (
          <div className="flex flex-col gap-4">
            {listOrder?.map((item, index) => {
              return (
                <Link to="/history-unpaid/1" key={index}>
                  <div className="p-4 bg-white w-full rounded-xl flex flex-col gap-4">
                    <div className="flex gap-[10px]">
                      <img src="https://dion.vn/wp-content/uploads/2024/07/image-1004.png" />
                      <div className="title-product flex flex-col">
                        <h3 className="text-[#0076B7] text-lg font-medium">
                          BH Xã Hội Tự nguyện
                        </h3>
                        <p className="text-[#646464] text-sm font-normal">
                          {item.monthInsured} tháng
                        </p>
                        <span className="text-[#0076B7] text-lg font-bold">
                          {item.finalPrice.toLocaleString("vi-VN")} VND
                        </span>
                      </div>
                    </div>

                    <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Trạng thái
                          </p>
                        </div>
                        <div>
                          <p
                            className={`text-[#00BA00] text-sm font-semibold max-w-[142px] text-right`}
                          >
                            {item.insuranceOrderStatusName}
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
                          <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                            {formatDateTime(item.createdTime)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-[#646464] text-sm font-normal">
                            Người mua
                          </p>
                        </div>
                        <div>
                          <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                            {item.fullName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListsHistoryPage;
