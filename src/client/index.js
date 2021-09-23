import { TripDuration } from './js/countDown'
import { init } from './js/app'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import img from './media/background.jpg';
import img2 from './media/iconsprint.png'

// Call init on DOMContentLoaded event.
window.addEventListener('DOMContentLoaded', init);


export {
  TripDuration,
  init,
  img,
  img2
 }
