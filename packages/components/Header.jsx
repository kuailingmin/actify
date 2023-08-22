import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { useApp } from './App/AppContext'
import { useLocation } from 'react-router-dom'
import { Icon, Button, IconButton } from 'actify'
import Spacer from '@/packages/components/Spacer'
import Dropdown from '@/packages/components/Dropdown'
import SwitchTheme from '@/packages/components/SwitchTheme'
import { updateTheme } from 'tailwind-material-colors/lib/updateTheme.esm'

const Header = forwardRef((props, ref) => {
  const { pathname } = useLocation()
  const { top, setLeft, drawer, setDrawer } = useApp()
  const { onClick, children, className, ...rest } = props

  const randomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  const handleUpdateTheme = () => {
    updateTheme(
      {
        // set a new primary color (and optionally any other colors in your theme)
        primary: randomColor()
      },
      // second argument is your chosen dark mode strategy (usually 'media' or 'class')
      'class'
    )
  }

  return (
    <header
      ref={ref}
      {...rest}
      style={{ height: top }}
      className={twMerge('sticky top-0 z-30 h-16 bg-surface px-2 shadow backdrop-blur', className)}
    >
      <div className="mx-auto flex h-full flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center text-primary">
          <svg
            width="33.455"
            height="36.987"
            fill="var(--md-sys-color-surface)"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 33.455 36.987"
          >
            <path
              strokeWidth="2"
              stroke="var(--md-sys-color-primary)"
              transform="translate(-28.272 365)"
              d="M55.047-328.513l-5.238-13.822-14.323,5.317-3.243,8.5H29L42.821-364.5h4.359L61-328.513Zm-6.067-15.969.829,2.147-.829-2.147-5.308-13.745-7.123,18.445"
            />
          </svg>
          <span className="hidden self-center whitespace-nowrap text-2xl font-semibold md:inline">ctify</span>
        </Link>
        {pathname != '/' && (
          <IconButton className="inline-flex md:hidden" onClick={() => setDrawer(!drawer)}>
            <Icon name="Menu" color="primary" />
          </IconButton>
        )}
        <Spacer />
        <IconButton onClick={handleUpdateTheme}>
          <Icon name="Palette" color="primary" />
        </IconButton>
        <SwitchTheme />
        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-row gap-2 font-medium">
            <li>
              <Dropdown
                title="Learn"
                items={[
                  {
                    headline: 'Get Started',
                    to: '/getting-started/installation'
                  },
                  {
                    headline: 'Examples',
                    to: '/examples'
                  }
                ]}
              />
            </li>
            <li>
              <Dropdown
                title="Support"
                items={[
                  {
                    headline: 'GitHub',
                    target: '_blank',
                    to: 'https://github.com/actifyjs/actify'
                  }
                ]}
              />
            </li>
            <li>
              <Link to="/playground">
                <Button variant="text">Playground</Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
})

export default Header
