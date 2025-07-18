import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from './components/Layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { AIRecommendPage } from './pages/AIRecommendPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { MyPage } from './pages/MyPage';
import { SearchPage } from './pages/SearchPage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { BookingPage } from './pages/BookingPage';
import { FavoritesPage } from './pages/FavoritesPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<PageLayout><HomePage /></PageLayout>} />
        <Route path="/ai" element={<PageLayout><AIRecommendPage /></PageLayout>} />
        <Route path="/reservations" element={<PageLayout><ReservationsPage /></PageLayout>} />
        <Route path="/mypage" element={<PageLayout><MyPage /></PageLayout>} />
        <Route path="/search" element={<PageLayout><SearchPage /></PageLayout>} />
        <Route path="/restaurant/:id" element={<PageLayout><RestaurantDetailPage /></PageLayout>} />
        <Route path="/booking/:id" element={<PageLayout><BookingPage /></PageLayout>} />
        <Route path="/favorites" element={<PageLayout><FavoritesPage /></PageLayout>} />
      </Routes>
    </Router>
  );
}

export default App;