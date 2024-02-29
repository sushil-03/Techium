import Image from "next/image";
import Logo from "../Logo";

export default function OrderSummaryCard({
  price,
  membershipType,
}: {
  price: string;
  membershipType: string;
}) {
  //  Card for displaying order summary (Dynamic Content)
  return (
    <div className="relative col-span-1 order-1 md:order-2 lg:col-span-2 py-4 h-full max-h-[560px]">
      <Image
        src="/assets/svg/bill-ticket.svg"
        alt="Image"
        width={586}
        height={560}
        className="w-full h-[540px] object-contain"
      />
      <div className="absolute top-0 left-0 h-full w-full flex justify-center">
        <div className="w-[340px] p-6 flex flex-col gap-4 xs:gap-6 mt-6 xs:mt-0 items-center">
          <h4 className="text-xl xs:text-2xl mt-8 uppercase text-[#00222D] font-extrabold font-gt-super-ds-trial ">
            Order Summary
          </h4>
          <Logo variant="blue" className=" h-12 w-fit my-2 xs:my-4" />
          <div className="w-full flex flex-col gap-4 mt-6 xs:mt-8">
            <div className="flex justify-between items-center">
              <p className="text-base text-primary tracking-wide font-normal font-gt-walsheim-light">
                Membership
              </p>
              <p className="text-base text-primary tracking-wide font-normal font-gt-walsheim-regular">
                {membershipType}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base text-primary tracking-wide font-normal font-gt-walsheim-light">
                Order ID
              </p>
              <p className="text-base text-primary tracking-wide font-normal font-gt-walsheim-regular">
                #12345678901
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base text-primary tracking-wide font-normal font-gt-walsheim-light">
                Platform Fee
              </p>
              <p className="text-base text-primary tracking-wide font-normal font-gt-walsheim-regular">
                {membershipType === "Free" ? "00 USD" : "2.99 USD"}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base text-primary tracking-wide font-normal font-gt-walsheim-light">
                Tax (18%)
              </p>
              <p className="text-base text-primary tracking-wide font-normal font-gt-walsheim-regular">
                {membershipType === "Free" ? "00 USD" : "8.99 USD"}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between items-center mt-14 xs:mt-16">
            <div>
              <p className="text-base  text-primary tracking-wide font-normal font-gt-walsheim-light">
                You have to pay
              </p>
              <p className="text-xl text-primary tracking-wide font-extrabold font-gt-walsheim-regular">
                {membershipType === "Free" ? "0 USD" : `${price} USD`}
              </p>
            </div>
            <Image
              src={"/assets/svg/icon-bill.svg"}
              alt={"Image"}
              width={30}
              height={30}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
