import { CheckCircle, XCircle } from "lucide-react";

const Verify = () => {
  const params = new URLSearchParams(window.location.search);
  const success = params.get("success") === "true";

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md w-full">
        {success ? (
          <>
            <CheckCircle className="mx-auto text-green-500" size={80} />
            <h1 className="text-3xl font-bold mt-4 text-green-600">Payment Successful!</h1>
            <p className="text-gray-600 mt-2">
              Your plan has been activated. Enjoy premium features 🎉
            </p>
          </>
        ) : (
          <>
            <XCircle className="mx-auto text-red-500" size={80} />
            <h1 className="text-3xl font-bold mt-4 text-red-600">Payment Failed</h1>
            <p className="text-gray-600 mt-2">
              Your payment was cancelled or interrupted. Please try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Verify;
