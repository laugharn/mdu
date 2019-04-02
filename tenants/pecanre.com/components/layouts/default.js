export default ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="bg-brown p-4 w-full">Header</div>
      <div className="bg-white flex flex-1 w-full">{children}</div>
      <div className="bg-black p-4 text-white w-full">Footer</div>
    </div>
  )
}
