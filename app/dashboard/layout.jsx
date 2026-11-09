import Header from "./_components/Header";
import SideNav from "./_components/SideNav";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="fixed mt-[65px] hidden h-screen w-64 bg-white md:block">
        <SideNav />
      </div>
      <Header />
      <main className="min-h-screen bg-gray-100 p-10 pt-4 md:ml-64">{children}</main>
    </div>
  );
}
