import { plexSans, plexSerif } from '../fonts/ibm-plex';
import '../style/main.css';

export default function RootLayout ({ children }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
