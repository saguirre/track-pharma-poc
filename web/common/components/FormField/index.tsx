import { Field } from "formik";

interface FormFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  readonly?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ label, name, placeholder, readonly }) => {
  return (
    <div className="my-1">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
        id={name}
        name={name}
        placeholder={placeholder}
        readOnly={readonly}
      />
    </div>
  );
};
