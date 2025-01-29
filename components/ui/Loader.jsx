export const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-10 h-10">
        {/* Outer spinner */}
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
        <div className="absolute inset-0 rounded-full border-[3px] border-blue-600 border-t-transparent animate-spin" />
        
        {/* Inner spinner */}
        <div className="absolute inset-[4px] rounded-full border-[3px] border-gray-200" />
        <div className="absolute inset-[4px] rounded-full border-[3px] border-indigo-500 border-t-transparent animate-spin" 
             style={{ animationDirection: 'reverse' }}
        />
      </div>
    </div>
  );
};