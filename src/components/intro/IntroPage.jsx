'use client'
import { useState, useEffect } from 'react'
import { Button, Label, Textarea, Modal, Select } from 'flowbite-react'
import Mois from './liste/mois'
import Jour from './liste/Jour'
import Annee from './liste/Annee'
const apiUrl = import.meta.env.VITE_API_URL

export default function IntroPage () {
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState({
    libelle: '',
    mois: '',
    jour: '',
    annee: '',
    heure: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  function onCloseModal () {
    setOpenModal(false)
    setFormData({
      libelle: '',
      mois: '',
      jour: '',
      annee: '',
      heure: ''
    })
  }

  const [taches, setTaches] = useState([])

  function onSubmitForm (e) {
    e.preventDefault()
    console.log(formData)
  }

  function handleChange (e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='pt-36 mx-6'>
      <Modal show={openModal} size='md' onClose={onCloseModal} popup>
        <Modal.Header className='m-4'>
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
                <Button type='submit'>Ajouter</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold text-white'>Tâches</h1>
        <Button onClick={() => setOpenModal(true)}>Ajouter une tâche</Button>
      </div>
      {taches.length == 0 && <p className='text-white'>Aucune tâche trouvée</p>}
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        {taches.length > 0 && (
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Tâches
                </th>
                <th scope='col' className='px-3 py-3'>
                  Date
                </th>
                <th scope='col' className='px-3 py-3'>
                  Heure
                </th>
                <th scope='col' className='px-3 py-3'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {taches.map(tache => (
                <tr
                  key={tache.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace dark:text-white'
                  >
                    {tache.libelle}
                  </th>
                  <td className='px-3 py-4'>{tache.date}</td>
                  <td className='px-3 py-4'>{tache.heure}</td>
                  <td className='px-3 py-4'>
                    <button
                      id='dropdownMenuIconButton'
                      data-dropdown-toggle='dropdownDots'
                      className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                      type='button'
                    >
                      <svg
                        className='w-5 h-5'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        viewBox='0 0 4 15'
                      >
                        <path d='M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z' />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
