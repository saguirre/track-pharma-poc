interface SubtitleInfoProps {
  title: string;
}

export const SubtitleInfo: React.FC<SubtitleInfoProps> = ({ title }) => {
  return <dt className="text-xs tracking-wider font-semibold uppercase text-gray-600">{title}</dt>;
};
