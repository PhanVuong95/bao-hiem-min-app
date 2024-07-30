import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Widthheight } from "../models";

const ListsHistoryPage: React.FC<Widthheight> = ({ url }) => {
  const [openTab, setOpenTab] = useState(1);

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
            <Link to="/history-unpaid/1">
              <div className="p-4 bg-white w-full rounded-xl flex flex-col gap-4">
                <div className="flex gap-[10px]">
                  <img src="https://dion.vn/wp-content/uploads/2024/07/image-1004.png" />
                  <div className="title-product flex flex-col">
                    <h3 className="text-[#0076B7] text-lg font-medium">
                      BH Xã Hội Tự nguyện
                    </h3>
                    <p className="text-[#646464] text-sm font-normal">
                      12 tháng
                    </p>
                    <span className="text-[#0076B7] text-lg font-bold">
                      18.084.000 VND
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
                      <p className="text-[#FAAD14] text-sm font-semibold max-w-[142px] text-right">
                        Chưa thanh toán
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
                        08:00 - 12/07/2024
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
                        Trần Đăng Trung
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/history-unpaid-2/1">
              <div className="p-4 bg-white w-full rounded-xl flex flex-col gap-4">
                <div className="flex gap-[10px]">
                  <img src="https://dion.vn/wp-content/uploads/2024/07/image-1004.png" />
                  <div className="title-product flex flex-col">
                    <h3 className="text-[#0076B7] text-lg font-medium">
                      BH Xã Hội Tự nguyện
                    </h3>
                    <p className="text-[#646464] text-sm font-normal">
                      12 tháng
                    </p>
                    <span className="text-[#0076B7] text-lg font-bold">
                      18.084.000 VND
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
                      <p className="text-[#F00] text-sm font-semibold max-w-[142px] text-right">
                        Không thành công
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
                        08:00 - 12/07/2024
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
                        Trần Đăng Trung
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {openTab === 2 && (
          <div className="flex flex-col gap-4">
            <Link to="/history-unpaid-1/1">
              <div className="p-4 bg-white w-full rounded-xl flex flex-col gap-4">
                <div className="flex gap-[10px]">
                  <img src="https://dion.vn/wp-content/uploads/2024/07/image-1004.png" />
                  <div className="title-product flex flex-col">
                    <h3 className="text-[#0076B7] text-lg font-medium">
                      BH Xã Hội Tự nguyện
                    </h3>
                    <p className="text-[#646464] text-sm font-normal">
                      12 tháng
                    </p>
                    <span className="text-[#0076B7] text-lg font-bold">
                      18.084.000 VND
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
                      <p className="text-[#00BA00] text-sm font-semibold max-w-[142px] text-right">
                        Hoàn thành
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
                        08:00 - 12/07/2024
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
                        Trần Đăng Trung
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListsHistoryPage;
