import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "zmp-ui";

interface Props {
  isHome?: boolean;
  title?: String;
  onClose?: () => void;
  onActions?: () => void;
  onBack?: () => void;
}

const HeaderBase = (props: Props) => {
  const { isHome, title, onClose, onActions, onBack } = props;
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-10">
      <img src="../../assets-src/image_header.png" />

      <div className="absolute z-10 top-10 flex left-4 right-4 justify-between items-center">
        <div className="flex">
          <div>
            {isHome ? (
              <img src="../../assets-src/logo.png" className="w-7 h-7" />
            ) : (
              <button
                type="button"
                onClick={onBack ? onBack : () => navigate(-1)}
              >
                <img src="../../assets-src/back.png" className="w-7 h-7" />
              </button>
            )}
          </div>
          <div className="text-[#ffffff] ml-3 font-medium text-lg line-clamp-1">
            {isHome ? "Bảo hiểm Việt" : title}
          </div>
        </div>

        <div className="flex w-20 h-8 bg-[#1c6bc0a1] rounded-3xl items-center justify-between pl-3 pr-3 border-gray-500 border-5">
          <div className="">
            <img src="../../assets-src/dot.png" className="w-5 h-2 right-2" />
          </div>
          <div className="w-[1.5px] bg-[#BAE7FF40] h-4 "></div>
          <div>
            <img src="../../assets-src/close.png" className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBase;
