import { DatePicker, Input, Select } from "antd";
import React from "react";
import iconClose from '../../assets-src/close_1.png'
import { registerInfoBHYT } from "../pages/BHYT/list_health_insurance";
import "../locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs from "dayjs";
import { convertListToSelect, formatDate2 } from "../utils/validateString";

interface Props {
  item: any;
  index: number;
  members: any;
  ethnicLists: any;
  onClose: (index) => void;
  refs: any;
}

const CardMembersHouseHold = (props: Props) => {
  const { item, index, members, ethnicLists, onClose, refs } = props;

  const dateFormat = "DD/MM/YYYY";

  const inputFullNameMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          ref={refs.name}
          defaultValue={registerInfoBHYT.houseHold.houseHoldPeoples[index].name}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Họ và tên"
          onChange={(e) => {

            registerInfoBHYT.houseHold.houseHoldPeoples[index].name = e.target.value

          }}
        />
      </div>
    )
  }

  const inputRelationshipMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Môi quan hệ <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.relationShipId}
          placeholder="Chọn mối quan hệ"
          defaultValue={registerInfoBHYT.houseHold.houseHoldPeoples[index].relationShipId}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {

            registerInfoBHYT.houseHold.houseHoldPeoples[index].relationShipId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn mối quan hệ" },
            { value: "Bố ruột", label: "Bố ruột" },
            { value: "Mẹ ruột", label: "Mẹ ruột" },
          ]}
        />
      </div>
    )
  }

  const inputCCCDMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số CCCD <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          maxLength={12}
          ref={refs.citizenId}
          defaultValue={registerInfoBHYT.houseHold.houseHoldPeoples[index].citizenId}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập CCCD"
          onChange={(e) => {

            registerInfoBHYT.houseHold.houseHoldPeoples[index].citizenId = e.target.value

          }}
        />
      </div>
    )
  }

  const inputGenderMemder = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Giới tính <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          ref={refs.gender}
          placeholder="Chọn giới tính"
          defaultValue={registerInfoBHYT.houseHold.houseHoldPeoples[index].gender}
          dropdownMatchSelectWidth={false}
          onChange={(value) => {

            registerInfoBHYT.houseHold.houseHoldPeoples[index].gender = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            { value: "", label: "Chọn giới tính" },
            { value: "Nam", label: "Nam" },
            { value: "Nữ", label: "Nữ" },
          ]}
        />
      </div>
    )
  }

  const inputEthnicMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Dân tộc <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          dropdownStyle={{ maxWidth: '300px' }}
          showSearch
          ref={refs.ethnicId}
          defaultValue={registerInfoBHYT.houseHold.houseHoldPeoples[index].ethnicId}
          dropdownMatchSelectWidth={false}
          placeholder="Chọn dân tộc"
          onChange={(value) => {

            registerInfoBHYT.houseHold.houseHoldPeoples[index].ethnicId = value

          }}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={
            convertListToSelect(ethnicLists, "Chọn dân tộc")
          }
        />
      </div>
    )
  }

  const inputDobMember = () => {
    return (
      <div>
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Ngày sinh <samp className="text-red-600">*</samp>
        </label>
        <DatePicker
          type="date"
          size="large"
          locale={locale}
          ref={refs.doB}
          className="w-[100%]"
          defaultValue={registerInfoBHYT.houseHold.houseHoldPeoples[index].doB == "" ? "" : dayjs(registerInfoBHYT.houseHold.houseHoldPeoples[index].doB, dateFormat)}
          placeholder="dd/mm/yyyy"
          onChange={(value) => {
            const dateObject = dayjs(value.toString());
            const dateStr = `${dateObject.date().toString().padStart(2, "0")}/${(
              dateObject.month() + 1
            )
              .toString()
              .padStart(2, "0")}/${dateObject.year()}`;

            registerInfoBHYT.houseHold.houseHoldPeoples[index].doB = dateStr;

          }}
          format={dateFormat}
          maxDate={dayjs(formatDate2(new Date()), dateFormat)}
        />
      </div>
    )
  }

  return (
    <div className="p-4 rounded-xl flex flex-col gap-4 border border-gray-300">
      <div className="flex justify-between">
        <div className="text-[#0076B7] text-sm font-medium">Thông tin thành viên số {index + 1}</div>
        {index != 0 ?
          <button type="button"
            onClick={() => {
              onClose(index)
            }}
          >
            <img src={iconClose} className="w-3 h-3" />
          </button>
          :
          null
        }
      </div>

      {/* Họ tên */}
      {inputFullNameMember()}

      {/* Số CCCD thành viên  */}
      {inputCCCDMember()}

      {/* Dân tộc */}
      {inputEthnicMember()}

      {/* Giới tính thành viên */}
      {inputGenderMemder()}

      {/* Mối quan hệ */}
      {inputRelationshipMember()}

      {/* Ngày sinh */}
      {inputDobMember()}

    </div>
  )
}

export default CardMembersHouseHold;

