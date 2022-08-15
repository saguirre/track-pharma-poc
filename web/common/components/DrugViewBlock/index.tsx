interface DrugViewBlockProps {
  title: string;
  children: React.ReactNode;
}

export const DrugViewBlock: React.FC<DrugViewBlockProps> = ({ title, children }) => {
  return (
    <div className="mt-6">
      <div className="sm:col-span-2">
        <div className="flex items-center">
          <h4 className="flex-shrink-0 pr-4 mb-3 bg-white text-sm tracking-wider font-semibold uppercase text-violet-600">
            {title}
          </h4>
          <div className="flex-1 border-t-2 mr-6 border-gray-200" />
        </div>
        {children}
      </div>
    </div>
  );
};
