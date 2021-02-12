import React from "react";
import { Link } from "woozie";
import Footer from "./Footer";
import Layout from "./Layout";


export default function HomePage() {
  return (
    <Layout home={true}>
      {/* <svg
        className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="50,0 100,0 50,100 0,100"></polygon>
      </svg> */}
      <div className="flex flex-col items-center w-full overflow-y-auto bg-white">
        <div className="flex flex-col flex-1 max-w-screen-xl">
          <div className="flex items-center justify-center my-10 bg-white lg:flex-row sm:flex-col">
            <div className="flex-1 px-4 lg:px-8 sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Easy way to learn </span>
                <span className="block text-indigo-600 xl:inline">
                  Tezos development
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                <b>Sol2Ligo handbook</b> is the online interactive tool oriented
                towards Solidity developers willing to migrate their
                smart-contract development knowledge to Tezos ecosystem
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/section/0"
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="https://madfish-solutions.github.io/sol2ligo/"
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Try sol2ligo
                  </a>
                </div>
              </div>
            </div>
            <img
              src={`${process.env.PUBLIC_URL || ''}/person.svg`}
              alt="Person"
              className="flex-1 hidden max-h-75 lg:block"
            />
          </div>
          <div className="py-12 bg-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">
                  sol2ligo handbook
                </h2>
                <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  Interactive way to learn LIGO from scratch
                </p>
                <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
                  Dive into the basics of LIGO language used for building smart-contracts on Tezos while comparing code with Solidity
                </p>
              </div>

              <div className="mt-16">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md">
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <dt className="text-lg font-medium leading-6 text-gray-900">
                        Integrated transpiler
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        Handbook features integrated transpiler allowing everybody to experiment with Solidity and LIGO constructions
                      </dd>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md">
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <dt className="text-lg font-medium leading-6 text-gray-900">
                        Step-by-step guide
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        We tried to describe the major differences between EVM and Tezos-based contracts with examples on each topic
                      </dd>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 text-white bg-indigo-500 rounded-md">
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <dt className="text-lg font-medium leading-6 text-gray-900">
                        Try your own code
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        You can try pasting your own pieces of code into the editor to see result
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
