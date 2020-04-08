import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import FormControl from '@material-ui/core/FormControl'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Downshift from 'downshift'
import { navigate } from 'gatsby'

import GlobalLayout from '../../layouts/index'
import AppContentContainer from '../../components/AppContentContainer'
import useBlogPostSearch from '../../components/useBlogPostSearch'
import { ClearIcon, SearchIcon } from '../../components/MaterialIcons'

const useStyles = makeStyles((theme) => ({
  root: {},
  search: {
    width: '100%',
    // [theme.breakpoints.up('md')]: {
    //   width: 'auto',
    // },
  },
  clearIcon: {
    color: theme.palette.warning.dark,
    background: 'none',
    border: 'none',
    outline: 'none',
    position: 'absolute',
    right: 0,
    cursor: 'pointer',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {},
  listRoot: {
    backgroundColor: theme.palette.grey[100],
    border: `solid 1px ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
  },
}))

function SearchPage() {
  const classNames = useStyles()
  const { onSearch, query, suggestions } = useBlogPostSearch()

  const MIN_QUERY_LENGTH = 3

  let queryInputRef = React.createRef()

  return (
    <GlobalLayout>
      <AppContentContainer>
        {/* // https://github.com/downshift-js/downshift */}
        <Downshift
          onSelect={(page) => navigate(page.url)}
          itemToString={(page) => (page ? page.title : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            getRootProps,
            reset,
          }) => (
            <>
              <FormControl
                {...getRootProps({}, { suppressRefError: true })}
                className={classNames.search}
              >
                <Input
                  id="mn-SearchQueryInput"
                  inputRef={queryInputRef}
                  onChange={onSearch}
                  color="primary"
                  classes={{
                    root: classNames.inputRoot,
                    input: classNames.inputInput,
                  }}
                  inputProps={{ ...getInputProps() }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
                {isOpen && (
                  <button className={classNames.clearIcon} onClick={reset}>
                    <ClearIcon />
                  </button>
                )}
              </FormControl>

              {isOpen && query.length > MIN_QUERY_LENGTH && (
                <List className={classNames.listRoot}>
                  {suggestions.length === 0 ? (
                    <ListItem>
                      <ListItemText primary={`No suggestions for ${query}`} />
                    </ListItem>
                  ) : (
                    suggestions.map((page, index) => (
                      <ListItem
                        button
                        {...getItemProps({
                          key: page.title,
                          index,
                          item: page,
                        })}
                      >
                        <ListItemText primary={page.title} />
                      </ListItem>
                    ))
                  )}
                </List>
              )}
            </>
          )}
        </Downshift>
      </AppContentContainer>
    </GlobalLayout>
  )
}

export default SearchPage
