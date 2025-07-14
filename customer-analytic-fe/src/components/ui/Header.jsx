//Header Component

const Header = () => {
  return (
    <header className="bg-purple-600 shadow py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-100">
          Cusboard
        </h1>
        <div className="flex items-center space-x-4">
          <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
