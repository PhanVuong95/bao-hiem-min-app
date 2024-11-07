import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "zmp-ui";
import HeaderBase from "../components/header_base";
import Modal from 'react-modal';
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";


const PartnerTermsPage = () => {

  const [isShowModal, setIsShowModal] = useState(false)
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false)
  const [isChecked, setIsChecked] = useState(false)


  const getStatusRegisterContributor = async () => {
    const token = localStorage.token;

    try {
      const response = await axios.get(
        `${BASE_URL}/account/api/check-register-contributor`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "208" && response.data.message == "NOTEXISTORDER") {
        setIsRegistered(false)
      }

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        setIsRegistered(true)
      }
    } catch (error) {
      setIsRegistered(false)
    }


  }

  useEffect(() => {
    getStatusRegisterContributor()
  }, []);

  const modal = () => {
    return (
      <Modal
        isOpen={isShowModal}
        ariaHideApp={false}
        onRequestClose={() => setIsShowModal(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '15px',
            padding: 0,
            width: '90%',
            height: '25%',
            overflow: 'auto',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <div className="p-4 w-[100%] bg-white items-center justify-center rounded-xl">
          <div className="text-center text-[18px] font-semibold  mt-3">Bạn chưa đủ điều kiện đăng ký cộng tác viên</div>
          <div className="text-center text-[15x] font-normal mt-3">Bạn cần đăng ký 1 hợp đồng bảo hiểm để trở thành cộng tác viên</div>

          <button
            className="px-[24px]  mt-6 py-2 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            onClick={() => {
              setIsShowModal(false)
            }}
          >
            Đồng ý
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Điều khoản đối tác"
      />

      <Page className="page mt-20">
        <div className="rounded-lg no-scrollbar bg-white p-4 text-justify overflow-scroll" style={{ height: '70vh' }}>
          What is Lorem Ipsum?
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


          Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

        </div>

        <div>
          <div className="flex rounded-lg bg-white p-4 text-justify mt-4 items-start">
            <input
              type="checkbox"
              onChange={(e) => {
                setIsChecked(!isChecked)
              }}
              className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
              id="unchecked-circular-checkbox"
            />
            <label
              htmlFor="unchecked-circular-checkbox"
              className="text-[16.7px] font-normal text-[#000] w-[96%] ml-3"
            >
              Tôi đã hiểu và đồng ý
              <Link to={"/privacy_policy"}>
                <strong className="text-[#0076B7] font-bold">
                  {" "}
                  Chính sách và điều khoản của đối tác
                </strong>
              </Link>
            </label>
          </div>
          <button
            className="px-[24px]  mt-6 py-2 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            onClick={() => {
              if (!isChecked) {
                toast.warning("Vui lòng chấp nhận điều khoản chính sách");
                return;
              }

              isRegistered == true ? navigate(`/register-collaborate/`) : setIsShowModal(true)

            }}
          >
            Đồng ý
          </button>
        </div>

        {modal()}

      </Page>
    </div>
  )
}

export default PartnerTermsPage;