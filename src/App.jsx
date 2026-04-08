import AmbientBackground from './components/AmbientBackground/AmbientBackground'
import Navbar from './components/Navbar/Navbar'
import About from './components/sections/About/About'
import Experience from './components/sections/Experience/Experience'
import Projects from './components/sections/Projects/Projects'
import Skills from './components/sections/Skills/Skills'
import Contact from './components/sections/Contact/Contact'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
