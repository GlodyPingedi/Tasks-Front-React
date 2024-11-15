import React from 'react'

export default function Annee() {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <option key={currentYear + index} value={currentYear + index}>
          {currentYear + index}
        </option>
      ))}
    </>
  )
}
