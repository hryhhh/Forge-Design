import { Upload } from './components/Upload'
import Button from './components/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com'

function App() {
  const [data, setData] = useState<any[]>([])
  const uploadAction =
    import.meta.env.VITE_UPLOAD_ACTION ?? `${API_BASE}/photos`

  useEffect(() => {
    const request = async () => {
      try {
        const res = await axios({
          url: `${API_BASE}/photos`,
          method: 'GET',
        })
        setData(res.data.slice(0, 5))
      } catch (error) {
        console.log(error)
      }
    }
    request()
  }, [])
  console.log(data)

  return (
    <div className="App">
      <Button type="primary">large</Button>
      <Button type="danger">danger</Button>
      <Button size="large">large</Button>
      <Button size="small">small</Button>
      <Button disabled>disabled</Button>
      <Button type="link" href="https://baidu.com">
        link
      </Button>
      <header className="App-header">
        <Upload action={uploadAction} />
      </header>
      <div>
        <h1>Image List</h1>
        {data.map(item => (
          <div key={item.id}>
            <img src={item.thumbnailUrl} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default App
