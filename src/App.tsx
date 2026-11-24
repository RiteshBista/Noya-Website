import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";

const Discover = lazy(() => import("./pages/Discover"));
const About = lazy(() => import("./pages/About"));
const Hotel = lazy(() => import("./pages/Hotel"));
const Rooms = lazy(() => import("./pages/Rooms"));
const RoomDetail = lazy(() => import("./pages/RoomDetail"));
const Events = lazy(() => import("./pages/Events"));
const Restaurant = lazy(() => import("./pages/Restaurant"));
const LocalArtisan = lazy(() => import("./pages/LocalArtisan"));
const TravelTour = lazy(() => import("./pages/TravelTour"));
const Reserve = lazy(() => import("./pages/Reserve"));
const Art = lazy(() => import("./pages/Art"));
const History = lazy(() => import("./pages/History"));
const Heritage = lazy(() => import("./pages/Heritage"));

const Privacy = lazy(() =>
  import("./pages/Legal").then((m) => ({ default: m.Privacy })),
);
const Terms = lazy(() =>
  import("./pages/Legal").then((m) => ({ default: m.Terms })),
);
const Accessibility = lazy(() =>
  import("./pages/Legal").then((m) => ({ default: m.Accessibility })),
);
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    // reducedMotion="user": every Framer Motion animation (including the
    // components that don't check useReducedMotion themselves) drops its
    // movement for visitors who ask for reduced motion; fades remain.
    <MotionConfig reducedMotion="user">
    <div className="bg-background">
      <Loader />
      <ScrollToTop />
      <Nav />
      {/* The footer renders inside the same Suspense boundary as the page,
          so it appears together with the page's content. Outside it, the
          footer was drawn first and then moved when the page arrived: a
          layout shift of up to 0.32, and 0.06–0.08 on the short legal pages
          even with a full-screen placeholder. */}
      <Suspense fallback={<main className="min-h-svh" />}>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/art" element={<Art />} />
            <Route path="/history" element={<History />} />
            <Route path="/heritage" element={<Heritage />} />
            <Route path="/about" element={<About />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:slug" element={<RoomDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/local-artisan" element={<LocalArtisan />} />
            <Route path="/travel-tour" element={<TravelTour />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Suspense>
    </div>
    </MotionConfig>
  );
}
