import Footer from "./components/Footer";
import Login from "./components/Login";
import PublicNav from "./components/PublicNav";
import RecentStories from "./components/RecentStories";


export default function Home() {
  return (
    <div className="bg-gradient-to-r from-[#f9f9f9] to-[#f4f4f4] min-h-screen">
      <PublicNav/>
      <RecentStories/>
      <Footer/>
    </div>
  );
}
