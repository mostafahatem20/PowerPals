import {
  Grid,
  Typography,
  Divider,
  TextField,
  useTheme,
  Tabs,
  Tab,
  Chip,
} from "@mui/material"
import { useState } from "react"
import FixedBottomNavigation from "../components/BottomNavigation/BottomNavigation"
import Card from "../components/Card/Card"

export interface WikiDetails {
  id?: number
  title: string
  subHeading: string
  body: string
  tag?: string
}

const articles: WikiDetails[] = [
  {
    id: 1,
    title: "Tech Article 1",
    body: "Eu nunc ultrices laoreet enim vitae. Diam varius massa eleifend semper tortor, euismod scelerisque dolor. Sit tortor, nulla suspendisse in. Vitae lectus eu, id auctor feugiat aliquam sollicitudin neque, eu. Elementum nulla lectus varius ut pellentesque. Eu ultrices bibendum lacus, etiam. Metus, ut aliquam, posuere sed sit dapibus turpis enim, integer. Integer tristique venenatis sed pellentesque et. Mauris sapien, vestibulum ullamcorper ultrices nullam adipiscing in purus. Fringilla lectus faucibus cursus nullam pulvinar. Commodo rhoncus, porttitor velit condimentum. Suscipit pellentesque turpis nisl, donec euismod volutpat non, pulvinar. Morbi adipiscing nunc lectus pulvinar turpis quam erat turpis blandit. Imperdiet ullamcorper ut ultricies massa vel at vitae pharetra. Vel nibh sit amet duis. Donec pharetra, vitae neque elementum natoque enim, porta pellentesque Eu ultrices bibendum lacus, etiam. Metus, ut aliquam, posuere sed sit dapibus turpis enim, integer. Integer tristique venenatis sed pellentesque et. Mauris sapien, vestibulum ullamcorper ultrices nullam adipiscing in purus. Fringilla lectus faucibus cursus nullam pulvinar. Commodo rhoncus, porttitor velit condimentum. Suscipit pellentesque turpis nisl, donec euismod volutpat non, pulvinar. Morbi adipiscing nunc lectus pulvinar turpis quam erat turpis blandit. Imperdiet ullamcorper ut ultricies massa vel at vitae pharetra. Vel nibh sit amet duis. Donec pharetra, vitae neque elementum natoque enim, porta pellentesque Eu ultrices bibendum lacus, etiam. Metus, ut aliquam, posuere sed sit dapibus turpis enim, integer. Integer tristique venenatis sed pellentesque et. Mauris sapien, vestibulum ullamcorper ultrices nullam adipiscing in purus. Fringilla lectus faucibus cursus nullam pulvinar. Commodo rhoncus, porttitor velit condimentum. Suscipit pellentesque turpis nisl, donec euismod volutpat non, pulvinar. Morbi adipiscing nunc lectus pulvinar turpis quam erat turpis blandit. Imperdiet ullamcorper ut ultricies massa vel at vitae pharetra. Vel nibh sit amet duis. Donec pharetra, vitae neque elementum natoque enim, porta pellentesque",
    subHeading: "Energy",
    tag: "Tech",
  },
  {
    id: 2,
    title: "Tech Article 2",
    body: "Eu nunc ultrices laoreet enim vitae. Diam varius massa eleifend semper tortor, euismod scelerisque dolor. Sit tortor, nulla suspendisse in. Vitae lectus eu, id auctor feugiat aliquam sollicitudin neque, eu. Elementum nulla lectus varius ut pellentesque. Eu ultrices bibendum lacus, etiam. Metus, ut aliquam, posuere sed sit dapibus turpis enim, integer. Integer tristique venenatis sed pellentesque et. Mauris sapien, vestibulum ullamcorper ultrices nullam adipiscing in purus. Fringilla lectus faucibus cursus nullam pulvinar. Commodo rhoncus, porttitor velit condimentum. Suscipit pellentesque turpis nisl, donec euismod volutpat non, pulvinar. Morbi adipiscing nunc lectus pulvinar turpis quam erat turpis blandit. Imperdiet ullamcorper ut ultricies massa vel at vitae pharetra. Vel nibh sit amet duis. Donec pharetra, vitae neque elementum natoque enim, porta pellentesque Eu ultrices bibendum lacus, etiam. Metus, ut aliquam, posuere sed sit dapibus turpis enim, integer. Integer tristique venenatis sed pellentesque et. Mauris sapien, vestibulum ullamcorper ultrices nullam adipiscing in purus. Fringilla lectus faucibus cursus nullam pulvinar. Commodo rhoncus, porttitor velit condimentum. Suscipit pellentesque turpis nisl, donec euismod volutpat non, pulvinar. Morbi adipiscing nunc lectus pulvinar turpis quam erat turpis blandit. Imperdiet ullamcorper ut ultricies massa vel at vitae pharetra. Vel nibh sit amet duis. Donec pharetra, vitae neque elementum natoque enim, porta pellentesque Eu ultrices bibendum lacus, etiam. Metus, ut aliquam, posuere sed sit dapibus turpis enim, integer. Integer tristique venenatis sed pellentesque et. Mauris sapien, vestibulum ullamcorper ultrices nullam adipiscing in purus. Fringilla lectus faucibus cursus nullam pulvinar. Commodo rhoncus, porttitor velit condimentum. Suscipit pellentesque turpis nisl, donec euismod volutpat non, pulvinar. Morbi adipiscing nunc lectus pulvinar turpis quam erat turpis blandit. Imperdiet ullamcorper ut ultricies massa vel at vitae pharetra. Vel nibh sit amet duis. Donec pharetra, vitae neque elementum natoque enim, porta pellentesque",
    subHeading: "Energy",
    tag: "Tech",
  },
]

