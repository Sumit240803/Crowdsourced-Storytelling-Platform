import Footer from "./components/Footer";
import PublicNav from "./components/PublicNav";
import RecentStories from "./components/RecentStories";


export default function Home() {
  return (
    <div className="">
      <PublicNav/>
      <RecentStories/>
      <Footer/>
    </div>
  );
}
