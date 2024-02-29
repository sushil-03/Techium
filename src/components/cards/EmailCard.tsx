import React, { useState } from "react";
import Button from "../common/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useNewsLetterUpload } from "@/hooks/mutation/useNewLetter";
import { useUserStore } from "@/hooks/state/userState";
const EmailCard = ({
  hero_image,
  case_studies,
  faces,
}: {
  hero_image?: string;
  case_studies?: string;
  faces: any;
}) => {
  const router = useRouter();
  const newsletter_emails = useUserStore((state) => state.newsletter_emails);
  const setNewsLetter = useUserStore((state) => state.setNewsLetter);
  const [email, setEmail] = useState<string>("");
  const { mutate: proposeNewsLetterUpload } = useNewsLetterUpload();

  const handleSendEmail = () => {
    // TODO : Handle Subscribe Email
    if (email != "") {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!pattern.test(email)) {
        toast.error("Invalid email");
        return;
      }
      const data = {
        email: email,
      };
      proposeNewsLetterUpload(data, {
        onSuccess: (data) => {
          setNewsLetter(true);
          toast.success("You are now subscribed to ownerpreneur");
        },
        onError: (data) => {
          toast.error("Subscribed");
        },
      });
    } else {
      toast.error("Email is empty");
    }
  };
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  if (newsletter_emails) {
    return (
      <div className="relative md:h-[400px] h-[300px] xl:h-full  xl:w-full w-5/6 mx-auto ">
        <Image
          // src="/assets/imgs/hero-img.png"
          src={`${BASE_URL}/assets/${hero_image}`}
          alt="Image"
          fill
          className="md:object-contain object-fill w-full"
        />
      </div>
    );
  }
  return (
    <div className="w-full p-10 my-3 bg-neutral-950 font-gt-walsheim-regular ">
      <p className="text-2xl text-secondary">
        Own Your Freedom Join Our Newsletter{" "}
      </p>
      <p className="my-3 text-lg leading-6 tracking-wide text-white font-gt-walsheim-light">
        {case_studies ? case_studies : " 4,424 case studies"} with founders who
        built their businesses to thousands of customers straight in your email.
      </p>
      <div className="flex flex-col gap-4 mt-10">
        {/* Input for handling subscriptions email */}
        <div className="flex gap-2">
          <input
            type="email"
            className="w-full   outline-none  bg-transparent border-b-2 focus:border-primary  font-gt-walsheim-regular placeholder:text-brand-gray text-brand-gray-500"
            placeholder="Your email"
            pattern="/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="primary" onClick={handleSendEmail}>
            Subscribe
          </Button>
        </div>
        <div className="relative flex items-center">
          <div
            className="relative flex h-10 "
            style={{
              width: `${(faces.length + 1) * 26}px`,
            }}
          >
            {/* Customer Images */}
            {faces.map((face: any, index: number) => {
              return (
                <div
                  key={index}
                  className="absolute bottom-0  "
                  style={{
                    marginLeft: `${index * 20}px`,
                  }}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden ">
                    <Image
                      src={face.url ? face.url : "sdf"}
                      fill
                      className="object-cover"
                      alt="featured image"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <span className="items-center mt-1 font-light leading-6 text-brand-gray-500 font-gt-walsheim-light">
            Join the list of over 20k other entrepreneurs
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmailCard;
