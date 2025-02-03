const Navbar = () => {
    return (
      <header className="w-full bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-64 right-0">
        <h1 className="text-xl font-semibold">Approval New Companies</h1>
        <div className="flex items-center space-x-4">
          <span>🔔</span>
          <span>👤</span>
        </div>
      </header>
    );
  };
  
  export default Navbar;
  