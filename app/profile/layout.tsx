export default function RootLayout({
  children,
  eventInfoModal,
  tableEventUserModal,
}: {
  children: React.ReactNode
  eventInfoModal: React.ReactNode
  tableEventUserModal: React.ReactNode
}) {
  return (
    <div className="container my-32">
      {children}
      {eventInfoModal}
      {tableEventUserModal}
    </div>
  )
}
