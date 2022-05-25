import { SubtitleInfo, TextInfo } from "@components";

interface DrugViewInfoProps {
  title: string;
  text: string;
}

export const DrugViewInfo: React.FC<DrugViewInfoProps> = ({ text, title }) => {
  return (
    <div>
      <SubtitleInfo title={title} />
      <TextInfo text={text} />
    </div>
  );
};
