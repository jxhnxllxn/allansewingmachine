import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Collection = () => {
  const history = useHistory()
  const collectionState = useSelector(({ collection }) => collection)
  const { collections } = collectionState

  const renderCardImage = (images) => {
    if (images.length > 0) {
      return `/images/collections/${images}`
    } else {
      return '/images/sewer.jpg'
    }
  }

  const handleClick = (slug) => {
    history.push(`/product/${slug}`)
  }

  const collectionItem = () =>
    collections &&
    collections.map((i) => (
      <div
        className='collection__item'
        key={i._id}
        onClick={() => handleClick(i.slug)}
      >
        <div
          className='collection__image'
          style={{
            background: `url(${renderCardImage(i.images)})`,
            backgroundSize: 'cover',
          }}
        />

        <div className='collection__content'>
          <h2 className='collection__subtitle'>{i.name}</h2>
        </div>
      </div>
    ))

  return (
    <div className='collection'>
      <h1 className='heading-primary'>Our Collections</h1>
      <section className='collection__items'>{collectionItem()}</section>
    </div>
  )
}

export default Collection
