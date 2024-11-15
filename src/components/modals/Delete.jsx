'use client'

import { Button, Modal } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
const apiUrl = import.meta.env.VITE_API_URL

export function Delete ({ setOpenModal, selectedTaskId, deleteInit }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(setOpenModal)
  }, [setOpenModal])

  const handleDelete = async () => {
    console.log(selectedTaskId)
    try {
      const response = await fetch(`${apiUrl}/taches/${selectedTaskId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setIsOpen(false)
        deleteInit && deleteInit()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        show={isOpen}
        size='md'
        onClose={() => {
          setIsOpen(false)
          deleteInit && deleteInit()
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this product?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button
                color='gray'
                onClick={() => {
                  setIsOpen(false)
                  deleteInit && deleteInit()
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