const Wiki = () => {
  const theme = useTheme()
  const [search, setSearch] = useState<string>()
  const [value, setValue] = useState<number>(0)
  const [tags, setTags] = useState<string[]>(["Alles"])

  const addOrRemoveFromTags = (tag: string) => {
    const newTags = [...tags]
    const index = newTags.indexOf(tag) // Check if string exists in array

    if (index !== -1) {
      // If string exists, remove it
      newTags.splice(index, 1)
    } else {
      // If string doesn't exist, add it
      newTags.push(tag)
    }

    setTags(newTags)
  }

  return (
    <>
      <Grid
        container
        rowSpacing={3}
        padding="5% 5%"
        marginBottom="80px"
        columnSpacing={1}
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="primary.dark">
            Wiki
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            variant="outlined"
            label="Search..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              style: {
                color: theme.palette.info.light,
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={(_, newValue) => setValue(newValue)}
            style={{ width: "100%" }}
          >
            <Tab label="Wiki" />
            <Tab label="Newsticker" />
          </Tabs>
        </Grid>
        {value === 0 && (
          <>
            <Grid item xs={12}>
              <Chip
                label="Alles"
                style={{ margin: "0px 5px" }}
                variant={tags.includes("Alles") ? "filled" : "outlined"}
                onClick={() => addOrRemoveFromTags("Alles")}
              />
              <Chip
                label="Shared Energy"
                variant={tags.includes("Shared Energy") ? "filled" : "outlined"}
                style={{ margin: "0px 5px" }}
                onClick={() => addOrRemoveFromTags("Shared Energy")}
              />
              <Chip
                label="Tech"
                variant={tags.includes("Tech") ? "filled" : "outlined"}
                style={{ margin: "0px 5px" }}
                onClick={() => addOrRemoveFromTags("Tech")}
              />
              <Chip
                label="Regulatorik"
                variant={tags.includes("Regulatorik") ? "filled" : "outlined"}
                style={{ margin: "0px 5px" }}
                onClick={() => addOrRemoveFromTags("Regulatorik")}
              />
            </Grid>
            {articles.map((article, index) => (
              <Grid key={index} item lg={4} md={6} xs={12}>
                <Card
                  to={article.id ? `/wiki/article/${article.id}` : ""}
                  title={article.title}
                  tag={article.tag}
                  body={article.body}
                />
              </Grid>
            ))}
          </>
        )}
        {value === 1 && (
          <>
            {articles.map((article, index) => (
              <Grid key={index} item lg={4} md={6} xs={12}>
                <Card
                  to={article.id ? `/wiki/news/${article.id}` : ""}
                  title={article.title}
                  tag={article.tag}
                  body={article.body}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
      <FixedBottomNavigation value={1} />
    </>
  )
}

export default Wiki
