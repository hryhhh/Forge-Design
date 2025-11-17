import { Upload } from './components/Upload'
import Button from './components/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const request = async () => {
      try {
        const res = await axios({
          url: 'https://jsonplaceholder.typicode.com/photos',
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
        <Upload action="https://jsonplaceholder.typicode.com/photos" />
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
