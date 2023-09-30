import Link from "next/link";

export const GoLive = () => {
  return (
    <>
      <div className='flex flex-col gap-3 items-center'>
        <p>Create Your Portfolio&apos;s home Page to Go Live !</p>
        <Link
          className='text-white font-semibold py-1 px-3 bg-blue-600 hover:bg-blue-700 rounded'
          href='/portfolio/form/home'
        >
          Start
        </Link>
      </div>
    </>
  );
};
