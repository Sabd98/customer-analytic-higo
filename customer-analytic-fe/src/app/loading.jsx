import LoadingSpinner from "@/components/ui/LoadingSpinner";
//Loading Page

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size={64} />
    </div>
  );
}
