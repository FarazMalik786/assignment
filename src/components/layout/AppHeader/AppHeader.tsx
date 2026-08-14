type AppHeaderProps = {
  title: string
}

function AppHeader({ title }: AppHeaderProps) {
  return (
    <header className="h-16 bg-background-navy">
      <div className="mx-auto flex h-full max-w-7xl items-center px-6">
        <p className="w-full text-center text-lg font-semibold text-text-white md:text-left">
          {title}
        </p>
      </div>
    </header>
  )
}

export default AppHeader