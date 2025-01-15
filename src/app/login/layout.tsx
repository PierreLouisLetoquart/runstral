export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-3 mt-36">
        <h2 className="text-2xl font-bold tracking-tight">Login</h2>
        <p className="text-muted-foreground font-light">
          Hey dude, you need to login to access the app 😳
        </p>
      </div>
      {children}
    </div>
  );
}
