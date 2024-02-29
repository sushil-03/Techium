import React from "react";
import PageLayout from "../_layout";
import ProfileSetting from "@/components/ProfileSetting";

const index = () => {
  // Setting page to show user profile and subscription history
  return (
    <PageLayout>
      <div className="w-full h-full py-20 bg-brand-snow/20">
        <div className=" w-11/12 sm:w-5/6 mx-auto tab:w-9/12 ">
          {/* Profile Settings */}
          <ProfileSetting />
          {/* Subscription History */}
          {/* <SubscriptionHistory /> */}
        </div>
      </div>
    </PageLayout>
  );
};

export default index;
