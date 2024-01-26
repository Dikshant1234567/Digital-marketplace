// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import './/globals.css'

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const clientId='430156770168-mu1diiletjlme2rn4u1bet5o4iekil68.apps.googleusercontent.com'
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body style={{maxWidth: "1024px" , margin: "auto" , background :"#f3f3f35e"}}>  
        <GoogleOAuthProvider clientId={clientId}>
        <MantineProvider>{children}</MantineProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}