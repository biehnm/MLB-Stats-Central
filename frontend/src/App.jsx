import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import GamesPage from './pages/GamesPage.jsx';
import PlayersPage from './pages/PlayersPage.jsx';
import TeamsPage from './pages/TeamsPage.jsx';

const pages = {
  '/': { Page: PlayersPage, title: 'MLB Stats Central' },
  '/teams.html': { Page: TeamsPage, title: 'MLB Stats Central - Teams' },
  '/games.html': { Page: GamesPage, title: 'MLB Stats Central - Games' },
};

export default function App() {
  const path = window.location.pathname;
  const activePath = Object.hasOwn(pages, path) ? path : '/';
  const { Page, title } = pages[activePath];

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Header activePath={activePath} />
      <main>
        <Page />
      </main>
      <Footer />
    </>
  );
}
