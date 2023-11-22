import React from 'react'
import { tv } from 'tailwind-variants'
import { IconButton, Icon } from 'actify'
import { useSideSheets } from './Context'

const variants = tv({
  base: 'flex-grow text-[22px] text-inverse'
})

const Header = ({ className, children }) => {
  const { setOpen } = useSideSheets()

  return (
    <div className="pl-6 pr-3 pt-3 pb-4 flex items-center">
      <div className={variants({ className })}>{children}</div>
      <IconButton onClick={() => setOpen(false)}>
        <Icon name="x" />
      </IconButton>
    </div>
  )
}

export { Header }
