'use client';

import Link from 'next/link';

const Error = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary-600 lg:text-9xl">
            500
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Internal Server Error.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            We are already working to solve the problem.
          </p>
          <Link
            href="/home"
            className="body-2 rounded-large border px-4 py-2 font-bold hover:opacity-80"
          >
            Go back
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Error;
