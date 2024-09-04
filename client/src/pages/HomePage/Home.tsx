
import HomeAbout from "./HomeAbout";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";
import HomeOurGoals from "./HomeOurGoals";

function Home() {
  return (
    <div className="flex flex-col gap-8">
        <HomeHeader />
        <HomeAbout />
        <HomeOurGoals />
        <HomeFooter />
    </div>
  )
}

export default Home