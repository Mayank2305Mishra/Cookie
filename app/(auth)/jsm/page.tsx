import Upload from "@/app/(root)/upload/page";

const Layout = () => {
    return (
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <aside className="sticky top-0 h-screen w-64 bg-gray-100 border-r">
          <div className="h-full overflow-hidden">
            <h2 className="p-4 text-xl font-bold">Left Sidebar</h2>
            <p className="p-4">Additional content</p>
          </div>
        </aside>
  
        {/* Center Content */}
        <main className="flex-1 h-screen overflow-y-auto bg-white">
          <Upload/>
        </main>
  
        {/* Right Sidebar */}
        <aside className="sticky top-0 h-screen w-64 bg-gray-100 border-l">
          <div className="h-full overflow-hidden">
            <h2 className="p-4 text-xl font-bold">Right Sidebar</h2>
            <p className="p-4">Additional content</p>
          </div>
        </aside>
      </div>
    );
  };
  
  export default Layout;
  