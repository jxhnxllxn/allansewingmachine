import React from 'react'

const ThankYouCard = ({ name }) => {
  return (
    <div className='thank_you card'>
      <h3>
        Dear <span>{name},</span>
      </h3>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima vitae
        itaque laboriosam voluptatum architecto, molestiae ut mollitia tempore
        aut, at accusamus, ipsam doloribus labore magni eaque velit voluptate
        totam. Dolorem molestias consequuntur possimus numquam. Nobis architecto
        ex minus possimus! Maxime, facilis laborum expedita accusantium aut
        laboriosam! Explicabo quo alias saepe.
      </p>
      <br />
      <h3>
        Thank you,
        <br /> <span>Allan Sewing Machines</span>
      </h3>
    </div>
  )
}

export default ThankYouCard
