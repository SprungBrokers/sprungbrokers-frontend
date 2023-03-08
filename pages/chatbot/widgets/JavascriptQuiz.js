import React, { useEffect, useState } from 'react'

const JavascriptQuiz = () => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then(data => {
        setImageUrl(data.message)
      })
  }, [])

  return (
    <div>
      <img className='dogImg' src={imageUrl} alt='a dog' />
      <style jsx>{`
        .dogImg {
          width: 100px;
        }
      `}</style>
    </div>
  )
}

export default JavascriptQuiz
