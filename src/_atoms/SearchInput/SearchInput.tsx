import React, { FC } from 'react';
import { FormControl, IconButton, InputBase, Skeleton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import classNames from 'classnames';
import styles from './SearchInput.module.scss';
import { ISearchInputAtom } from './SearchInput.interfaces';

export const SearchInputAtom: FC<ISearchInputAtom> = (props) => {
  const { placeholder = 'Поиск...', className, onChange, value, skeleton = false, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.('');
  };

  if (skeleton) {
    return (
      <FormControl className={classNames(styles.searchInputContainer, className as any)}>
        <Skeleton variant="rectangular" width={'150px'} height={'40px'} className={styles.skeletonSearch} />
      </FormControl>
    );
  }

  return (
    <FormControl className={classNames(styles.searchInputContainer, className as any)}>
      <div className={styles.search}>
        <div className={styles.searchIconWrapper}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={placeholder}
          inputProps={{ 'aria-label': 'search' }}
          className={styles.inputBase}
          value={value}
          onChange={handleChange}
          {...rest}
        />
        {value && (
          <IconButton size="small" onClick={handleClear} className={styles.clearButton}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </div>
    </FormControl>
  );
};
