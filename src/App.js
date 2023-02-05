import logo from './logo.svg'
import './App.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

function Main() {
  const appKey = process.env.REACT_APP_API_KEY
  const appId = process.env.REACT_APP_API_ID

  // isLoading, error,
  const { data } = useQuery('recipeData', () =>
    fetch(
      `https://api.edamam.com/api/recipes/v2?app_id=${appId}&app_key=${appKey}&type=public&mealType=Dinner&dishType=Main%20course&random=true`
    ).then((res) => {
      return res.json()
    })
  )
  console.log({ data })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}
