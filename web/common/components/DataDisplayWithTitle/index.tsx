interface DataDisplayWithTitleProps {
  title: string;
  children: React.ReactNode;
}
export const DataDisplayWithTitle: React.FC<DataDisplayWithTitleProps> = ({ children, title }) => {
  return (
    <div className="border border-slate-300 rounded-xl">
      <div className="border-b border-slate-300">
        <h1 className="p-2 font-semibold text-medium text-slate-600">{title}</h1>
      </div>
      {children}
    </div>
  );
};
