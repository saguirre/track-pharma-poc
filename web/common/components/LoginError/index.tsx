interface LoginErrorProps {
  message: string;
}

export const LoginError: React.FC<LoginErrorProps> = ({ message }) => {
  return <p className="text-sm font-extralight mt-1 text-red-500">{message}</p>;
};
