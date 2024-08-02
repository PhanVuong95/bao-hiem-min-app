// src/App.js

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { FaHeadset } from "react-icons/fa";

import HomePage from "../pages";
import LayoutPage from "../layout/layuot";
import ContractPage from "../pages/contractPage";
import HistoryPage from "../pages/historyPage";
import UserPage from "../pages/user";
import ListSocialInsurance from "../pages/listSocialInsurance";
import ListHealthInsurance from "../pages/listHealthInsurance";
import ProductDetailPage from "./productDetail";
import BillPayPage from "./billPay";
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
      <App>
        <ToastContainer />
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
                path="/register-BHYT"
                element={<RegisterBHYT w={""} h={""} url={""} />}
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
    </RecoilRoot>
  );
};

export default MyApp;
