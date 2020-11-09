import { useEffect } from 'react'

const useMenuToggleAnimation = tl => {
  useEffect(() => {
    if (window.innerWidth > 768) {
      tl
      .from('.menu_bottom .list .menu_list ',{ 
      })
      .reverse()
    }else if (window.innerWidth < 768) {
      tl.to('.menu_bottom .list .menu_list ',{ 
        width:'50vw',
      })
      .from('.menu_bottom .list .menu_list li',{ 
        opacity:0,
        x:70,
        duration:0.3,
        ease:'power4.in',
        stagger:{
          amount: 0.3
        }
      })
      .reverse()
  
    }
    console.log(window.innerWidth)
            // eslint-disable-next-line
  }, [])
}

export default useMenuToggleAnimation
