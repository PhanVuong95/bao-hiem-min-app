import React from "react";
import { Link } from "react-router-dom";
import CardProduct from "../components/cardProduct";
import SelectCategory from "../components/selectCategory";

const ListHealthInsurance: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-[16px] px-4 py-[24px]">
      <SelectCategory />
      <div className="flex flex-col gap-8">
        <CardProduct url={"/register-BHYT"} w={""} h={""} />

        {/* <div className="p-4 bg-white w-full rounded-xl flex flex-col gap-4">
          <div className="flex gap-[10px]">
            <img src="https://dion.vn/wp-content/uploads/2024/07/image-1004.png" />
            <div className="title-product flex flex-col">
              <h3 className="text-[#0076B7] text-lg font-medium">
                BH Y tế hộ gia đình
              </h3>

              <p className="text-[#646464] text-sm font-normal">12 tháng</p>
              <span className="text-[#0076B7] text-lg font-bold">
                1.263.000 đ
                <samp className="text-[#646464] text-sm font-normal">/năm</samp>
              </span>
            </div>
          </div>

          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">Dành cho</p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                  Tất cả mọi người
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">
                  Trợ cấp khám chữa bệnh
                </p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                  Theo quy định về mức hưởng
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">
                  Giới hạn tuổi
                </p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                  Không giới giạn
                </p>
              </div>
            </div>
          </div>

          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Quyền lợi nổi trội
              </p>
            </div>

            <div className="flex flex-row w-full gap-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5038 1.31775C15.5771 1.31775 19.6914 5.43207 19.6914 10.5053C19.6914 15.5786 15.5771 19.6929 10.5038 19.6929C5.43051 19.6929 1.31619 15.5786 1.31619 10.5053C1.31619 5.43207 5.43051 1.31775 10.5038 1.31775ZM8.59587 13.4895L6.34652 11.2383C5.96331 10.8549 5.96323 10.2296 6.34652 9.84626C6.72989 9.46297 7.35795 9.46537 7.73853 9.84626L9.32431 11.4333L13.2692 7.4884C13.6526 7.10503 14.2779 7.10503 14.6612 7.4884C15.0446 7.87169 15.044 8.49758 14.6612 8.88041L10.0192 13.5224C9.63637 13.9052 9.01047 13.9058 8.62718 13.5224C8.61641 13.5116 8.60602 13.5007 8.59587 13.4895Z"
                    fill="#00BA00"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-normal ">
                  Được cấp thẻ BHYT qua ứng dụng VSSID
                </p>
              </div>
            </div>

            <div className="flex flex-row w-full gap-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5038 1.31775C15.5771 1.31775 19.6914 5.43207 19.6914 10.5053C19.6914 15.5786 15.5771 19.6929 10.5038 19.6929C5.43051 19.6929 1.31619 15.5786 1.31619 10.5053C1.31619 5.43207 5.43051 1.31775 10.5038 1.31775ZM8.59587 13.4895L6.34652 11.2383C5.96331 10.8549 5.96323 10.2296 6.34652 9.84626C6.72989 9.46297 7.35795 9.46537 7.73853 9.84626L9.32431 11.4333L13.2692 7.4884C13.6526 7.10503 14.2779 7.10503 14.6612 7.4884C15.0446 7.87169 15.044 8.49758 14.6612 8.88041L10.0192 13.5224C9.63637 13.9052 9.01047 13.9058 8.62718 13.5224C8.61641 13.5116 8.60602 13.5007 8.59587 13.4895Z"
                    fill="#00BA00"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-normal ">
                  Được chi trả chi phí khám chữa bệnh (KCB) trong phạm vi quyền
                  lợi và mức hưởng
                </p>
              </div>
            </div>

            <div className="flex flex-row w-full gap-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5038 1.31775C15.5771 1.31775 19.6914 5.43207 19.6914 10.5053C19.6914 15.5786 15.5771 19.6929 10.5038 19.6929C5.43051 19.6929 1.31619 15.5786 1.31619 10.5053C1.31619 5.43207 5.43051 1.31775 10.5038 1.31775ZM8.59587 13.4895L6.34652 11.2383C5.96331 10.8549 5.96323 10.2296 6.34652 9.84626C6.72989 9.46297 7.35795 9.46537 7.73853 9.84626L9.32431 11.4333L13.2692 7.4884C13.6526 7.10503 14.2779 7.10503 14.6612 7.4884C15.0446 7.87169 15.044 8.49758 14.6612 8.88041L10.0192 13.5224C9.63637 13.9052 9.01047 13.9058 8.62718 13.5224C8.61641 13.5116 8.60602 13.5007 8.59587 13.4895Z"
                    fill="#00BA00"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-normal ">
                  Được lựa chọn và thay đổi nơi đăng ký KCB bạn đầu
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center gap-[10px] my-4 ">
            <div>
              <Link
                to="/product-detail-1/1"
                className="px-[38px] py-3 rounded-full bg-[#DEE7FE] text-[15px] font-medium text-[#0076B7]"
              >
                Xem chi tiết
              </Link>
            </div>
            <div>
              <Link
                to="/register-BHYT"
                className="px-[38px] py-3 rounded-full bg-[#0076B7] text-[15px] font-medium text-[#fff]"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
     */}
      </div>
    </div>
  );
};

export default ListHealthInsurance;
