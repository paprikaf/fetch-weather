import React from 'react';
import { useRouter } from 'next/router';

const FailureComponent: React.FC<{ error: string }> = ({ error }) => {
  const router = useRouter();
  return (
    <div className="py-6 px-6 md:px-12 flex flex-col h-screen">
      <div className="flex-grow flex flex-col">
        <div className="transition duration-1000 delay-500 hover:delay-0 w-2">
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-90 flex flex-col items-center justify-center">
            <img
              className="w-20 h-20"
              src="/raining-umbrella.gif"
              alt="sad"
            />
            <p className="w-1/3 text-center text-white">
              KABOUCH 💥 Something went wrong...
            </p>
            <p className="w-1/3 text-center text-white">{error}</p>
            <div className="hover:bg-teal-500">
              {' '}
              <button
                className="bg-transparent hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={() => router.push(`/`)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    style={{
                      strokeLinecap: 'round',
                      strokeWidth: '2',
                      strokeLinejoin: 'round',
                    }}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
                <span>Try again</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailureComponent;
