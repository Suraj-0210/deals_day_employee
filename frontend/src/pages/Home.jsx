import Navigation from "../component/Navigation";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      {/* Dashboard Bar */}
      <div className="bg-yellow-400 text-black font-semibold p-2 text-lg">
        Dashboard
      </div>

      {/* Main Content */}
      <main className="flex justify-center items-center h-[70vh]">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Admin Panel
        </h1>
      </main>
    </div>
  );
}

export default Home;
