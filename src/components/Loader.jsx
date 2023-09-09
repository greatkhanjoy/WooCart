const Loader = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full ">
      <div className="bg-blue-800 opacity-40 absolute top-0 left-0 w-full h-full"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loader;
