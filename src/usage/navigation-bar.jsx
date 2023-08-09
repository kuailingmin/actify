import { NavigationBar, NavigationTab } from 'actify'

export default () => {
  return (
    <>
      <NavigationBar>
        <NavigationTab label="Home" inactiveIcon="Home" activeIcon="Home" />
        <NavigationTab label="User" showBadge={true} badgeValue={999} inactiveIcon="User" activeIcon="User" />
        <NavigationTab label="Setting" inactiveIcon="Settings2" activeIcon="Settings2" />
      </NavigationBar>
    </>
  )
}
