import { ShoppingCart } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'
import { useState, useEffect } from 'react'
import { QuantityInput } from '../Form/QuantityInput'
import { useCart } from '../../hooks/useCart'

import {
  CoffeeImg,
  Container,
  Control,
  Description,
  Order,
  Price,
  Tags,
  Title,
} from './styles'

type CoffeeCardProps = {
  coffee: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    price: number;
    image: string;
    quantity: number
  },
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isItemAdded, setIsItemAdded] = useState(false)
  const theme = useTheme()
  const { addItem } = useCart()
  const [load, setLoad] = useState(false);

  function incrementQuantity() {
    if (quantity < 5 ){
      setQuantity((state) => state + 1)
      setLoad(true)
      console.log(quantity)
      console.log("Aguarde, estamos preparando o melhor café pra você")
    }
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity((state) => state - 1)
    }
  }

  function handleAddItem() {
      addItem({ id: coffee.id, quantity })
      setIsItemAdded(true)
      setQuantity(1)
  }
  
  useEffect(() => {
    let timeout: number

    if (isItemAdded) {
      timeout = setTimeout(() => {
        setIsItemAdded(false)
      }, 1000)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isItemAdded])

  return (
    
    <Container>
       <CoffeeImg src={coffee.image} alt={coffee.title} />

      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <Title>{coffee.title}</Title>

      <Description>{coffee.description}</Description>

      <Control>
        <Price>
          <span>R$</span>
          <span>{coffee.price.toFixed(2)}</span> {/** Aqui você pode passar o preço do café */}
        </Price>

        <Order $itemAdded={false}>
          <QuantityInput
            quantity={quantity} // Aqui você pode passar a quantidade do café
            incrementQuantity={incrementQuantity} // Aqui você pode passar a função de incrementar
            decrementQuantity={decrementQuantity} // Aqui você pode passar a função de decrementar
          />

          <button onClick={handleAddItem}>
            <ShoppingCart size={22} color={theme.colors['base-card']} />
          </button>
        </Order>
      </Control>
    </Container>
  )
}