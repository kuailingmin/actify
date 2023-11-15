import {
  Icon,
  List,
  Drawer,
  Button,
  Spacer,
  Divider,
  Popover,
  ListItem,
  ListGroup,
  SideSheets,
  IconButton
} from 'actify'
import { Link, NavLink } from 'react-router-dom'
import { tv } from 'tailwind-variants'
import SwitchTheme from '@/src/components/SwitchTheme'
import { updateTheme } from 'tailwind-material-colors/lib/updateTheme.esm'

const asideVariants = tv({
  base: 'fixed top-0 h-screen bg-surface overflow-y-auto row-start-2 row-end-4 col-start-1 col-end-2 shadow'
})

const Aside = ({ className }) => {
  const list = [
    {
      icon: 'layout-dashboard',
      title: 'Dashboard',
      to: '/admin'
    },
    {
      divider: true
    },
    {
      icon: 'layers',
      title: 'User Interface',
      children: [
        { title: 'Form', to: '/admin/form' },
        { title: 'Grid', to: '/admin/grid' },
        { title: 'List', to: '/admin/list' },
        { title: 'Table', to: '/admin/table' }
      ]
    },
    {
      divider: true
    },
    {
      title: 'Settings',
      icon: 'settings',
      children: [
        { title: 'System Settings', to: '/admin/system-setting' },
        { title: 'User Settings', to: '/admin/user-setting' }
      ]
    }
  ]

  return (
    <aside className={asideVariants({ className })}>
      <List className="py-0">
        {list.map(({ title, icon, divider, to, children }, index) =>
          divider ? (
            <Divider key={index} />
          ) : children?.length > 0 ? (
            <ListGroup
              key={index}
              label={title}
              icon={icon}
              className="justify-start"
            >
              {children.map(({ title, to }, index) => (
                <NavLink
                  key={index}
                  to={to}
                  className={({ isActive }) =>
                    isActive ? 'block bg-black/10' : ''
                  }
                >
                  <ListItem>{title}</ListItem>
                </NavLink>
              ))}
            </ListGroup>
          ) : (
            <NavLink
              key={index}
              to={to}
              className={({ isActive }) =>
                isActive ? 'block bg-black/10' : ''
              }
            >
              <ListItem className="gap-4 justify-between">
                <Icon name={icon} />
                {title}
                <div className="w-6"></div>
              </ListItem>
            </NavLink>
          )
        )}
      </List>
    </aside>
  )
}

const Settings = () => {
  const handleClick = (color) => {
    updateTheme(
      {
        primary: color
      },
      'class'
    )
  }

  return (
    <SideSheets>
      <SideSheets.Activator>
        <IconButton>
          <Icon name="settings" color="primary" />
        </IconButton>
      </SideSheets.Activator>
      <SideSheets.Content divider>
        <SideSheets.Header>Settings</SideSheets.Header>
        <SideSheets.Body>
          <p className="font-semibold text-xl">primary color</p>
          <ul className="grid grid-cols-2">
            {[
              {
                bg: 'bg-stone-500',
                value: '#78716c'
              },
              {
                bg: 'bg-red-500',
                value: '#ef4444'
              },
              {
                bg: 'bg-orange-500',
                value: '#f97316'
              },
              {
                bg: 'bg-amber-500',
                value: '#f59e0b'
              },
              {
                bg: 'bg-yellow-500',
                value: '#eab308'
              },
              {
                bg: 'bg-lime-500',
                value: '#84cc16'
              },
              {
                bg: 'bg-green-500',
                value: '#22c55e'
              },
              {
                bg: 'bg-emerald-500',
                value: '#10b981'
              },
              {
                bg: 'bg-teal-500',
                value: '#14b8a6'
              },
              {
                bg: 'bg-cyan-500',
                value: '#06b6d4'
              },
              {
                bg: 'bg-sky-500',
                value: '#0ea5e9'
              },
              {
                bg: 'bg-blue-500',
                value: '#3b82f6'
              },
              {
                bg: 'bg-indigo-500',
                value: '#6366f1'
              },
              {
                bg: 'bg-violet-500',
                value: '#8b5cf6'
              },
              {
                bg: 'bg-purple-500',
                value: '#a855f7'
              },
              {
                bg: 'bg-fuchsia-500',
                value: '#d946ef'
              },
              {
                bg: 'bg-pink-500',
                value: '#ec4899'
              },
              {
                bg: 'bg-rose-500',
                value: '#f43f5e'
              }
            ].map(({ bg, value }, index) => (
              <li
                key={index}
                onClick={() => handleClick(value)}
                className={`w-full cursor-pointer p-4 text-white ${bg}`}
              >
                {bg.split('-')[1]}
              </li>
            ))}
          </ul>
        </SideSheets.Body>
      </SideSheets.Content>
    </SideSheets>
  )
}

export default ({ children }) => {
  return (
    <div className="min-h-screen grid grid-rows-[64px_1fr_56px] grid-cols-[0_1fr] lg:grid-cols-[240px_1fr] transition-all">
      <header className="sticky top-0 z-50 shadow backdrop-blur col-start-1 col-end-3 px-4 flex gap-2 items-center justify-between">
        <Link to="/">
          <Button variant="text" className="font-black">
            Actify Admin
          </Button>
        </Link>
        <Drawer placement="left" className="overflow-hidden">
          <Drawer.Activator className="lg:hidden">
            <IconButton color="primary">
              <Icon name="menu" />
            </IconButton>
          </Drawer.Activator>
          <Drawer.Content className="w-[240px]">
            <Aside className="w-full" />
          </Drawer.Content>
        </Drawer>
        <Spacer />
        <Popover>
          <Popover.Activator>
            <Icon name="user" color="primary" />
          </Popover.Activator>
          <Popover.Content>
            <List className="py-0 focus-visible:outline-none">
              {['logout'].map((item) => (
                <ListItem
                  key={item}
                  className="pl-0 h-auto focus-visible:outline-none"
                >
                  {item}
                </ListItem>
              ))}
            </List>
          </Popover.Content>
        </Popover>
        <SwitchTheme />
        <Settings />
      </header>
      <Aside className="top-16 -translate-x-full lg:translate-x-0 w-[240px]" />
      <main className="bg-secondary/10 col-start-2 col-end-3">{children}</main>
      <footer className="col-start-2 col-en-3 bg-surface flex items-center px-4 justify-center lg:justify-between">
        <p>copyright &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
