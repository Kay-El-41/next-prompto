import '@styles/global.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
// we need to wrap Provider function to the pages we want to use, in this case the Root Layout because we are going to use in all pages.

export const metadata = {
  // <meta name='title' content='Promptopia'/>
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en-US">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {/* Nav will show at every route */}
            {children}
            {/* children = page.jsx of the route */}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
