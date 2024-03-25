import styles from './index.module.scss'

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean
  handleToggle?: () => void
}

const Toggle: React.FC<ToggleProps> = ({ isChecked, handleToggle }) => {
  return (
    <div
      className={`${styles.toggle} ${isChecked ? styles.checked : ''}`}
      onClick={handleToggle || undefined}
    >
      <div className={styles.circle} />
    </div>
  )
}

export default Toggle
