import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RedirectDashboard() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/admin/resources/Productos/actions/list')
  }, [navigate])
  return null
}
