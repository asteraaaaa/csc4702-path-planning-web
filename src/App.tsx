import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { VideoGalleryPage } from "./pages/VideoGalleryPage";
import { ReactiveNavigationPage } from "./pages/ReactiveNavigationPage";
import { AStarPlanningPage } from "./pages/AStarPlanningPage";
import { InteractivePage } from "./pages/InteractivePage";
import { ChallengesPage } from "./pages/ChallengesPage";
import { ReflectionPage } from "./pages/ReflectionPage";
import { JSX } from "react";

export default function App(): JSX.Element {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/videos" element={<VideoGalleryPage />} />
                <Route path="/reactive" element={<ReactiveNavigationPage />} />
                <Route path="/astar" element={<AStarPlanningPage />} />
                <Route path="/interactive" element={<InteractivePage />} />
                <Route path="/challenges" element={<ChallengesPage />} />
                <Route path="/reflection" element={<ReflectionPage />} />
            </Routes>
        </Layout>
    );
}
