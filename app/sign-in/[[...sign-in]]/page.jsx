import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="mx-auto">
        <Image
          src="/uberbanner.png"
          width={800}
          height={100}
          className=" object-contain h-full w-full"
        />

        <div className="absolute top-10  right-10">
          <SignIn path="/sign-in" />
        </div>
      </div>
    </>
  );
}
