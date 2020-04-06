import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import FormControl from '@material-ui/core/FormControl'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'

import GlobalLayout from '../../layouts/index'
import AppContentContainer from '../../components/AppContentContainer'
import AppLink from '../../components/AppLink'
import useBlogPostSearch from '../../components/useBlogPostSearch'
import { ClearIcon, SearchIcon } from '../../components/MaterialIcons'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    color: theme.palette.warning.dark,
    background: 'none',
    border: 'none',
    outline: 'none',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {},
  listRoot: {
    backgroundColor: theme.palette.grey[100],
    border: `solid 1px ${theme.palette.grey[300]}`,
  },
}))

function SearchPage() {
  const classNames = useStyles()
  const { clearQuery, onSearch, query, suggestions } = useBlogPostSearch()

  const MIN_QUERY_LENGTH = 3

  let queryInputRef = React.createRef()

  return (
    <GlobalLayout>
      <AppContentContainer>
        <div>
          <h1>Search</h1>

          <FormControl>
            <Input
              id="mn-SearchQueryInput"
              inputRef={queryInputRef}
              onChange={onSearch}
              color="primary"
              classes={{
                root: classNames.inputRoot,
                input: classNames.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          {query && (
            <button
              className={classNames.clearIcon}
              onClick={() => {
                clearQuery()
                queryInputRef.current.value = ''
              }}
            >
              <ClearIcon />
            </button>
          )}
        </div>

        <div>
          {query.length > MIN_QUERY_LENGTH && (
            <List className={classNames.listRoot}>
              {suggestions.length === 0 ? (
                <ListItem>
                  <ListItemText primary={`No suggestions for ${query}`} />
                </ListItem>
              ) : (
                suggestions.map((page, i) => (
                  <ListItem component={AppLink} to={page.url}>
                    <ListItemText key={page.title} primary={page.title} />
                  </ListItem>
                ))
              )}
            </List>
          )}
        </div>
      </AppContentContainer>
    </GlobalLayout>
  )
}

export default SearchPage
