const Header = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <div className="bg-gradient-to-r from-[#7dbeff] to-[#6781ff] shadow-md text-[#ffffff] py-4 px-6 flex justify-between items-center">
      <div className="w-24">{/*maybe for adding a logo*/}</div>
      <h1 className="text-2xl font-semibold flex-grow text-center">
        MEDISCRIBE
      </h1>
    </div>
  );
};

export default Header;
