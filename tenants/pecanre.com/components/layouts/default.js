import Link from 'next/link'

export default ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="bg-brown-900 flex justify-center p-4 w-full">
        <Link href="/">
          <a>
            <img
              className="max-w-full"
              src="/static/img/logo-hdr@2x.png"
              width={280}
            />
          </a>
        </Link>
      </div>
      <div className="bg-white flex flex-1 w-full">{children}</div>
      <div className="bg-black px-4 py-8 text-white w-full">
        <div className="w-full">
          <img
            className="max-w-full mx-auto"
            src="/static/img/logo-ftr@2x.png"
            width={100}
          />
        </div>
        <div className="font-serif p-4 text-brown-900 text-center text-xl w-full">
          Pecan Real Estate is a licensed real estate brokerage
        </div>
        <div className="flex flex-wrap justify-center p-2 text-brown-900 text-center text-xs w-full">
          <div className="p-2">&copy;2019 Pecan Real Estate</div>
          <div className="p-2">Terms & Conditions</div>
          <div className="p-2">Privacy Policy</div>
          <div className="p-2">TREC Info About Brokerage Services</div>
          <div className="p-2">TREC Consumer Protection Notice</div>
        </div>
      </div>
    </div>
  )
}
