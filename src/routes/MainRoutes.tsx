import React from 'react';

import { RequireAuth } from '../helpers/RequireAuth';

import { Route, Routes } from 'react-router-dom';
import { Home } from "../pages/Home/Home";
import { NotFound } from '../pages/NotFound/NotFound';
import { SignIn } from '../pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp/SignUp';
import { AdPage } from '../pages/AdPage/AdPage';
import { AddAd } from '../pages/AddAd/AddAd';
import { Ads } from '../pages/Ads/Ads';
import { Account } from '../pages/Account/Account';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/olx-reactjs" element={<Home />} />
      <Route path="/olx-reactjs/signin" element={<SignIn />} />
      <Route path="/olx-reactjs/signup" element={<SignUp />} />
      <Route path="/olx-reactjs/ad/:id" element={<AdPage />} />
      <Route path="/olx-reactjs/post-an-ad" element={
        <RequireAuth>
          <AddAd />
        </RequireAuth>
      } />
      <Route path="/olx-reactjs/ads" element={<Ads />} />
      <Route path="/olx-reactjs/my-account" element={
        <RequireAuth>
          <Account />
        </RequireAuth>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
} 