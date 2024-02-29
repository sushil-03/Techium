import { Input } from "@/components/common/Input";
import { TextArea } from "@/components/common/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import VerificationOTP from "@/components/auth/VerificationOTP";
import { useForm } from "react-hook-form";
import PageLayout from "@/pages/_layout";
import { axiosClient } from "@/endpoints/axios";
import Image from "next/image";
import { SigninDataProp } from "@/endpoints/auth";
import { useSignInByMail } from "@/hooks/mutation/useSignIn";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const SignupDetail = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [data, setData] = useState<SigninDataProp["user"]>();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const { mutate: proposeSingup } = useSignInByMail();
  const [imageWarn, setImageWarn] = useState<boolean>(false);
  const [newLetterSubsribe, setNewsLetterSubscribe] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SigninDataProp["user"]>();

  useEffect(() => {
    const userData = localStorage.getItem("@ownerpreneurGoogle");
    const user = JSON.parse(userData || "{}");
    if (!user) return;
    if (user.email) {
      setValue("email", user.email);
    }
    if (user.name) {
      setValue("first_name", user.name.substring(0, user.name.indexOf(" ")));
      setValue("last_name", user.name.substring(user.name.indexOf(" ") + 1));
    }
    if (user.auth_type) {
      setValue("auth_type", user.auth_type);
    }
    if (user.profile) {
      setValue("image", user.profile);
    }
  }, [setValue]);

  const handleSingUp = (data: SigninDataProp["user"]) => {
    console.log("checking new", newLetterSubsribe);

    setData(data);
    // TODO: Implement Signup
    if (data.image === undefined) {
      setImageWarn(true);
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setShowOTP(true);
  };

  if (isVerified && data) {
    setIsVerified(false);
    if (watch("auth_type") !== "google") {
      data.auth_type = "email";
    }
    console.log("data", data);
    proposeSingup(
      { user: data, isSubscribe: newLetterSubsribe },
      {
        onSuccess: (data) => {
          console.log("data", data);
          toast.success("Welcome", {
            delay: 0,
          });
          setTimeout(() => router.push("/"), 2000);
        },
        onError: (error) => {
          console.log("error", error);
          toast.error("Error Signing Up", {
            delay: 0,
          });
          setTimeout(() => router.push("/signup"), 2000);
          setShowOTP(false);
        },
      }
    );
    localStorage.removeItem("@ownerpreneurGoogle");
    setData(undefined);
    reset();
  }

  if (showOTP) {
    return <VerificationOTP type="Signup" setIsVerified={setIsVerified} />;
  }
  console.log("cc", errors);

  const handleInputImageChange = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    if (file) {
      if (file.type.startsWith("image/")) {
        await axiosClient("POST", `${BASE_URL}/files`, formData).then((res) => {
          setValue("image", res.data?.id);
          return res?.data?.id;
        });
      } else {
        // TODO : Show error message
      }
    }
  };
  // Input form for signing up with email

  return (
    <PageLayout>
      <div className="pb-16 w-full min-h-screen overflow-hidden bg-brand-snow/20">
        <div className="md:w-3/4 sm:5/6 w-11/12 mx-auto mt-6 my-8">
          <p className=" font-gt-walsheim-regular sm:text-4xl text-3xl pb-4 py-10">
            Complete Profile
          </p>
          <form
            className="bg-white  md:px-10 sm:px-6 px-4 pt-10 pb-10 "
            onSubmit={handleSubmit(handleSingUp)}
          >
            <div className="flex items-center gap-4 border-b-2 border-brand-gray-400 pb-6">
              <div
                className={`w-16 h-16 rounded-full bg-brand-snow flex items-center  justify-center relative overflow-hidden `}
              >
                {watch("image") ? (
                  <Image
                    // src={`${watch("image") }`}
                    src={`${
                      watch("auth_type") === "google"
                        ? watch("image")
                        : `${BASE_URL}/assets/${watch("image")}`
                    }`}
                    alt="profile"
                    fill
                    className={``}
                  />
                ) : (
                  <IoAdd
                    className={`text-4xl text-primary ${
                      imageWarn ? " text-red-500" : ""
                    }`}
                  />
                )}
                <input
                  type="file"
                  alt=""
                  disabled={
                    watch("image") !== undefined ||
                    watch("auth_type") === "google"
                  }
                  onChange={(e) => handleInputImageChange(e)}
                  className={`opacity-0 absolute inset-0 `}
                  ref={inputRef}
                  accept="image/*"
                />
              </div>{" "}
              <button
                className="text-brand-gray-500 font-gt-walsheim-regular"
                disabled={
                  watch("image") !== undefined ||
                  watch("auth_type") === "google"
                }
                onClick={() => inputRef.current?.click()}
              >
                Add Image
              </button>
            </div>
            <div className="grid mt-6 tab:grid-cols-2 tab:grid-rows-3 gap-x-8 gap-y-10">
              <Input
                register={register}
                icon={
                  <AiOutlineGoogle className="text-2xl text-brand-gray-500" />
                }
                iconPosition="right"
                type="text"
                label={"First Name"}
                disabled={watch("auth_type") === "google"}
                name="first_name"
                placeholderText="Benjamin Campbell"
                error={errors.first_name?.message}
              />
              <Input
                icon={
                  <MdModeEditOutline className="text-2xl text-brand-gray-500" />
                }
                register={register}
                iconPosition="right"
                type="text"
                disabled={watch("auth_type") === "google"}
                label={"Last name"}
                placeholderText="@benjamin41"
                error={errors.last_name?.message}
                name="last_name"
              />

              <Input
                icon={
                  <AiOutlineGoogle className="text-2xl text-brand-gray-500" />
                }
                register={register}
                iconPosition="right"
                type="email"
                label={"Email"}
                disabled={watch("auth_type") === "google"}
                placeholderText="benjaminc@mail.com"
                otherValidation={{
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid Email",
                  },
                }}
                error={errors.email?.message}
                name="email"
              />
              <Input
                icon={
                  <MdModeEditOutline className="text-2xl text-brand-gray-500" />
                }
                iconPosition="right"
                type="text"
                register={register}
                label={"Occupation"}
                name="occupation"
                placeholderText="COO, Twitter Corp."
                error={errors.occupation?.message}
              />
              <Input
                icon={
                  <MdModeEditOutline className="text-2xl text-brand-gray-500" />
                }
                iconPosition="right"
                type="text"
                register={register}
                label={"Location"}
                name="location"
                placeholderText="Amsterdam, Netherlands"
                error={errors.location?.message}
              />
              <Input
                icon={
                  <MdModeEditOutline className="text-2xl text-brand-gray-500" />
                }
                iconPosition="right"
                type="text"
                label={"Personal Link"}
                name="personal_link"
                register={register}
                placeholderText="https://www.twitter.com/x"
                error={errors.personal_link?.message}
              />
              <div className="col-span-1 tab:col-span-2 ">
                <TextArea
                  label={"Bio"}
                  name="bio"
                  register={register}
                  placeholderText="Embarking on an extraordinary journey fueled by unyielding determination, Benjamin Campbell has epitomized the essence of a visionary entrepreneur. Through uncharted challenges and triumphant successes."
                  error={errors.bio?.message}
                />
              </div>
            </div>
            <div className="col-span-1 tab:col-span-2 mt-4 flex gap-3">
              <input
                value="true"
                id="regular"
                onChange={(e) => setNewsLetterSubscribe(e.target.checked)}
                type={"checkbox"}
                className="w-3 h-3 mt-1 border-2 rounded-[1px] appearance-none border-primary checked:ring-offset-2 checked:ring-primary checked:bg-primary checked:ring-2 transition-all ease-in-out duration-300"
              />

              <label
                className="text-sm font-normal capitalize"
                htmlFor="regular"
              >
                {" "}
                Subscribe to newsletter
              </label>
            </div>
            <div className="mt-20 flex items-end justify-end">
              <button
                type="submit"
                onClick={handleSubmit(handleSingUp)}
                className="rounded-lg py-2 px-5   bg-secondary text-black"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignupDetail;
