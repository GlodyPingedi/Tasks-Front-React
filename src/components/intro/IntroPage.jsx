'use client'
import { useState, useEffect } from 'react'
import { Button, Dropdown } from 'flowbite-react'
import { Delete } from '../modals/Delete'
import { IntroCreate } from '../modals/Intro/IntroCreate'
const apiUrl = import.meta.env.VITE_API_URL

export default function IntroPage () {
  const [taches, setTaches] = useState([])

  const [openIntroCreate, setOpenIntroCreate] = useState(false)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchTaches()
  }, [])

  async function fetchTaches () {
    try {
      fetch(`${apiUrl}/taches`)
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData)
          setTaches(
            responseData.map(tache => ({
              id: tache.id,
              libelle: tache.libelle,
              date: tache.date_heure.substring(0, 10),
              heure: tache.date_heure.substring(10, 16)
            }))
          )
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setOpenIntroCreate(false)
      fetchTaches()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  const deleteInit = () => {
    fetchTaches()
    setOpenDeleteModal(false)
    setIsSuccess(true)
    setMessage('Tâche supprimée avec succès !')
  }

  const introInit = () => {
    fetchTaches()
    setOpenIntroCreate(false)
    setIsSuccess(true)
    setMessage('Tâche ajoutée avec succès !')
  }

  return (
    <div className='pt-36 mx-6'>
      {isSuccess && (
        <div
          className='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400'
          role='alert'
        >
          {message}
        </div>
      )}

      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold text-white'>Tâches</h1>
        <Button onClick={() => setOpenIntroCreate(true)}>
          Ajouter une tâche
        </Button>
      </div>
      {taches.length == 0 && <p className='text-white'>Aucune tâche trouvée</p>}
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        {taches.length > 0 && (
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  N°
                </th>
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
                    {tache.id}
                  </th>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace dark:text-white'
                  >
                    {tache.libelle}
                  </th>
                  <td className='px-3 py-4'>{tache.date}</td>
                  <td className='px-3 py-4'>{tache.heure}</td>
                  <td className='px-3 py-3'>
                    <Dropdown
                      label=''
                      renderTrigger={() => (
                        <button className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
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
                      )}
                    >
                      <Dropdown.Item>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='size-5'
                        >
                          <path d='m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z' />
                          <path d='M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z' />
                        </svg>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedTaskId(tache.id)
                          setOpenDeleteModal(true)
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='size-5'
                        >
                          <path
                            fillRule='evenodd'
                            d='M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Delete
        setOpenModal={openDeleteModal}
        selectedTaskId={selectedTaskId}
        deleteInit={deleteInit}
      />
      <IntroCreate setOpenModal={openIntroCreate} introInit={introInit} />
    </div>
  )
}
