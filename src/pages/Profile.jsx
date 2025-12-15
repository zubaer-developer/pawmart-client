import React from "react";

const Profile = () => {
  return (
    <div class="container mx-auto card w-full max-w-xl shadow-2xl bg-white border-t-8 border-primary transition-all duration-500 hover:shadow-primary-lg">
      <title>My Profile</title>
      <div class="card-body items-center text-center p-10">
        <div class="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-24 w-24 text-warning animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.332 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 class="card-title text-5xl font-extrabold text-primary mb-3">
          Under Construction
        </h1>

        <p class="text-lg text-gray-400 mb-8">
          We are actively running construction on this page to deliver a brand
          new experience! Thank you for your patience as we finalize the
          updates.
        </p>

        <div class="w-full mb-6">
          <p class="text-sm font-semibold mb-2 text-neutral">
            Deployment Progress
          </p>
          <progress
            class="progress progress-warning w-full"
            value="65"
            max="100"
          ></progress>
          <span class="text-sm text-gray-500 block mt-1">
            Estimated completion: 65%
          </span>
        </div>

        <div class="card-actions justify-center mt-4">
          <a
            href="/"
            class="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all"
          >
            Go Back to Home
          </a>
        </div>

        <div class="mt-8 text-sm text-gray-400">
          <p>Scheduled Maintenance: We expect to be live soon.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
