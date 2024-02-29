import Image from "next/image";
import React, { useEffect } from "react";
import Button from "./common/Button";
import { Input } from "./common/Input";
import { TextArea } from "./common/TextArea";
import { useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { useUserStore } from "@/hooks/state/userState";
import Cookie from "js-cookie";
import { SigninDataProp } from "@/endpoints/auth";
import { toast } from "react-toastify";
import { useUpdateUser } from "@/hooks/mutation/useUpdateUser";

const ProfileSetting = () => {
  // Page for editing profile details
  const handleLogout = () => {
    localStorage.removeItem("@ownerpreneurUser");
    toast.success("User logged out");
    Cookie.remove("accessToken");
    Cookie.remove("refresh-token");
    window.location.href = "/";
  };
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SigninDataProp["user"]>();
  const onerror = (error: any) => {
    console.log(error);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDefaultValues = () => {
    if (user.email === "") {
      window.location.href = "/";
    }
    if (user.first_name) setValue("first_name", user.first_name);
    if (user.last_name) setValue("last_name", user.last_name);
    if (user.email) setValue("email", user.email);
    if (user.bio) setValue("bio", user.bio);
    if (user.occupation) setValue("occupation", user.occupation);
    if (user.personal_link) setValue("personal_link", user.personal_link);
    if (user.location) setValue("location", user.location);
  };
  useEffect(() => {
    setDefaultValues();
  }, [
    setDefaultValues,
    setValue,
    user.bio,
    user.email,
    user.first_name,
    user.last_name,
    user.location,
    user.occupation,
    user.personal_link,
  ]);
  const { mutate } = useUpdateUser();
  const onSubmit = (data: any) => {
    console.log(data);
    const newData = {
      id: user.id,
      data,
    };
    // mutate(data, {
    //   onSuccess: (res) => {
    //     toast.success("User updated");
    //   },
    //   onError: (error) => {
    //     console.log("erro", error);

    //     toast.error("Something went wrong");
    //   },
    // });
  };
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div>
      <p className="pb-8 md:text-4xl text-3xl  font-gt-walsheim-regular">
        Profile Settings
      </p>
      <div className="sm:px-8 px-4 py-12 bg-white md:px-16 font-gt-walsheim-regular">
        {/* User details */}
        <div className="flex flex-col items-center justify-between pb-6 border-b-2 tab:flex-row">
          <div className="flex flex-col items-center gap-1 tab:gap-4 tab:flex-row">
            <div className="w-14 h-14 relative">
              <Image
                // src="/assets/imgs/user.png"
                src={`${
                  user.auth_type === "google"
                    ? user.image
                    : `${BASE_URL}/assets/${user.image}`
                }`}
                fill
                alt="profile"
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col items-center tab:items-start">
              <div className="flex gap-4">
                <p className="text-lg">{user.first_name + user.last_name}</p>
                <Button
                  variant="primary"
                  className="px-4 !py-1 rounded-md tab:block hidden"
                >
                  Free Plan
                </Button>
              </div>
              <p className=" text-brand-gray-500 font-gt-walsheim-light">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-4 tab:mt-0">
            <Button
              variant="primary"
              className="px-4 !py-1 rounded-md tab:hidden block"
            >
              Free Plan
            </Button>
            {/* <Button variant="secondary" className="border-2 !py-1">
              Upgrade
            </Button> */}
          </div>
        </div>

        {/* Inputs Fields */}
        <form onSubmit={handleSubmit(onSubmit, onerror)}>
          <div className="grid mt-10 tab:grid-cols-2 tab:grid-rows-3 gap-x-8 md:gap-y-10 gap-y-6">
            <Input
              register={register}
              name="first_name"
              icon={
                <AiOutlineGoogle className="text-2xl text-brand-gray-500" />
              }
              iconPosition="right"
              disabled={true}
              type="text"
              label={"First Name (managed by google account)"}
              placeholderText="Benjamin Campbell"
              error={errors.first_name?.message}
            />

            <Input
              register={register}
              name="last_name"
              icon={
                <AiOutlineGoogle className="text-2xl text-brand-gray-500" />
              }
              iconPosition="right"
              type="text"
              disabled={true}
              label={"Last Name (managed by google account)"}
              placeholderText="Benjamin Campbell"
              error={errors.last_name?.message}
            />

            <Input
              register={register}
              icon={
                <AiOutlineGoogle className="text-2xl text-brand-gray-500" />
              }
              iconPosition="right"
              name="email"
              type="email"
              disabled={true}
              label={"Email (managed by google account)"}
              placeholderText="benjaminc@mail.com"
              error={errors.email?.message}
            />
            <Input
              register={register}
              icon={
                <MdModeEditOutline className="text-2xl text-brand-gray-500" />
              }
              iconPosition="right"
              type="text"
              name="occupation"
              label={"Occupation"}
              placeholderText="COO, Twitter Corp."
              error={errors.occupation?.message}
            />
            <Input
              register={register}
              icon={
                <MdModeEditOutline className="text-2xl text-brand-gray-500" />
              }
              iconPosition="right"
              type="text"
              label={"Location"}
              name="location"
              placeholderText="Amsterdam, Netherlands"
              error={errors.location?.message}
            />
            <Input
              register={register}
              icon={
                <MdModeEditOutline className="text-2xl text-brand-gray-500" />
              }
              iconPosition="right"
              type="text"
              name="personal_link"
              label={"Personal Link"}
              placeholderText="https://www.twitter.com/x"
              error={errors.personal_link?.message}
            />
            <div className="col-span-1 tab:col-span-2 ">
              <TextArea
                register={register}
                name="bio"
                label={"Bio"}
                placeholderText="Embarking on an extraordinary journey fueled by unyielding determination, Benjamin Campbell has epitomized the essence of a visionary entrepreneur. Through uncharted challenges and triumphant successes."
                error={errors.bio?.message}
              />
            </div>
          </div>
          <div className="flex justify-between items-center md:mt-28 mt-20">
            <div>
              <Button
                variant="tertiary"
                onClick={() => handleLogout()}
                className="py-2 rounded-md bg-red-500 text-white px-4"
              >
                Logout
              </Button>
            </div>

            <div className="flex justify-end sm:gap-10 gap-4 xs:gap-6  xs:flex-row flex-col">
              <Button
                variant="secondary"
                className="py-2 border-2 rounded-md !border-brand-gray-500 !text-brand-gray-500 hover:bg-white"
                onClick={() => setDefaultValues()}
              >
                Cancel
              </Button>
              <Button
                // variant="primary"
                className="!py-1 rounded-md"
                type="submit"
                onClick={() => handleSubmit(onSubmit, onerror)}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetting;
