import { FULL_NAME } from "../../lib/config";

export const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center max-w-4xl m-auto md:flex-row md:justify-start">
      <img
        width={300}
        height={300}
        src="/images/avatar.jpg"
        alt="avatar"
        className="rounded shadow-lg md:absolute top-[-16px] right-[-42px]"
      />
      <div className="flex flex-col gap-4 md:relative md:mr-32">
        <h1 className="text-6xl drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] md:text-8xl">
          I'm{" "}
          <span className="font-extrabold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
            {FULL_NAME}
          </span>
        </h1>
        <p className="max-w-xl text-xl dark:drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">
          <b>Apprenti React.</b> I’m a software developer that make thing on
          internet, very happy to see your here, place holder please fill
          something here please fill something here.
        </p>
      </div>
    </div>
  );
};
