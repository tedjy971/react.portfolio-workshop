import "../src/styles/globals.css";
import "../src/styles/theme.css";
import { ThemeProvider } from "../src/context/ThemeProvider";

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider>
    <div className="h-full px-4 m-auto max-w-7xl">
      <div className="flex md:flex-row-reverse">
        <Component {...pageProps} />
      </div>
    </div>
  </ThemeProvider>
);

export default MyApp;
