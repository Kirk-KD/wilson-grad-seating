import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function CountdownTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const diff = Math.max(0, Math.floor((deadline.getTime() - now.getTime()) / 1000))

      const days = String(Math.floor(diff / (60 * 60 * 24))).padStart(2, '0')
      const hours = String(Math.floor((diff % (60 * 60 * 24)) / (60 * 60))).padStart(2, '0')
      const minutes = String(Math.floor((diff % (60 * 60)) / 60)).padStart(2, '0')
      const seconds = String(diff % 60).padStart(2, '0')

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [deadline])

  return (
    <Typography variant="h5" sx={{
      fontSize: '1.4em',
      color: (theme) => theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center'
    }}>
      <AccessTimeFilledIcon sx={{ mr: 1, color: (theme) => theme.palette.primary.main }} /> {timeLeft}
    </Typography>
  )
}

export default CountdownTimer
