import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({
  className = "",
  variant = "white",
}: {
  className?: string;
  variant?: string;
}) {
  return (
    <>
      <Image
        src="/assets/imgs/test3.png"
        alt="Image"
        width={200}
        height={100}
        className={cn("rounded-md dark:hidden ", className)}
      />
      <Image
        src="/assets/imgs/test2.png"
        alt="Image"
        width={200}
        height={100}
        className={cn("rounded-md  text-red-500 hidden dark:block", className)}
      />
    </>
  );
}
