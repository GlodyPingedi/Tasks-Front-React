import React from 'react'

export default function Jour ({ mois }) {
  const getJoursDuMois = mois => {
    if ([1, 3, 5, 7, 8, 10, 12].includes(mois)) {
      return 31
    } else if (mois === 2) {
      return 29
    } else {
      return 30
    }
  }

  const nombreJours = mois ? getJoursDuMois(parseInt(mois)) : 31

  return (
    <>
      {[...Array(nombreJours)].map((_, index) => (
        <option key={index + 1} value={index + 1}>
          {index + 1}
        </option>
      ))}
    </>
  )
}
