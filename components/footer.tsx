export default function Footer() {
   return (
      <footer className='fixed left-0 bottom-0 text-center right-0 px-5 pb-2 md:pb-4 text-xs pointer-events-none'>
        <p>
          {new Date().getFullYear()}
        </p>
      </footer>
   )
}
