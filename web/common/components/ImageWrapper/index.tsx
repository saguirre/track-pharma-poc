interface ImageWrapperProps {
  children: React.ReactNode;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center w-screen p-8 min-h-screen sm:h-screen">
      <div className="flex flex-row items-center rounded-xl border border-slate-100 bg-white justify-center w-full sm:w-[60%] md:h-[70%]">
        {children}
      </div>
    </div>
  );
};
