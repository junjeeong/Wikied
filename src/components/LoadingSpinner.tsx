const LoadingSpinner = () => {
  return (
    <div className="mt-[20px] flex justify-center items-center h-10">
      <div className="w-[30px] h-[30px] border-4 border-transparent border-t-green-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
