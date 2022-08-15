interface BackgroundContainerProps {
  children: React.ReactNode;
}

export const BackgroundContainer: React.FC<BackgroundContainerProps> = ({ children }) => {
  return (
    <div className="bg-slate-50 py-6 px-8 mx-8 border border-slate-300 rounded-xl mb-2">
      {children}
    </div>
  );
};
