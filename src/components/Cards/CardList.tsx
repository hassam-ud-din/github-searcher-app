// data.items
//         .title
//         .properties.owner.anyOf[1].title
//         .stargazers_count
//         onClick => .url
import React from "react"
import UserCard from "./UserCard"
import RepoCard from "./RepoCard"

type CardComponentMap = {
  [category: string]: React.ComponentType<any>
}

const cardComponents: CardComponentMap = {
  user: UserCard,
  repository: RepoCard,
}

type Props = {
  category: string
  cardsData: Array<any>
}

function CardList({ category, cardsData }: Props) {
  const CardComponent = cardComponents[category]
  return (
    <div>
      {cardsData.map((cardData) => {
        return <CardComponent key={cardData.id} {...cardData} />
      })}
    </div>
  )
}

export default CardList