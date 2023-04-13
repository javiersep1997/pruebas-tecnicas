import { useEffect, useState } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  // para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      // TODO: Handle Error if !res.ok
      .then(res => {
        if(!res.ok) throw new Error('Error fetching fact')
        return res.json()})
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
      .catch((err) =>
      /* Catch entra solo si ha habido error con la petición, no con la */
      {console.error(err)})
  }, [fact])

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}