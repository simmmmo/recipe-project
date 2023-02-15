import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

export const RecipesList = () => {
  const appKey = process.env.REACT_APP_API_KEY
  const appId = process.env.REACT_APP_API_ID

  const navigate = useNavigate()

  // isLoading, error,
  const { data: recipeData } = useQuery('recipeData', () =>
    fetch(
      `https://api.edamam.com/api/recipes/v2?app_id=${appId}&app_key=${appKey}&type=public&mealType=Dinner&dishType=Main%20course&random=true`
    ).then((res) => {
      return res.json()
    })
  )
  // const { hits = [] } = data
  const data = recipeData?.hits || []

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
                <img className="mb-5 rounded" src={item.recipe.image}></img>
                <p className="text-lg text-gray-700 font-semibold">{item.recipe.label}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
