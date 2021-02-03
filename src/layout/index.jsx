import React, { useEffect } from 'react'
import jquery from 'jquery'
import styles from './test.module.css'
import './test.scss'

const Layout = () => {
  useEffect(() => {
    console.log('COMPONENT DID MOUNT')
    jquery.getJSON('https://4bb35414eb86.ngrok.io/customers/1212/subscriptions')
      .done(data => {
        console.log(data)
      })
  }, [])
  return (
    <div className={`accent-text ${styles.textBold} ${styles.textRed}`}>Layout</div>
  )
}

export default Layout