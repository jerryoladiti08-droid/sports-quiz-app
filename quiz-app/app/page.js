import Quiz from './quiz'

export default function Home() {
  return (
    <main className="container">
      <div style={{
        background: '#e94560',
        color: 'white',
        textAlign: 'center',
        padding: '8px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        ⚠️ DEV ENVIRONMENT — FOR TESTING ONLY
      </div>
      <Quiz />
    </main>
  )
}