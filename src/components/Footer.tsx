import Image from "next/image";

export const Footer = () => {
  return (
    <>
      <div className="bg-waltherWhite p-5 justify-center flex flex-col items-center">
        <Image src="/logo.png" width={133} height={23} alt="Full Stack Week" />
        <p className="text-sm font-medium mt-1 text-primaryDarker">Todos os direitos reservados.</p>
      </div>
    </>
  );
};
