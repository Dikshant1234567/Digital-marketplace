// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import ".//globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId =
    "430156770168-15g1v54bud19q9vnl553g739us5ig0t1.apps.googleusercontent.com";
    
  console.log(clientId , 'this is clientId');
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body style={{ maxWidth: "1024px", margin: "auto" }}>
        <MantineProvider>
          <GoogleOAuthProvider clientId={clientId}>
            {children}
          </GoogleOAuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
