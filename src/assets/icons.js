import { mdiCalendar } from '@mdi/js'

const none = ''

function makeSVG(path, color) {
  const defaultColor = 'grey'
  return `data:image/svg+xml;utf-8,<svg
        xmlns="http://www.w3.org/2000/svg"
        width="50" height="50"
        viewBox="0 0 24 24"
      >
      <path fill="${typeof color === 'string' ? color : defaultColor}" d="${path}"></path>
      <path fill="none" d="M0 0h24v24H0z"></path>
    </svg>`
}

const Icons = {
  none,
  calendar: (c) => makeSVG(mdiCalendar, c)
}

export default Icons
