import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-10 min-h-screen">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-violet-700">About Us</h1>
        <p className="text-gray-600 text-lg mt-4">
          Welcome to{" "}
          <span className="text-violet-700 font-bold">QuickMart</span> – your
          trusted marketplace for buying and selling products effortlessly.
        </p>
      </div>

      {/* About Us Content Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 lg:flex lg:justify-between">
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What is QuickMart?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            QuickMart is a user-friendly platform built to connect buyers and
            sellers seamlessly. Whether you're searching for great deals or
            listing your products, QuickMart ensures a smooth, secure, and
            enjoyable experience.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            We also integrate external APIs, allowing even non-logged-in users
            to explore a wide range of products from other marketplaces.
            QuickMart is designed for ease, speed, and satisfaction.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center items-center">
          <img
            src="https://geti.id/wp-content/uploads/2023/08/1684731929210-1.png"
            alt="QuickMart Marketplace"
            className="w-3/4 lg:w-full"
          />
        </div>
      </div>

      {/* Creators Section */}
      <div className="mt-16">
        <h2 className="text-4xl font-bold text-violet-700 text-center mb-8">
          Meet the Creators
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Creator 1 */}
          <div className="flex flex-wrap justify-center gap-8">
            {/* Creator 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md min-h-[280px] flex flex-col justify-between">
              <img
                src="/images/photo1.jpeg"
                alt="Vedanshu"
                className="rounded w-24 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 text-center">
                Vedanshu Daxesh Patel
              </h3>
              <p className="text-gray-600 text-center mt-2">Team Member</p>
            </div>

            {/* Creator 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md min-h-[280px] flex flex-col justify-between">
              <img
                src="/images/photo2.JPG"
                alt="Puneeth"
                className="rounded w-24 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 text-center">
                Puneeth Boyapati Sanjeeva
              </h3>
              <p className="text-gray-600 text-center mt-2">Team Member</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-16 bg-violet-700 text-white py-6 rounded-lg shadow-lg">
        <p className="text-center text-lg font-medium">
          Join <span className="font-bold">QuickMart</span> today and discover
          the world of endless opportunities!
        </p>
        <p className="text-center text-lg font-medium mt-2">
          <a
            href="https://github.com/puneeth-bs/quickmart-react-app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            GitHub Repository: QuickMart
          </a>
        </p>
        <p className="text-center text-lg">Course: CS5610</p>
      </div>
    </div>
  );
};

export default AboutUs;
