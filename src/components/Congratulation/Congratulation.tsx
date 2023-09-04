import React, { Fragment } from "react";
import styles from './Congratulation.module.css'

const Congratulation = ({title, score} : {title: string, score: number}) => {
  return (
    <div>
      <h2 className={`${styles.ribbon} uppercase`}>{title}</h2>
      <h1 className={styles.score}>{score}</h1>
    </div>
  )
}

export default Congratulation
