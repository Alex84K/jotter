import baner_img from "/assets/baner_img.svg"
import styles from "./Baner.module.css"
import { useNavigate } from "react-router-dom"

const Baner = () => {
    const navigate = useNavigate()

  return (
    <div>
      <h2 className="text-center">Hi guys!</h2>
      <div className={styles.img_box}>
        <img src={baner_img} className={styles.banner_img} />
      </div>
      <div className={styles.btn_box_out}>
        <div className={styles.btn_box}>
        <button onClick={() => navigate('/login')} className={`${styles.btn} w-100 mt-4`}>
          Login
        </button>
        <button onClick={() => navigate('/registration')}  className={`${styles.btn} w-100 mt-4`}>
          Registration
        </button>
        </div>
        
      </div>
    </div>
  )
}

export default Baner
