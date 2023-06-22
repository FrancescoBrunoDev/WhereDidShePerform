export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container mt-32">{children}</div>
}
