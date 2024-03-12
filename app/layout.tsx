// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import ".//globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReduxProvider from "./redux/Provider";

export const metadata = {
  title: "Digital MarketPlace",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId =
    "430156770168-15g1v54bud19q9vnl553g739us5ig0t1.apps.googleusercontent.com";

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body style={{ margin: "auto" , maxWidth :"1024px" }}>
        <ReduxProvider>
          <MantineProvider>
            <GoogleOAuthProvider clientId={clientId}>
              {children}
            </GoogleOAuthProvider>
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
