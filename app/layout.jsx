import '../src/index.css';
import AppShell from '../src/components/AppShell';

export const metadata = {
  title: 'Nouval Adibayu Kencono — Portfolio',
  description:
    'Portfolio of Nouval Adibayu Kencono, Software Engineer. Make more, if you know just do it.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-[#121214]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}