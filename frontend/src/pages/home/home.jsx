import React from 'react'
import { useState } from 'react'
import'./home.css'
import Header from '../../header/header'
import ExploreMenu from '../../components/explore-menu/explore-menu'
import FoodDisplay from '../../components/food-display/food-display'
import AppDownload from '../../components/app-download/app-download'

const Home = () => {

  const[category,setCategory] = useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}></FoodDisplay>
      <AppDownload></AppDownload>
    </div>
  )
}

export default Home
