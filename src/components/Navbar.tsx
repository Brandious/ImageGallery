export const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl text-white">Image Gallery</h1>
        <div className="flex flex-row gap-7">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-lg">
            <a href="/">Home</a>
          </div>
          <div className="bg-blue-500 text-white px-3 py-1 rounded-lg">
            <a href="liked-images">Liked</a>
          </div>
        </div>
      </div>
    </nav>
  );
};
