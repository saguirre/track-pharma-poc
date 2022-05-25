interface CardProps {
  children: React.ReactNode;
}
export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="rounded-lg bg-white overflow-hidden shadow p-6 m-3">{children}</div>;
};
