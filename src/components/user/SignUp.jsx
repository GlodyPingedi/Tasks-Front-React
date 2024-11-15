import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API_URL

export default function SignUp () {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    noms: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  // Effet pour gérer la redirection après une inscription réussie
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/intro')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, navigate])

  // Effet pour réinitialiser les messages d'erreur après 3 secondes
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          noms: formData.noms,
          email: formData.email,
          password: formData.password
        })
      })

      if (response.ok) {
        console.log(response.json())
        setIsSuccess(true)
        setFormData({
          noms: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
      } else {
        setError(
          "Une erreur est survenue lors de l'inscription,"
        )
        setIsSubmitting(false)
      }
    } catch (error) {
      setError(
        "Une erreur est survenue lors de l'inscription, veuillez réessayer"
      )
      setIsSubmitting(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-1/2 mx-auto bg-slate-800 p-6 rounded-lg'>
        {error && (
          <div
            className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
            role='alert'
          >
            {error}
          </div>
        )}

        {isSuccess && (
          <div
            className='p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400'
            role='alert'
          >
            Inscription réussie ! Redirection vers la page de connexion...
          </div>
        )}

        <form autoComplete='off' onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='noms'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Nom complet
            </label>
            <input
              type='text'
              name='noms'
              id='noms'
              value={formData.noms}
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              required
            />
          </div>

          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={formData.email}
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              required
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Mot de passe
            </label>
            <input
              type='password'
              name='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              required
            />
          </div>

          <div>
            <label
              htmlFor='confirmPassword'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Confirmer le mot de passe
            </label>
            <input
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              required
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50'
          >
            {isSubmitting ? 'Inscription en cours...' : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  )
}
