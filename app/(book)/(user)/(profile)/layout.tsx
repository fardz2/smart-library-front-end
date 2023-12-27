import NavProfile from "@/app/component/NavProfile";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" bg-white p-5 rounded-md drop-shadow-xl">
      <div className="flex gap-3 mb-8">
        <NavProfile />
      </div>
      {children}
    </section>
  );
}
