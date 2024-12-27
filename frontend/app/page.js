import Footer from "./components/Footer";
import Login from "./components/Login";
import PublicNav from "./components/PublicNav";
import RecentStories from "./components/RecentStories";


export default function Home() {
  return (
    <div className="bg-gray-950">
      <PublicNav/>
      <RecentStories/>
      <Footer/>
    </div>
  );
}
