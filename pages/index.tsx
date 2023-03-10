import ZipCodeForm from '@/components/zipCodeForm';

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <h1 className="text-4xl font-bold text-center text-Gray-600 mt-4">
          The Weather App
        </h1>
      </div>
      <ZipCodeForm />
    </>
  );
}
