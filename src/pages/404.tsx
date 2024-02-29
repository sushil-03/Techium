import React, { useEffect } from "react";
import PageLayout from "./_layout";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
export default function NotFound() {
  const router = useRouter();
  // Page for render invalid routes

  return (
    <PageLayout>
      <div className="flex items-center  gap-16 flex-col   justify-center">
        <div className="flex items-center justify-center flex-col  gap-4  mt-32">
          <p className="font-gt-super-ds-trial md:text-[250px] text-[150px] text-primary">
            404
          </p>
          <p className=" font-gt-walsheim-light text-center  md:text-xl text-lg">
            Uh-oh! This page seems to be practicing its invisibility spell.{" "}
            <br /> Stay tuned as our wizards work their magic!
          </p>
        </div>
        <Button variant="primary" onClick={() => router.push("/")}>
          Go to home
        </Button>
      </div>
    </PageLayout>
  );
}
