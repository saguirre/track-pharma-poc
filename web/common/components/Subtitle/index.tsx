interface SubtitleProps {
  text: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({ text }) => {
  return <p className="text-sm font-light text-slate-500">{text}</p>;
};
