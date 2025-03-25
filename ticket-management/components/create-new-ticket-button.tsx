"use client"

interface CreateNewTicketButtonProps {
  onClick: () => void
}

export default function CreateNewTicketButton({ onClick }: CreateNewTicketButtonProps) {
  return (
    <button onClick={onClick} className="bg-[#3949AB] hover:bg-[#303F9F] text-white font-bold py-2 px-6 rounded-full">
      CREATE NEW TICKET
    </button>
  )
}

