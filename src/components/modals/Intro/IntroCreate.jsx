'use client'

import { Button, Label, Textarea, Modal, Select } from 'flowbite-react'
import { useState, useEffect } from 'react'
import Annee from '../../../components/intro/liste/Annee'
import Mois from '../../../components/intro/liste/mois'
import Jour from '../../../components/intro/liste/Jour'

export function IntroCreate ({ setOpenModal, introInit }) {
  const [isOpenModal, setIsOpenModal] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const apiUrl = import.meta.env.VITE_API_URL

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const currentDay = new Date().getDate()
  const [formData, setFormData] = useState({
    libelle: '',
    mois: currentMonth,
    jour: currentDay,
    annee: currentYear,
    heure: ''
  })

  function onCloseModal () {
    setIsOpenModal(false)
    setFormData({
      libelle: '',
      mois: currentMonth,
      jour: currentDay,
      annee: currentYear,
      heure: ''
    })
    introInit && introInit()
  }

  useEffect(() => {
    setIsOpenModal(setOpenModal)
  }, [setOpenModal])

  function handleChange (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function onSubmitForm (e) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${apiUrl}/taches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        console.log('Tâche ajoutée avec succès', response.json())
        introInit && introInit()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal show={isOpenModal} size='md' onClose={onCloseModal} popup>
        <Modal.Header className='m-4' >
          <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
            Ajouter une tâche
          </h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmitForm}>
            <div className='space-y-6'>
              <div className='max-w-md'>
                <div className='mb-2 block'>
                  <Label
                    htmlFor='libelle'
                    value='Tâche à faire'
                    className='text-xl'
                  />
                </div>
                <Textarea
                  name='libelle'
                  onChange={handleChange}
                  id='libelle'
                  placeholder='Tâche à faire...'
                  required
                  rows={4}
                />
              </div>
              <div className='w-full flex justify-between gap-4'>
                <div className='w-full'>
                  <label
                    htmlFor='date'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Date
                  </label>
                  <div id='date' className='flex inline-block gap-2'>
                    <Select
                      id='jour'
                      name='jour'
                      onChange={handleChange}
                      required
                    >
                      <Jour mois={formData.mois} />
                    </Select>

                    <Select
                      id='mois'
                      name='mois'
                      onChange={handleChange}
                      required
                    >
                      <Mois />
                    </Select>

                    <Select
                      id='annee'
                      name='annee'
                      onChange={handleChange}
                      required
                    >
                      <Annee />
                    </Select>
                  </div>
                </div>
              </div>
              <div className='w-24'>
                <label
                  htmlFor='time'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Heure
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none'>
                    <svg
                      className='w-4 h-4 text-gray-500 dark:text-gray-400'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fillRule='evenodd'
                        d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <input
                    type='time'
                    id='time'
                    name='heure'
                    value={formData.heure}
                    onChange={handleChange}
                    className='bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    min='09:00'
                    max='18:00'
                    required
                  />
                </div>
              </div>
              <div className='w-full'>
                <Button type='submit'>
                  {isSubmitting ? 'En cours...' : 'Ajouter'}
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
