import css from './Loader.module.css';
import { Audio } from  'react-loader-spinner'


  export default function Loader() {
    return (
      <div className={css.Loading}>
      <div className={css.Loader}>
<Audio
    height = "80"
    width = "80"
    radius = "9"
    color = '#3f51b5'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle={{}}
    wrapperClass='three-dots-wrapper'
    display='flex'
    justify-content='center'
    align-items='center'
  />
</div>
</div>
    )
  }
  

