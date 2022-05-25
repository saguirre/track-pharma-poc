interface TitleProps {
  text: string;
}
export const Title: React.FC<TitleProps> = ({ text }) => {
  return <h1 className="text-4xl font-semibold my-1 text-slate-800">{text}</h1>;
};
