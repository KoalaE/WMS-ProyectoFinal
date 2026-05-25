import './PlaceholderPage.css'

interface PlaceholderPageProps {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="placeholder-page">
      <h1 className="page-title">{title}</h1>
      <div className="placeholder-card">
        <p>{description}</p>
        <span className="placeholder-badge">Próximo sprint</span>
      </div>
    </div>
  )
}
