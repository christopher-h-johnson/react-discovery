import {CardActionArea, CardMedia} from "@material-ui/core"
import React, {ReactElement} from "react"
import {buildThumbnailReference} from "../utils"
import gql from 'graphql-tag'
import {setCurrentGridViewerImage} from "@react-discovery/configuration"
import {useDispatch} from "react-redux"
import {useQuery} from '@apollo/react-hooks'
import {useThumbnailStyles} from "@react-discovery/components"


interface IThumbnail {
  classes?: any;
  image?: string;
  manifest?: string;
  menuComponent?: ReactElement;
  thumbnail?: string;
}

const GET_THUMBNAIL = gql`
          query Thumbnail($manifestId: String!) {
              manifest(id: $manifestId)
          {thumbnail{id, type, service {id, profile}}}
          }`
const GET_MANIFEST_SUMMARY = gql`
          query Summary($manifestId: String!) {
              manifest(id: $manifestId)
          {summary}
          }`
export const Thumbnail: React.FC<IThumbnail> = (props): ReactElement => {
  const classes: any = props.classes || useThumbnailStyles({})
  const dispatch = useDispatch()
  const {manifest, menuComponent, thumbnail} = props
  const thumbnailLink = buildThumbnailReference(thumbnail)
  const {data} = !thumbnail && manifest && useQuery(GET_THUMBNAIL, {
    variables: { manifestId: manifest },
  })
  const {data: dataS} = manifest && useQuery(GET_MANIFEST_SUMMARY, {
    variables: { manifestId: manifest },
  })

  const handleImageSelect = (thumbnail): void => {
    dispatch(setCurrentGridViewerImage({gridViewerImage: thumbnail}))
  }

  return data && dataS ? (
    <div className={classes.cover}>
      {data.manifest && dataS.manifest ? data.manifest.thumbnail.map(
        (t, i) =>
          <CardActionArea
            key={i}
            onClick={(): void => handleImageSelect(t.id)}
          >
            <CardMedia
              alt="Placeholder"
              className={classes.media}
              component="img"
              image={t.id}
              title={dataS.manifest.summary}
            />
          </CardActionArea>) : null
      }
      {menuComponent}
    </div>
  ) : thumbnail && dataS ? (
    <div className={classes.cover}>
      <CardActionArea
        onClick={(): void => handleImageSelect(thumbnail)}
      >
        <CardMedia
          alt="Placeholder"
          className={classes.media}
          component="img"
          image={thumbnailLink}
        />
      </CardActionArea>
      {menuComponent}
    </div>
  ) : null
}
