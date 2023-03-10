import { useState } from 'react';
import { useRouter } from 'next/router';

const ZipCodeForm: React.FC<{}> = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`weather/${inputValue}`);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Enter ZIP Code
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Zip Code E.g. 90210"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Fetch weather
          </button>
        </div>
      </form>
    </div>
  );
};

export default ZipCodeForm;
