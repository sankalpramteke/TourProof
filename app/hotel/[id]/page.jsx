'use client'
import HotelDetails from '@/components/HotelDetails'
import { useParams } from 'next/navigation'

export default function HotelDetailsPage() {
  const params = useParams()
  return <HotelDetails hotelId={params.id} />
}
