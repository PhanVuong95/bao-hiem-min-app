import { Input } from "antd"
import React from "react"
import { Page } from "zmp-ui"
import HeaderBase from "../components/header_base"

const RegisterCollaborate = () => {

  const inputFullNamCollaborate = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Họ tên chủ hộ <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          // value={fullNamHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Họ và tên"
          onChange={(e) => {
            // setFullNamHouseHoldParticipant(e.target.value);

            // registerInfoBHYT.houseHold.chuHoTen = e.target.value

          }}
        />
      </div>
    )
  }

  const inputCCCDCollaborate = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số CCCD chủ hộ <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"

          maxLength={12}
          // ref={refs.cccdHouseHoldParticipant}
          // value={cccdHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Số CCCD"
          onChange={(e) => {
            // setCCCDHouseHoldParticipant(e.target.value);

            // registerInfoBHYT.houseHold.soGiayToCaNhan = e.target.value
          }}
        />
      </div>
    )
  }

  const inputPhoneCollaborate = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số CCCD chủ hộ <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"

          maxLength={12}
          // ref={refs.cccdHouseHoldParticipant}
          // value={cccdHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Số CCCD"
          onChange={(e) => {
            // setCCCDHouseHoldParticipant(e.target.value);

            // registerInfoBHYT.houseHold.soGiayToCaNhan = e.target.value
          }}
        />
      </div>
    )
  }

  const inputEmailCollaborate = () => {
    return (
      <div className="mt-4">
        <label className="block text-sm font-normal text-gray-900 pb-2">
          Số CCCD chủ hộ <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"

          maxLength={12}
          // ref={refs.cccdHouseHoldParticipant}
          // value={cccdHouseHoldParticipant}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Số CCCD"
          onChange={(e) => {
            // setCCCDHouseHoldParticipant(e.target.value);

            // registerInfoBHYT.houseHold.soGiayToCaNhan = e.target.value
          }}
        />
      </div>
    )
  }



  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Đăng ký cộng tác viên"
      />

      <Page className=" mt-20">
        {inputFullNamCollaborate()}

        {inputCCCDCollaborate()}

        {inputPhoneCollaborate()}

        {inputEmailCollaborate()}

      </Page>

    </div>
  )
}


export default RegisterCollaborate