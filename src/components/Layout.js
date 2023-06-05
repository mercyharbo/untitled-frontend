import NavHeader from './navHeader'

const Layout = ({ children }) => {
  return (
    <main>
      <NavHeader />
      <section>{children}</section>
    </main>
  )
}

export default Layout
