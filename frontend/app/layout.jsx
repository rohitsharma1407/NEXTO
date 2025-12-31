import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../components/layout/Header";
import LiveBar from "../components/layout/LiveBar";
import Stories from "../components/stories/Stories";
import OptionsBar from "../components/layout/OptionsBar";
import Footer from "../components/layout/Footer";
import { Providers } from "../components/Providers";

export const metadata = {
  title: "NEXTO - AI-Powered News Feed",
  description: "Personalized news feed powered by AI. Stay informed with breaking news, trending stories, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0095f6" />
      </head>
      <body>
        <Providers>
          <div className="app-wrapper">
            <div className="app-container">
              <Header />
              <LiveBar />
              <Stories />
              <main className="main">
                {children}
              </main>
              <OptionsBar />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
