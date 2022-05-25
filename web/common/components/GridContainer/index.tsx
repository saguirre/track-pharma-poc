interface GridContainerProps {
  children: React.ReactNode;
}

export const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
  return <div className="flex flex-row">{children}</div>;
};
