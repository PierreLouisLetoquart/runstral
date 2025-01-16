function Hey() {
  return (
    <div className="w-full text-[#582D1D] dark:text-[#FFE0C2] space-y-3 p-[12px] rounded-[18px] bg-[#FFEFD6] border border-[#FFC182] dark:bg-[#331E0B] dark:border-[#66350C]">
      <p className="leading-7">Credentials for the demo:</p>
      <div className="space-y-1">
        <p className="leading-7">
          Email: <span className="font-semibold">yann@lecun.edu</span>
        </p>
        <p className="leading-7">
          Password: <span className="font-semibold">VivaElFrenchTech</span>
        </p>
      </div>
    </div>
  );
}

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-3 mt-12">
        <Hey />
        <h2 className="text-2xl font-bold tracking-tight mt-3">Login</h2>
        <p className="text-muted-foreground font-light">
          Welcome! Login to access the app.
        </p>
      </div>
      {children}
    </div>
  );
}
