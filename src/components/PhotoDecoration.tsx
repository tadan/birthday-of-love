import { motion } from 'framer-motion'
import imgCombined from '../assets/bh_dt.png'

export function PhotoDecoration() {
    return (
        <motion.div
            className='relative w-full max-w-[500px] mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <img
                alt='Wedding couple with flowers and disco ball'
                className='w-full h-auto'
                src={imgCombined}
            />
        </motion.div>
    )
}
