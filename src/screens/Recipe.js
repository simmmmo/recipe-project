import { useLocation } from 'react-router-dom'

export const Recipe = () => {
  const { state } = useLocation()
  const recipe = state.item
  const {
    name,
    thumbnail_url,
    description,
    total_time_minutes,
    cook_time_minutes,
    prep_time_minutes,
    num_servings,
    instructions,
    sections,
    nutrition,
    topics
  } = recipe

  const nutritionKeys = Object.keys(nutrition)
  console.log({ nutritionKeys })

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-12 py-16">
        <div>
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl font-heading">{name}</h2>
          <h5 className="text-lg mb-4 font-bold leading-6 text-gray-900">Cuisine:</h5>
          <h5 className="text-lg mb-4 font-bold leading-6 text-gray-900">
            Serving Size: {num_servings}
          </h5>
          <p className="my-8 text-lg leading-6 text-gray-500">{description}</p>
          <div className="grid grid-cols-3 divide-x text-center border-b pb-8 border-gray-200">
            <div>
              <h5 className="text-lg font-bold leading-6 text-gray-900">Total time:</h5>
              <p>{total_time_minutes} minutes</p>
            </div>

            <div>
              <h5 className="text-lg font-bold leading-6 text-gray-900">Preparation time: </h5>
              <p>{prep_time_minutes} minutes</p>
            </div>

            <div>
              <h5 className="text-lg font-bold leading-6 text-gray-900">Cooking time: </h5>
              <p>{cook_time_minutes} minutes</p>
            </div>
          </div>

          <h5 className="text-lg mt-8 font-bold leading-6 text-gray-900">Tags:</h5>
          {topics.map((item, index) => {
            return (
              <button
                className="rounded-sm bg-gray-100 rounded text-sm p-2 m-2 justify-items-center"
                key={index}
              >
                <p className="text-gray-700">{item.name}</p>
              </button>
            )
          })}
        </div>
        <div className="overflow-hidden mb-5 rounded">
          <div className="object-cover w-full max-h-40">
            <img src={thumbnail_url} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-12 py-16">
        <div>
          <h2 className="my-4 text-xl font-semibold">Ingredients:</h2>
          {sections.map((item, index) => {
            return (
              <div key={index}>
                <h3 className="text-lg font-semibold my-2">{item.name}</h3>
                <ul>
                  {item.components.map((c, i) => (
                    <li
                      key={i}
                      className="text-base text-gray-700 my-1 border-b pb-4 mb-4 mt-4 border-gray-200"
                    >
                      {c.raw_text}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        <div className="col-span-2">
          <h2 className="my-4 text-xl font-semibold">Method:</h2>
          <ol className="list-decimal">
            {instructions.map((item, index) => {
              return (
                <li key={index} className="text-lg text-gray-700 mb-6">
                  {item.display_text}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
      {nutritionKeys.length > 0 &&
        nutritionKeys
          .filter((item) => {
            return item !== 'updated_at'
          })
          .map((item, index) => {
            return (
              <div key={index}>
                <p>{item}</p>
                <p>{nutrition[item]}</p>
              </div>
            )
          })}
    </div>
  )
}
