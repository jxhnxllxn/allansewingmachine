import { useEffect } from 'react'

const useMenuToggleAnimation = tl => {

  useEffect(() => {  
      tl
      .to('.menu_bottom .list .menu_list',{ 
        right:'0',
        duration:0.3,
        ease:'power5.out',
      })
      .to('.menu_bottom .list .menu_list li',{ 
        opacity: 1,
        x:-20,
        ease:'power5.in',
        stagger:{
          amount: 0.3
        }
      }).reverse()
  
  }, [])
}

export default useMenuToggleAnimation
