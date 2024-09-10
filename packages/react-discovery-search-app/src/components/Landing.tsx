import { Button, Card, CardContent, CardMedia } from '@mui/material'
import Grid from '@mui/material/Grid2'
import makeStyles from '@mui/styles/makeStyles'
import { getCurrentSearchContext } from '@react-discovery/internal'
import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((): any => ({
  card: {
    margin: '4px',
    maxHeight: 300,
    maxWidth: 300,
    minWidth: 300
  },
  media: {
    height: 250
  }
}))

export const Landing: React.FC<any> = (): ReactElement => {
  const classes: any = useStyles({})
  const currentSearchcontext = getCurrentSearchContext()
  const cards = [
    {
      imageSrc: 'https://iiif.bodleian.ox.ac.uk/iiif/image/8a62827b-95ec-483a-a49e-2c92fc741100/full/256,/0/default.jpg',
      index: 0,
      linkPath: '/workspace',
      text: 'Workspace',
      title: 'View Workspace'
    },
    {
      imageSrc: 'https://iiif.bodleian.ox.ac.uk/iiif/image/b2c352ee-1356-4c8c-9c11-7c6d7f3587b2/full/256,/0/default.jpg',
      index: 1,
      linkPath: currentSearchcontext,
      text: 'Search',
      title: 'Search'
    }
  ]

  const buildCards = (cards): ReactElement[] => {
    return cards.map((card): ReactElement =>
      <Card
        className={classes.card}
        key={card.index}
      >
        <NavLink to={card.linkPath} title={card.title} >
          <CardMedia
            className={classes.media}
            image={card.imageSrc}
            title={card.title}
          />
          <CardContent>
            <Button size="small">{card.text}</Button>
          </CardContent>
        </NavLink>
      </Card>)
  }

  return (<>
    <Grid
      container
      spacing={3}
    >
      <Grid display="flex" size={2}/>
      <Grid justifyContent="center" display="flex" size={7}>
        {buildCards(cards)}
      </Grid>
      <Grid display="flex" size="grow"/>
    </Grid>
  </>)
}
