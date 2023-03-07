import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const RecipesList = () => {
  const appKey = process.env.REACT_APP_API_KEY
  // const appId = process.env.REACT_APP_API_ID

  const navigate = useNavigate()
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${appKey}`,
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  }
  // isLoading, error,
  const { data: recipeData } = useQuery('recipeData', () =>
    fetch(
      'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes',
      options
    ).then((res) => {
      return res.json()
    })
  )

  const data = recipeData?.results || []
  console.log({ data })

  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((item, index) => {
            return (
              <button
                className="bg-gray-200 rounded-md shadow border p-4 m-2 justify-items-center"
                key={index}
                onClick={() =>
                  navigate('/recipe', {
                    state: {
                      item
                    }
                  })
                }
              >
                <div className="overflow-hidden mb-5 rounded">
                  <div className="object-cover w-full max-h-40">
                    <img src={item.thumbnail_url} />
                  </div>
                </div>

                <p className="text-lg text-gray-700 font-semibold">{item.name}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
