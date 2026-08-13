// import Loader from "./components/Loader";
// import Nav from "./components/Nav";
// import Hero from "./components/Hero";
// import RoomsGrid from "./components/RoomsGrid";
// import Restoration from "./components/Restoration";
// import Guestbook from "./components/Guestbook";
// import Rates from "./components/Rates";
// import Faq from "./components/Faq";
// import FinalCta from "./components/FinalCta";
// import Footer from "./components/Footer";

// export default function App() {
//   return (
//     <div className="bg-[var(--color-ink)]">
//       <Loader />
//       <Nav />
//       <main>
//         <Hero />
//         <RoomsGrid />
//         <Restoration />
//         <Guestbook />
//         <Rates />
//         <Faq />
//         <FinalCta />
//       </main>
//       <Footer />
//     </div>
//   );
// }

import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import RoomsGrid from "./components/RoomsGrid";
import Restoration from "./components/Restoration";
import Guestbook from "./components/Guestbook";
import Rates from "./components/Rates";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Location from "./components/Location";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[var(--color-ink)]">
      <Loader />
      <Nav />
      <main>
        <Hero />
        <RoomsGrid />
        <Restoration />
        <Guestbook />
        <Rates />
        <Faq />
        <FinalCta />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
