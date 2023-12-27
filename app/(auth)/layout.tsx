import "../globals.css";
import "./index.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex justify-center items-center bg-login-regis sans">
      {children}
    </section>
  );
}
