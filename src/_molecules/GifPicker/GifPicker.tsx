import { FC, useRef, useState } from 'react';
import { IconButton, Popover } from '@mui/material';
import styles from './GifPicker.module.scss';
import { SearchInputAtom } from '@atoms';
import type { IGifPickerMol } from './GifPicker.types';

export const GifPickerMol: FC<IGifPickerMol> = ({ children, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [search, setSearch] = useState('');

  const gifList = useRef([
    {
      name: 'илон',
      link: 'https://gifs.obs.ru-moscow-1.hc.sbercloud.ru/2e9573def0ffe072160be8494d08289b1ac0ef848b2f5cadb69652fbb5b3f14e.gif',
    },
    {
      name: 'медведь',
      link: 'https://gifs.obs.ru-moscow-1.hc.sbercloud.ru/9e1f1138fede43461ed98790b62a73370401bc5dde961f2cbfe2f8c24ebae056.gif',
    },
    {
      name: 'танцы',
      link: 'https://gifs.obs.ru-moscow-1.hc.sbercloud.ru/7883db53cad3439cb0367ae2b03ca6f9b9f7398be39fdb70c6885cf2f0af9c54.gif',
    },
    {
      name: 'ура',
      link: 'https://gifs.obs.ru-moscow-1.hc.sbercloud.ru/74fcb130b47019ff325f762c3f72884dc4bb050fd7fac8f7adc7266a1565a9a9.gif',
    },
    {
      name: 'трамп',
      link: 'https://gifs.obs.ru-moscow-1.hc.sbercloud.ru/779f370795500c123ed934ad3818e1208d3a75c8d3cdecb1c36fdca6bafef57c.gif',
    },
  ]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearch('');
  };

  const handleSetSearch = (value: string) => {
    setSearch(value);
  };

  const selectEmoji = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset;

    if (onSelect) {
      onSelect(value);
    }

    handleClose();
  };

  return (
    <>
      <IconButton className={styles.btn} onClick={handleClick}>
        {children}
      </IconButton>

      <Popover
        className={styles.gifPickerPopover}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <SearchInputAtom className={styles.searchInput} value={search} onChange={handleSetSearch} />

        <div className={styles.gifList}>
          {gifList.current
            .filter((item) => item.name.toLowerCase().startsWith(search))
            .map((item) => {
              return (
                <img
                  key={item.name}
                  data-value={item.link}
                  src={item.link}
                  className={styles.gifList_item}
                  onClick={selectEmoji}
                />
              );
            })}
        </div>
      </Popover>
    </>
  );
};
