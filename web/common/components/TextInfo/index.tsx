interface TextInfoProps {
  text: string;
}
export const TextInfo: React.FC<TextInfoProps> = ({ text }) => {
  return <dd className="mt-1 text-xs font-regular text-gray-600">{text}</dd>;
};
