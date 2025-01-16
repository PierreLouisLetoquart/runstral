export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex flex-col gap-6">
      <WelcomeMessageCard />
      <div className="w-full max-w-lg mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-3 mt-12">
          <h2 className="text-2xl font-bold tracking-tight">Login</h2>
          <p className="text-muted-foreground font-light">
            Hey you, you need to login to access the app 😳
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

export function WelcomeMessageCard() {
  return (
    <div className="w-full text-[#582D1D] dark:text-[#FFE0C2] space-y-3 p-[12px] rounded-[18px] bg-[#FFEFD6] border border-[#FFC182] dark:bg-[#331E0B] dark:border-[#66350C]">
      <p className="leading-7">
        The demo can be accessed with the following credentials:
      </p>
      <div className="space-y-1">
        <p className="leading-7">Email: yann@lecun.edu</p>
        <p className="leading-7">Password: VivaElFrenchTech</p>
      </div>
      <p className="leading-7">
        It is a super good practice to put password in clear on an orange box
        like this one (wait... not sure...). It is only for the demo, sorry
        😄...
      </p>
    </div>
  );
}
