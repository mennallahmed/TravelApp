import { TripDuration ,distance, days } from './js/countDown'
import { init } from './js/app'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

// Call init on DOMContentLoaded event.
window.addEventListener('DOMContentLoaded', init);


export {
  TripDuration,
  distance,
  days,
  init
 }
