
import React, { ReactElement, ReactNode, useState } from 'react'
import Icon from '../../atoms/Icon'
import styles from './index.module.scss'
import classNames from 'classnames'
import Text from 'Components/atoms/Text'


interface Props {
  title: ReactNode
  children: React.ReactNode
  onChange?: (isOpen: boolean) => void
  isOpen?: boolean
  className?: ReactElement['props']['className']
  classes?: {
    accordion?: ReactElement['props']['className']
    accordionHeader?: ReactElement['props']['className']
    accordionTitle?: ReactElement['props']['className']
    accordionBody?: ReactElement['props']['className']
    accordionIcon?: ReactElement['props']['className']
  }
  iconRotate?: boolean
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}

const Accordion: React.FC<Props> = ({
  title,
  children,
  className,
  classes,
  onChange,
  isOpen: isOpenProp,
  iconRotate = true,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp || false)


  React.useEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp)
    }
  }, [isOpenProp])

  React.useEffect(() => {
    onChange?.(isOpen)
  }, [isOpen, onChange])

  const onToggle = () => {
    if (isOpenProp === undefined) {
      setIsOpen(!isOpen)
    } else {
      onChange?.(isOpen)
    }
  }
  return (
  //   <div
  //   className={classNames(styles.accordion, className, {
  //     [styles.open]: isOpen,
  //   })}
  // >
  //   <div
  //     className={classNames(styles.accordionHeader, classes?.accordionHeader)}
  //     onClick={onToggle}
  //   >
   
  //     <Icon
  //       className={classNames(
  //         iconRotate && styles.accordionIcon,
  //         !isOpen && classes?.accordionIcon
  //       )}
  //       name="Transactions"
  //       size={14}
  //     />
  //   </div>
  //   <div className={classNames(styles.accordionBody, classes?.accordionBody)}>
  //     <div
  //       className={classNames(
  //         styles.accordionContent,
  //       )}
  //     >
  //       {children}
  //     </div>
  //   </div>
  // </div>

  <></>    //Todo:  Accardion tasarımlarındaki css görsel ile uyuşmuyor. Tasarımcı arkadaşlara sorulacaktır.
  )
}

export default Accordion
