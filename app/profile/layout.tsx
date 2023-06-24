export default function RootLayout({
  children,
  eventInfoModal,
}: {
  children: React.ReactNode
  eventInfoModal: React.ReactNode
}) {
  return (
    <div className="container my-32">
      {children}
    {eventInfoModal}  
    </div>
  )
}
