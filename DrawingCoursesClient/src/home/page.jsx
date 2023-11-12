
import Banner from "../components/Banner/Banner";
import Companies from "../components/Companies/Companies";
import Tabs from "../components/Courses/Courses";
import Mentor from "../components/Mentor/Mentor";
import Newsletter from "../components/Newsletter/Newsletter";
import Students from "../components/Students/Students";
import Tool from "../components/Tools/Tool";



export default function Home() {
  window.scrollTo(0, 0);
  return (
    <main>
      <Banner />
      <Companies />
      <Tabs />
      <Mentor />
      <Tool/>
      <Students />
      <Newsletter />
    </main>
  );
}
