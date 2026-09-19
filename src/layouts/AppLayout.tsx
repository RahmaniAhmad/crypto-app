import { MainNavigation } from "@/shared/components/navigation";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <>
      <MainNavigation />

      <main>{children}</main>
    </>
  );
}
