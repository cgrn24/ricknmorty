import styled from 'styled-components'
import { Characters } from '../components/categories/characters/Characters'
import { useEffect, useState } from 'react'
import { Episodes } from '../components/categories/episodes/Episodes'
import { Locations } from '../components/categories/locations/Locations'
import { Toolbar } from '../components/toolbar/Toolbar'

const StyledWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const StyledContainer = styled.div`
  margin-top: 100px;
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const StyledTitle = styled.h1`
  font-size: 46px;
`

export const MainPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [category, setCategory] = useState<'Characters' | 'Episodes' | 'Locations' | ''>('')
  // eslint-disable-next-line no-debugger
  // debugger
  useEffect(() => {
    const savedSearchValue = localStorage.getItem('searchValue')
    const savedCategory = localStorage.getItem('category')

    if (savedSearchValue) {
      setSearchValue(savedSearchValue)
    }

    if (savedCategory) {
      setCategory(savedCategory as 'Characters' | 'Episodes' | 'Locations')
    } else {
      setCategory('Characters')
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('searchValue', searchValue)
  }, [searchValue])

  useEffect(() => {
    localStorage.setItem('category', category)
  }, [category])
  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledTitle>Rick and Morty wiki</StyledTitle>
        <Toolbar category={category} setCategory={setCategory} searchValue={searchValue} setSearchValue={setSearchValue} />
        {category === 'Characters' && <Characters searchValue={searchValue} />}
        {category === 'Episodes' && <Episodes searchValue={searchValue} />}
        {category === 'Locations' && <Locations searchValue={searchValue} />}
      </StyledContainer>
    </StyledWrapper>
  )
}
