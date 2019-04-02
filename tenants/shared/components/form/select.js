export default ({ options = [], ...props }) => {
  return (
    <div className="relative w-full">
      <select
        className="appearance-none block border leading-normal p-2 rounded w-full"
        {...props}
      >
        {options.length > 0 &&
          options.map(option => (
            <option key={option.title} value={option.value}>
              {option.title}
            </option>
          ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}
