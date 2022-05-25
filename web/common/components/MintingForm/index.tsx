import { ChangeEvent, KeyboardEvent, useState } from "react";

import { Form, Formik } from "formik";

import { ButtonSpinner, FormField } from "@components";

export interface FormValues {
  name: string;
  strength: string;
  dosageForm: string;
  route: string;
  activeIngredients?: string[];
}

interface MintingFormProps {
  loading: boolean;
  completed: boolean;
  processText: string;
  onSubmit: (values: FormValues, activeIngredients: string[], image?: File) => void;
}

export const MintingForm: React.FC<MintingFormProps> = ({ loading, completed, processText, onSubmit }) => {
  const [image, setImage] = useState<File>();
  const [activeIngredients, setActiveIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const initialValues: FormValues = { name: "", strength: "", dosageForm: "", route: "", activeIngredients: [] };
  const maxIngredients = 20;

  const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event?.target;
    setImage(files?.[0]);
  };

  const wordIsValid = (word: string, maxLength: number) => word?.length >= 3 && word?.length <= maxLength;

  const handleAdd = (): void => {
    if (
      !wordIsValid(inputValue, 200) ||
      activeIngredients.length >= maxIngredients ||
      activeIngredients.some((word) => word.toUpperCase() === inputValue.toUpperCase())
    ) {
      return;
    }

    setActiveIngredients([...activeIngredients, inputValue]);
    setInputValue("");
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleDelete = (index: number): void => {
    activeIngredients.splice(index, 1);
    setActiveIngredients([...activeIngredients]);
  };

  const shouldDisable = (): boolean => {
    return (
      !wordIsValid(inputValue, 200) ||
      activeIngredients.length >= maxIngredients ||
      activeIngredients.includes(inputValue.toUpperCase())
    );
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          onSubmit(values, activeIngredients, image);
        }}
      >
        <Form
          className="flex flex-col items-center"
          onKeyPress={(event) => event.key == "Enter" && event.preventDefault() && handleAdd()}
        >
          <div className="flex flex-col w-[70%]">
            <FormField label="Product Name" name="name" placeholder="i.e.: Benzodiazepine" />
          </div>
          <div className="flex flex-col w-[70%]">
            <FormField label="Strength" name="strength" placeholder="Strength..." />
          </div>
          <div className="flex flex-col w-[70%]">
            <FormField label="Dosage Form" name="dosageForm" placeholder="Dosage Form..." />
          </div>
          <div className="flex flex-col w-[70%]">
            <FormField label="Route" name="route" placeholder="Route..." />
          </div>
          <div className="flex flex-col w-[70%]">
            <label htmlFor="name" className="block mt-1 text-sm font-medium text-gray-700">
              Add Active ingredients
            </label>
            <input
              className="appearance-none block w-full px-3 py-2 border mb-1 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
              placeholder="Active ingredient..."
              minLength={3}
              maxLength={200}
              value={inputValue}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <div className="flex flex-row flex-wrap">
              {activeIngredients.map((ingredient, index) => (
                <div key={`${ingredient}${index}`} className="m-1">
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="flex flex-row gap-1 items-center rounded-xl w-fill py-1 px-3 hover:bg-violet-400 bg-violet-500 text-white text-medium font-regular h-fill"
                  >
                    {ingredient}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-[70%]">
            <label
              htmlFor="file"
              className="relative mt-1 flex flex-col justify-center items-center w-full border-2 hover:cursor-pointer border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              <input
                className="hidden"
                type="file"
                name="image"
                id="file"
                onChange={(e) => handleSetImage(e)}
              />
              {image ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="gray"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="grey"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
              <span className="mt-2 block text-sm font-medium text-gray-700">
                {image ? "Image Uploaded!" : "Upload an Image"}
              </span>
            </label>
          </div>
          <button
            className="flex justify-center items-center rounded-xl w-[50%] my-5 hover:bg-violet-500 active:border-2 active:border-violet-400 bg-violet-600 text-white text-medium font-regular h-11"
            type="submit"
          >
            {loading ? (
              <ButtonSpinner text={processText} />
            ) : completed ? (
              <div className="flex flex-row items-center">
                <label className="text-medium text-white font-regular mr-0.5">Success</label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
