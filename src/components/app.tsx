// src/App.js

import React, { Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import LayoutPage from "../layout/layuot";
import ContractPage from "../pages/contractPage";
import HistoryPage from "../pages/historyPage";
import UserPage from "../pages/user";
import ListSocialInsurance from "../pages/listSocialInsurance";
import ListHealthInsurance from "../pages/listHealthInsurance";
import ProductDetailPage from "./productDetail";
import BillPayPage from "./billPay";
import BillPayBHYTPage from './billPayBHYT';
import BuillDetailPage from "../pages/billDetail";
import RegisterBHXH from "./registerBHXH";
import RegisterBHYT from "./RegisterBHYT";
import ProductDetailPage1 from "./productDetail-1";
import HistoryUnpaidPage from "./historyUnpaid";
import ListsHistoryPage from "../pages/listsHistoryPage";
import HistoryUnpaid1Page from "./historyUnpaid1";
import HistoryUnpaid2Page from "./historyUnpaid2";
import { SpecificProvider } from "./SpecificContext";

const MyApp = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Đang tải...</div>}>
        <App>
          <ToastContainer
            style={{
              width: "80%",
              borderRadius: '20px',
              marginTop: '40px',
              marginLeft: '10%',
              marginRight: '10%',
            }}
            toastStyle={{
              borderRadius: '7px'
            }}
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <SnackbarProvider>
            <ZMPRouter>
              <Routes>
                <Route path="/" element={<LayoutPage />}>
                  <Route index element={<HomePage />} />
                  <Route path="contract" element={<ContractPage />} />
                  <Route path="history" element={<HistoryPage />} />
                  <Route path="user" element={<UserPage />} />
                </Route>
                <Route
                  path="/social-insurance"
                  element={
                    <SpecificProvider>
                      <ListSocialInsurance />
                    </SpecificProvider>
                  }
                />
                <Route
                  path="/health-insurance"
                  element={<ListHealthInsurance />}
                />
                <Route
                  path="/product-detail/:id"
                  element={<ProductDetailPage />}
                />
                <Route
                  path="/product-detail-1/:id"
                  element={<ProductDetailPage1 />}
                />
                <Route
                  path="/buill-pay/:id"
                  element={
                    <SpecificProvider>
                      <BillPayPage w={""} h={""} url={""} />
                    </SpecificProvider>
                  }
                />
                <Route
                  path="/bill-pay-bhyt/"
                  element={
                    <BillPayBHYTPage w={""} h={""} url={""} />
                  }
                />
                <Route
                  path="/buill-detail/:id"
                  element={
                    <SpecificProvider>
                      <BuillDetailPage />
                    </SpecificProvider>
                  }
                />
                <Route
                  path="/register-BHXH"
                  element={
                    <SpecificProvider>
                      <RegisterBHXH />
                    </SpecificProvider>
                  }
                />
                <Route
                  path="/register-BHYT/"
                  element={<RegisterBHYT />}
                />
                <Route
                  path="/lists-history"
                  element={<ListsHistoryPage w={""} h={""} url={""} />}
                />
                <Route
                  path="/history-unpaid/:id"
                  element={<HistoryUnpaidPage />}
                />
                <Route
                  path="/history-unpaid-1/:id"
                  element={<HistoryUnpaid1Page />}
                />
                <Route
                  path="/history-unpaid-2/:id"
                  element={<HistoryUnpaid2Page />}
                />
              </Routes>
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </Suspense>
    </RecoilRoot>
  );
};

export default MyApp;
