import React from "react";
import { Link } from "react-router-dom";
import { Widthheight } from "../models";

const FooterPayPage: React.FC<Widthheight> = ({ url }) => {
  return (
    <div className="page-2 bg-white">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row content-center justify-between">
          <p className="block text-sm font-normal text-gray-900">
            Tổng thanh toán:
          </p>
          <h3 className="text-base font-medium text-[#0076B7]">
            18.084.000 VND
          </h3>
        </div>
        <div className="flex flex-row content-center justify-center items-center">
          <Link
            to={url}
            className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
          >
            Tiếp tục
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterPayPage;
