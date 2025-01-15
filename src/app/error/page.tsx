// TODO: Improve error page with retry button and better error message

export default function Error() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-center tracking-tight">
          An error occurred
        </h1>
        <p className="text-center">
          Something went wrong. Please try again later.
        </p>
      </div>
    </div>
  );
}
