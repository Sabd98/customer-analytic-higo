import { Loader2 } from "lucide-react";

//Loading spinner component for UI loading states

const LoadingSpinner = ({ size = 24, className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 size={size} className="animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
