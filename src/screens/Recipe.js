import { useLocation } from 'react-router-dom'

export const Recipe = () => {
  const { state } = useLocation()
  const recipe = state.item.recipe
  const { label, yield: recipeYield } = recipe

  console.log({ state })
  return (
    <div>
      <p>{label}</p>
      <p>{recipeYield}</p>
    </div>
  )
}
